import { useEffect, useRef } from "react";
import { User, Bot } from "lucide-react";
import type { Message } from "@shared/schema";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md p-4 max-w-2xl shadow-sm">
            <p className="text-gray-800 dark:text-gray-100">
              Hey there! 👋 I'm your AI best friend, and I'm so excited to chat with you! 
              Whether you want to talk about your day, need advice, or just want to have a fun conversation, 
              I'm here for you. What's on your mind?
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === "user" ? "justify-end" : ""
            }`}
          >
            {message.role === "user" ? (
              <>
                <div className="bg-green-600 rounded-2xl rounded-tr-md p-4 max-w-2xl shadow-sm">
                  <p className="text-white">{message.content}</p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md p-4 max-w-2xl shadow-sm">
                  <p className="text-gray-800 dark:text-gray-100">{message.content}</p>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md p-4 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
