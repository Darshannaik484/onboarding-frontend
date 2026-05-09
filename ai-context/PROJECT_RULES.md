# Project Rules

## General Rules

- Use React + TypeScript only
- Use Vite as the build tool
- Use TailwindCSS for styling
- Use shadcn/ui for UI components
- Use React Router for navigation
- Use Zustand for global state
- Use React Query for server state
- Use Axios for API calls
- Use react-hook-form + Zod for forms and validation
- Use react-i18next for language support
- Use Framer Motion for subtle animations

## Architecture Rules

- Keep business logic outside UI components
- Keep API calls inside `src/api` or `src/services`
- Keep reusable UI elements inside `src/components`
- Keep page-level screens inside `src/features`
- Keep global state inside `src/store`
- Keep route definitions inside `src/routes`
- Keep utility functions inside `src/utils`

## UI Rules

- Build mobile-first responsive screens
- Use consistent spacing and typography
- Show loading, empty, and error states
- Use clear progress indicators
- Use status badges for workflow states
- Keep the interface simple and user-friendly

## Integration Rules

- Frontend must communicate only through API Gateway
- Do not call backend services directly from components
- Use environment variables for base URLs
- Do not hardcode API endpoints in UI files

## Language Rules

- All visible UI text must use translation keys
- Support at least English, Hindi, and Spanish
- Language switching must be available in the UI

## Code Quality Rules

- Use modular components
- Use descriptive names
- Avoid duplicated logic
- Avoid giant files
- Use clean imports
- Use type-safe interfaces
