# State Architecture

## State Management

Use:

- Zustand for global UI/application state
- React Query for server state
- Local component state for form inputs

---

# Auth Store

File:
src/store/auth.store.ts

Responsibilities:

- user data
- auth token
- login/logout
- authentication state

---

# Onboarding Store

File:
src/store/onboarding.store.ts

Responsibilities:

- workflow progress
- uploaded documents
- onboarding status
- current onboarding step

---

# Dashboard Store

File:
src/store/dashboard.store.ts

Responsibilities:

- dashboard summary
- client list
- activity data

---

# UI Store

File:
src/store/ui.store.ts

Responsibilities:

- sidebar state
- modal state
- loading indicators
- notifications

---

# React Query Usage

Use React Query for:

- API requests
- caching
- retries
- loading states
- synchronization

---

# State Rules

- Keep API state separate from UI state
- Avoid prop drilling
- Use typed stores
- Keep stores modular
- Avoid putting everything in one store
