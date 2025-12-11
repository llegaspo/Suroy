import {
  onCall,
  HttpsError,
  CallableRequest,
} from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import OpenAI from "openai";

// Initialize OpenAI
// Ensure you set this key: firebase functions:config:set openai.key="YOUR_KEY"
// OR use defineString for V2 functions (recommended)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const db = getFirestore();

// --- TYPES ---

// 1. The Request Body (What comes from React Native)
interface SearchRequestData {
  queryText: string;
}

// 2. The Document Data (What exists in Firestore)
interface TripCardData {
  name?: string;
  description?: string;
  content?: string;
  userId: string;
  embedding_field?: any; // VectorValue is internal to Admin SDK
  [key: string]: any;
}

// 3. The Response (What goes back to React Native)
interface SearchResult {
  id: string;
  score?: number; // Distance/Similarity score (optional)
  data: TripCardData;
}

// --- FUNCTION 1: AUTOMATIC EMBEDDING TRIGGER ---
// Triggers when a new tripCard is created
export const addTripCardEmbedding = onDocumentCreated(
  "tripCards/{cardId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data() as TripCardData;

    // Combine fields for a rich search context
    const textToEmbed =
      `${data.name || ""} ${data.description || ""} ${data.content || ""}`.trim();

    if (!textToEmbed) return;

    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: textToEmbed,
      });

      const vector = embeddingResponse.data[0].embedding;

      // Update the document with the vector
      await snapshot.ref.update({
        embedding_field: FieldValue.vector(vector),
      });

      logger.info(`Embedding added for document ${event.params.cardId}`);
    } catch (error) {
      logger.error("Error generating embedding:", error);
    }
  },
);

// --- FUNCTION 2: SEARCH CALLABLE ---
// Called from React Native
export const searchTripCards = onCall<SearchRequestData>(
  async (
    request: CallableRequest<SearchRequestData>,
  ): Promise<SearchResult[]> => {
    // 1. Authenticate User
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be logged in to search.",
      );
    }

    const { queryText } = request.data;
    const userId = request.auth.uid;

    if (!queryText || queryText.length === 0) {
      throw new HttpsError("invalid-argument", "Search text cannot be empty.");
    }

    try {
      // 2. Convert Query to Vector
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: queryText,
      });

      const queryVector = embeddingResponse.data[0].embedding;

      // 3. Execute Vector Search
      // Note: You MUST use the same distance measure as your index
      const vectorQuery = db
        .collection("tripCards")
        .where("userId", "==", userId) // Privacy Filter: Only search my own cards
        .findNearest("embedding_field", FieldValue.vector(queryVector), {
          limit: 10,
          distanceMeasure: "COSINE",
        });

      const snapshot = await vectorQuery.get();

      // 4. Format Response
      const results: SearchResult[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as TripCardData,
      }));

      return results;
    } catch (error) {
      logger.error("Search failed", error);
      throw new HttpsError("internal", "Unable to perform search.");
    }
  },
);
