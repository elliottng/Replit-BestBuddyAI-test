# AI Best Friend Chatbot

A ChatGPT-style AI chatbot built with React, Express, and OpenAI's GPT-4o model. Features a modern interface with customizable AI personalities and real-time conversations.

## Features

- **ChatGPT-style Interface**: Clean chat bubbles, typing indicators, and smooth animations
- **OpenAI Integration**: Powered by GPT-4o for intelligent, contextual responses
- **Personality System**: Customizable AI friend personalities via JSON configuration
- **Theme Support**: Dark/light mode toggle
- **Real-time Chat**: Instant message exchange with conversation persistence
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, TypeScript
- **AI**: OpenAI GPT-4o API
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Build**: Vite

## Setup

1. **Environment Variables**: Your OpenAI API key is already configured
2. **Install Dependencies**: `npm install` (already done)
3. **Start Development**: `npm run dev`

## Usage

1. Open the application
2. Start chatting with your AI best friend
3. Use the gear icon to customize personality settings
4. Toggle between light/dark themes with the moon/sun icon

## Personality Configuration

Customize your AI friend using this JSON structure:

```json
{
  "name": "Alex",
  "personality": "friendly, supportive, and slightly humorous",
  "traits": ["empathetic", "curious", "encouraging"],
  "communication_style": "casual but thoughtful",
  "interests": ["technology", "books", "movies", "life advice"],
  "response_guidelines": {
    "tone": "warm and conversational",
    "length": "medium-length responses",
    "emoji_usage": "occasional, when appropriate"
  },
  "system_prompt": "You are Alex, a caring AI best friend..."
}
```

## Deployment

This project is ready for deployment on Replit with the configured workflow.

## API Endpoints

- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation details
- `GET /api/conversations/:id/messages` - Get conversation messages
- `POST /api/conversations/:id/messages` - Send message and get AI response