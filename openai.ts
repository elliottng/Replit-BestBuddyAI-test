import OpenAI from "openai";
import type { PersonalityConfig } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || ""
});

export async function generateChatResponse(
  messages: Array<{ role: string; content: string }>,
  personalityConfig?: PersonalityConfig
): Promise<string> {
  try {
    const systemPrompt = personalityConfig?.system_prompt || 
      "You are a helpful AI assistant and best friend. Be supportive, friendly, and engaging in your responses.";

    const openaiMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from OpenAI API");
  }
}

export async function generateChatTitle(firstMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Generate a short, descriptive title (max 5 words) for a conversation that starts with the following message. Only respond with the title, no quotes or extra text."
        },
        {
          role: "user",
          content: firstMessage
        }
      ],
      max_tokens: 20,
      temperature: 0.3,
    });

    return response.choices[0].message.content?.trim() || "New Chat";
  } catch (error) {
    console.error("Failed to generate chat title:", error);
    return "New Chat";
  }
}
