# Replit.md

## Overview

This is a full-stack AI chat application built with React, Express, and TypeScript. The application allows users to have conversations with an AI assistant using OpenAI's GPT-4o model. It features a modern chat interface with customizable AI personalities, dark/light theme switching, and persistent conversation storage.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Integration**: OpenAI API for chat completions

### Key Components

#### Database Schema
The application uses three main tables:
- `users`: User authentication and profiles
- `conversations`: Chat conversation metadata with personality configurations
- `messages`: Individual chat messages with role (user/assistant) and content

#### AI Integration
- Uses OpenAI's GPT-4o model for generating responses
- Supports customizable personality configurations stored as JSON
- Implements conversation context management for coherent multi-turn chats
- Automatic title generation for conversations based on first message

#### Authentication & Sessions
- Session-based authentication with PostgreSQL session store
- User management with username/password authentication

## Data Flow

1. **User Input**: User types message in the chat interface
2. **Message Storage**: User message is saved to the database
3. **Context Building**: System retrieves conversation history and personality config
4. **AI Processing**: Message history is sent to OpenAI API with system prompt
5. **Response Storage**: AI response is saved to database
6. **UI Update**: Real-time updates using TanStack Query cache invalidation

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **openai**: Official OpenAI API client
- **express**: Web application framework
- **react**: Frontend UI library

### UI & Styling
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- **Development**: Uses `npm run dev` with tsx for hot reloading
- **Production**: Uses `npm run start` with compiled JavaScript
- **Database**: Requires `DATABASE_URL` environment variable
- **AI**: Requires `OPENAI_API_KEY` environment variable

### Replit Configuration
- **Deployment Target**: Autoscale deployment
- **Port Configuration**: Internal port 5000, external port 80
- **Module Dependencies**: Node.js 20, PostgreSQL 16, web modules

## Changelog

```
Changelog:
- June 24, 2025: Initial setup and core development
- June 24, 2025: Completed full-stack AI chatbot with OpenAI GPT-4o integration
- June 24, 2025: Added ChatGPT-style UI, personality system, and theme switching
- June 24, 2025: Created comprehensive documentation (README.md, architecture.md)
- June 24, 2025: Prepared for deployment with Replit Deployments
- June 24, 2025: Updated GitHub repository to elliottng/BestBuddyAI
- June 24, 2025: Created GitHub setup instructions due to Replit git restrictions
```

## User Preferences

Preferred communication style: Simple, everyday language.