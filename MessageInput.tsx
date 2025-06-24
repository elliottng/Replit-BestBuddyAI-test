import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;
    
    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
    }
  }, [message]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here... Press Enter to send, Shift+Enter for new line"
              className="min-h-[48px] max-h-32 resize-none pr-12 rounded-2xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              disabled={disabled}
            />
            
            <div className="absolute bottom-1 right-1 text-xs text-gray-400 bg-white dark:bg-gray-800 px-1 rounded">
              {message.length}/2000
            </div>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-2xl"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
