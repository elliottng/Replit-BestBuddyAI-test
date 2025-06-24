import { useState, useEffect } from "react";
import { Save, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { PersonalityConfig } from "@shared/schema";

interface SettingsPanelProps {
  onClose: () => void;
}

const defaultPersonalityConfig: PersonalityConfig = {
  name: "Alex",
  personality: "friendly, supportive, and slightly humorous",
  traits: ["empathetic", "curious", "encouraging"],
  communication_style: "casual but thoughtful",
  interests: ["technology", "books", "movies", "life advice"],
  response_guidelines: {
    tone: "warm and conversational",
    length: "medium-length responses",
    emoji_usage: "occasional, when appropriate"
  },
  system_prompt: "You are Alex, a caring AI best friend. Be supportive, ask follow-up questions, remember context from the conversation, and show genuine interest in the user's life. Keep responses natural and engaging."
};

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [personalityConfig, setPersonalityConfig] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved personality config
    const savedPersonality = localStorage.getItem("personality_config") || 
      JSON.stringify(defaultPersonalityConfig, null, 2);
    
    setPersonalityConfig(savedPersonality);
  }, []);

  const handleSave = () => {
    // Validate personality config JSON
    if (personalityConfig.trim()) {
      try {
        JSON.parse(personalityConfig);
      } catch (e) {
        toast({
          title: "Error",
          description: "Invalid JSON in personality configuration. Please check your syntax.",
          variant: "destructive",
        });
        return;
      }
    }

    // Save to localStorage
    localStorage.setItem("personality_config", personalityConfig);

    toast({
      title: "Success",
      description: "Settings saved successfully!",
    });

    onClose();
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Configuration</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-yellow-600 hover:text-yellow-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* API Key Status */}
        <div className="space-y-2">
          <Label className="text-yellow-700 dark:text-yellow-300">OpenAI API Status</Label>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              API key configured and ready
            </p>
          </div>
        </div>

        {/* Personality Configuration */}
        <div className="space-y-2">
          <Label className="text-yellow-700 dark:text-yellow-300">Personality Template</Label>
          <Textarea
            value={personalityConfig}
            onChange={(e) => setPersonalityConfig(e.target.value)}
            rows={12}
            className="font-mono text-sm border-yellow-300 dark:border-yellow-700 focus:ring-yellow-500"
            placeholder="Enter personality configuration JSON..."
          />
        </div>

        <Button 
          onClick={handleSave}
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
