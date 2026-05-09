# Claude Instructions

You are a senior frontend architect and React UI engineer.

Your task is to generate a complete, production-ready frontend application for the AI-native onboarding platform.

## Context

This frontend is part of a larger multi-service system. The frontend must connect to backend APIs through the API Gateway only.

Gateway base URL:

- `http://localhost:4000`

## Your Responsibilities

Build all user-facing screens and components, including:

- login
- register
- client dashboard
- onboarding workflow
- document upload interface
- AI chatbot interface
- language switcher
- reusable layout components
- routing
- API integration
- global state handling
- loading and error states

## Technical Requirements

Use:

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

## Architecture Requirements

- Use modular file structure
- Keep pages, components, hooks, services, and stores separate
- Avoid huge single-file components
- Use reusable UI components
- Keep API logic outside UI components
- Use strongly typed interfaces and types
- Use environment variables for configuration

## UI Requirements

- Build a clean, modern, enterprise-style interface
- Make it mobile responsive
- Use clear onboarding progress indicators
- Show document upload status
- Show validation feedback
- Show client status cards
- Show chatbot responses clearly
- Support English, Hindi, and Spanish

## Functional Requirements

- Auth screens with validation
- Protected routes
- Onboarding workflow steps
- Document upload with status tracking
- Dashboard with progress summary
- AI chatbot panel
- Language switching
- API integration through gateway
- Loading, empty, and error states

## Important Rules

- Do not generate random architecture
- Do not place all logic inside App.tsx
- Do not call services directly from components
- Do not hardcode API URLs
- Do not skip translation support
- Do not use placeholder-only code
- Do not break the existing folder structure

## Output Expectations

Generate:

- full folder-aware React code
- reusable components
- API service files
- hooks
- store files
- route setup
- i18n setup
- page components
- utility functions
- type definitions

## Working Style

- Read the provided markdown files first
- Respect the project rules
- Preserve existing files where possible
- Modify files intelligently
- Write clean, production-ready code
- Make the application actually usable
