import { Moon, Sun, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

interface ChatHeaderProps {
  onSettingsClick: () => void;
  onClearChat: () => void;
}

export default function ChatHeader({ onSettingsClick, onClearChat }: ChatHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Best Friend</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Always here to chat ✨</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-300"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="text-gray-600 dark:text-gray-300"
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearChat}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
