import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse, generateChatTitle } from "./services/openai";
import { insertConversationSchema, insertMessageSchema, personalityConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: "Invalid conversation data" });
    }
  });

  // Get conversation by ID
  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await storage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessagesByConversation(conversationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message and get AI response
  app.post("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const { content, personalityConfig } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "Message content is required" });
      }

      // Validate personality config if provided
      let parsedPersonalityConfig;
      if (personalityConfig) {
        try {
          parsedPersonalityConfig = personalityConfigSchema.parse(personalityConfig);
        } catch (error) {
          return res.status(400).json({ error: "Invalid personality configuration" });
        }
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId,
        role: "user",
        content: content.trim(),
      });

      // Get conversation history
      const allMessages = await storage.getMessagesByConversation(conversationId);
      const messageHistory = allMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Generate AI response
      const aiResponse = await generateChatResponse(messageHistory, parsedPersonalityConfig);

      // Save AI message
      const aiMessage = await storage.createMessage({
        conversationId,
        role: "assistant",
        content: aiResponse,
      });

      // Update conversation title if this is the first user message
      const userMessages = allMessages.filter(msg => msg.role === "user");
      if (userMessages.length === 1) {
        const title = await generateChatTitle(content);
        await storage.updateConversation(conversationId, { title });
      }

      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Validate personality configuration
  app.post("/api/validate-personality", async (req, res) => {
    try {
      personalityConfigSchema.parse(req.body);
      res.json({ valid: true });
    } catch (error) {
      res.status(400).json({ valid: false, error: error instanceof Error ? error.message : "Invalid configuration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
