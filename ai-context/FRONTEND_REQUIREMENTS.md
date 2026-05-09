# Frontend Requirements

## Objective

Build the complete user-facing frontend for the AI-native onboarding system.

## Pages to Build

### Authentication

- Login page
- Register page

### Onboarding Flow

- Client creation page
- Step-by-step onboarding page
- Document upload page
- Workflow review page
- Completion page

### Dashboard

- Client dashboard
- Client detail page
- Onboarding progress view
- Recent activity view
- Status summary cards

### AI Assistant

- Chat window
- Suggested prompts
- Context-aware replies
- Error explanation messages

### Settings

- Language switcher
- Basic UI preferences

## Main UI Features

### 1. Login and Register

- Email and password form
- Validation messages
- Loading state
- Error handling
- Redirect after success

### 2. Dashboard

- Show onboarding progress
- Show client status: pending, in progress, blocked, completed
- Show document status
- Show recent events and updates
- Show summary cards

### 3. Workflow UI

- Step 1: Identity
- Step 2: Company Documents
- Step 3: Financial
- Step 4: Compliance
- Step 5: Complete
- Highlight current step
- Show completed steps
- Show blocked steps clearly

### 4. Document Upload

- Upload card or drag-and-drop area
- File type and size validation
- Upload progress indicator
- Uploaded file list
- File status display
- Error messages for invalid files

### 5. AI Chatbot

- Floating or side-panel chatbot
- Ask questions like:
  - what do I upload next?
  - why was my document rejected?
  - what is blocking onboarding?
- Show suggested questions
- Show AI responses in a chat layout

### 6. Multilingual Support

- English default
- Hindi support
- Spanish support
- All labels, buttons, headings, and messages must be translatable

## Data and State Requirements

- Use global auth state
- Use onboarding state for workflow progress
- Use dashboard state for client summary
- Use local state for form inputs
- Use API state for server responses

## UX Requirements

- Clean and professional layout
- Easy navigation
- Visible progress tracking
- Clear call-to-action buttons
- Helpful empty states
- Friendly error messages
- Fully responsive layout

## API Behavior

- Get data only from API Gateway
- Do not mock final backend logic inside UI components
- Use typed request/response structures
- Handle loading and failure cases properly
