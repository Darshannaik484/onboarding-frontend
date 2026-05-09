# AI-Native Onboarding Frontend

This is the frontend for an AI-native client onboarding platform.

## Purpose

Build a React-based user interface for:

- login and registration
- client onboarding
- document upload
- workflow progress tracking
- AI chatbot assistance
- dashboard monitoring
- multilingual support

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Router
- Zustand
- React Query
- Axios
- react-hook-form
- Zod
- react-i18next
- Framer Motion

## Backend Integration

The frontend communicates only through the API Gateway.

Gateway URL:

- `http://localhost:4000`

Main services:

- Onboarding service: `3002`
- Dashboard service: `3000`
- Gateway: `4000`

## Frontend Goals

- Clean and professional UI
- Responsive design
- Reusable components
- Modular file structure
- Loading and error states
- Multi-language support
- Smooth onboarding workflow

## Core Screens

- Login
- Register
- Dashboard
- Client onboarding
- Document upload
- AI chatbot
- Settings / language switcher

## Development Rules

- Keep UI logic separate from API logic
- Use TypeScript everywhere
- Use reusable components
- Do not hardcode backend data
- Use translations for all UI text
