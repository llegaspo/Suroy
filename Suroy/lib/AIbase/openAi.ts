import axios from "axios";
// import { OPENAI_API_KEY } from "@env";
// import { ChatMessage } from "../aiStorage";
//
type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export interface OpenAIPayload {
  messages: ChatMessage[];
  model: string;
}

export const OpenAI = async ({
  messages,
  model = process.env.EXPO_PUBLIC_OPENAI_MODEL,
}: OpenAIPayload) => {
  try {
    const res = await axios.post(
      process.env.EXPO_PUBLIC_BASE_OPENAI_URL,
      {
        model,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error("OpenAI API error:", error?.response?.data || error.message);
    return "Something went wrong.";
  }
};
