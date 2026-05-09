# Component Architecture

## Common Components

Located in:
src/components/common

Components:

- Button
- Input
- Modal
- Loader
- StatusBadge
- EmptyState

Reusable across the application.

---

# Layout Components

Located in:
src/components/layout

Components:

- Sidebar
- Topbar
- AppShell
- PageHeader

Responsible for global layout structure.

---

# Onboarding Components

Located in:
src/components/onboarding

Components:

- WorkflowStepper
- ChecklistPanel
- ProgressCard
- DocumentUploadCard
- DocumentList
- ValidationAlert

---

# Dashboard Components

Located in:
src/components/dashboard

Components:

- DashboardStats
- ClientSummaryCard
- ActivityTimeline
- ServiceHealthCard

---

# Chatbot Components

Located in:
src/components/chatbot

Components:

- ChatWindow
- ChatMessage
- ChatInput
- SuggestedPrompts

---

# Component Rules

- Keep components small and reusable
- Avoid business logic inside UI components
- Use props and hooks cleanly
- Keep styles consistent
- Use TypeScript props interfaces
