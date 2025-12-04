// import axios from "axios";
import OpenAI from "openai";
import { OpenAIPayload } from "./openAi";

export const GeminiAI = async ({
  messages,
  model = "gemini-2.5-flash",
}: OpenAIPayload) => {
  const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    reasoning_effort: "low",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Explain to me how AI works",
      },
    ],
  });

  console.log(response.choices[0].message);

  return response.choices[0].message;
};

// console.log(response.choices[0].message);
