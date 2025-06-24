import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Conversation, Message } from "@shared/schema";

export function useChat() {
  const [conversationId, setConversationId] = useState<number | null>(1);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch conversation
  const { data: conversation } = useQuery<Conversation>({
    queryKey: [`/api/conversations/1`],
  });

  // Fetch messages
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: [`/api/conversations/1/messages`],
  });

  // Create new conversation
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/conversations", {
        title: "New Chat",
        personalityConfig: null,
        userId: null,
      });
      return response.json();
    },
    onSuccess: (conversation: Conversation) => {
      setConversationId(conversation.id);
      queryClient.setQueryData([`/api/conversations/${conversation.id}`], conversation);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      });
    },
  });

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId) throw new Error("No conversation selected");

      let personalityConfig;
      const savedPersonality = localStorage.getItem("personality_config");
      if (savedPersonality) {
        try {
          personalityConfig = JSON.parse(savedPersonality);
        } catch (e) {
          console.warn("Invalid personality configuration, using default");
        }
      }

      const response = await apiRequest("POST", `/api/conversations/${conversationId}/messages`, {
        content,
        personalityConfig,
      });
      return response.json();
    },
    onSuccess: () => {
      if (conversationId) {
        queryClient.invalidateQueries({
          queryKey: [`/api/conversations/${conversationId}/messages`]
        });
        queryClient.invalidateQueries({
          queryKey: [`/api/conversations/${conversationId}`]
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createNewConversation = useCallback(() => {
    createConversationMutation.mutate();
  }, [createConversationMutation]);

  const sendMessage = useCallback((content: string) => {
    if (!sendMessageMutation.isPending && conversationId) {
      sendMessageMutation.mutate(content);
    }
  }, [sendMessageMutation, conversationId]);

  const clearChat = useCallback(() => {
    if (conversationId) {
      queryClient.setQueryData([`/api/conversations/${conversationId}/messages`], []);
      createNewConversation();
    }
  }, [conversationId, queryClient, createNewConversation]);

  return {
    conversation,
    messages,
    isLoading: sendMessageMutation.isPending,
    sendMessage,
    createNewConversation,
    clearChat,
  };
}
