import { useState, useEffect } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import MessageInput from "@/components/chat/MessageInput";
import SettingsPanel from "@/components/chat/SettingsPanel";
import { useChat } from "@/hooks/use-chat";

export default function ChatPage() {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    conversation, 
    messages, 
    isLoading, 
    sendMessage, 
    createNewConversation,
    clearChat 
  } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-900">
      <ChatHeader 
        onSettingsClick={() => setShowSettings(!showSettings)}
        onClearChat={clearChat}
      />
      
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
      
      <ChatMessages 
        messages={messages} 
        isLoading={isLoading}
      />
      
      <MessageInput 
        onSendMessage={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
}
