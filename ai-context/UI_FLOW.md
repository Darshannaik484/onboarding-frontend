# UI Flow

## Overview

The frontend follows a guided onboarding workflow where users:

1. Authenticate
2. Access dashboard
3. Create a client onboarding request
4. Upload required documents
5. Track onboarding progress
6. Interact with AI assistant
7. Complete onboarding

The experience should feel:

- guided
- simple
- responsive
- enterprise-grade
- easy to understand

---

# Primary User Journey

Login
→ Dashboard
→ Create Client
→ Start Onboarding
→ Identity Step
→ Company Documents
→ Financial Documents
→ Compliance Step
→ Review & Validation
→ Complete Onboarding

---

# Authentication Flow

## Login Flow

Login Page
→ User enters email/password
→ Validate form
→ Send login request
→ Store auth token
→ Redirect to dashboard

Error states:

- invalid credentials
- missing fields
- server unavailable

Loading states:

- button loading
- disabled submit during request

---

## Register Flow

Register Page
→ User enters details
→ Validate inputs
→ Create account
→ Redirect to login

Validation:

- email format
- password strength
- required fields

---

# Dashboard Flow

Dashboard
→ View onboarding summary
→ View client progress
→ View pending tasks
→ Continue onboarding
→ Open client details

Dashboard should show:

- onboarding percentage
- completed workflows
- blocked workflows
- recent uploads
- recent AI suggestions
- notification summary

---

# Client Creation Flow

Dashboard
→ Click "Create Client"
→ Fill client details form
→ Submit form
→ Create onboarding workflow
→ Redirect to onboarding steps

Fields:

- company name
- jurisdiction
- service tier
- contact details

---

# Onboarding Workflow Flow

## Step 1 — Identity

User uploads:

- passport
- ID proof
- personal verification documents

System:

- validates uploads
- checks expiry
- updates progress

---

## Step 2 — Company Documents

User uploads:

- registration certificate
- incorporation documents
- tax documents

AI may request additional documents dynamically.

---

## Step 3 — Financial Documents

User uploads:

- bank statements
- financial reports
- tax records

System validates:

- required files
- file formats
- completeness

---

## Step 4 — Compliance

User uploads:

- compliance declarations
- legal approvals
- verification documents

AI assistant may explain missing requirements.

---

## Step 5 — Review & Completion

System:

- validates workflow
- shows final review
- marks onboarding complete

User sees:

- completion message
- onboarding summary
- next steps

---

# Document Upload Flow

User selects file
→ Validate file type
→ Validate file size
→ Upload file
→ Show upload progress
→ Save metadata
→ Update workflow status

Supported UX:

- drag and drop
- upload progress bar
- retry upload
- remove uploaded file
- validation alerts

Error states:

- invalid format
- upload failure
- oversized file
- expired document

---

# AI Chatbot Flow

User opens chatbot
→ Ask onboarding question
→ Send query to AI API
→ Display contextual response

Supported questions:

- What should I upload next?
- Why was my document rejected?
- Which step is incomplete?
- What documents are missing?

Chatbot UI should support:

- message history
- loading state
- typing indicator
- suggested prompts
- scrollable conversation

---

# Language Switching Flow

User opens settings
→ Select language
→ Entire UI updates dynamically

Supported languages:

- English
- Hindi
- Spanish

All labels, buttons, messages, and headings must use translation keys.

---

# Notification Flow

System triggers:

- upload success
- validation failure
- workflow completion
- missing document alerts

Notifications should appear:

- as toast alerts
- inside notification center
- inside dashboard activity feed

---

# Protected Route Flow

Unauthenticated user
→ Attempts to access dashboard
→ Redirect to login

Authenticated user
→ Allowed to access protected pages

---

# Error Handling Flow

Frontend must handle:

- API failures
- timeout errors
- validation errors
- authentication errors
- upload failures

UI should show:

- friendly messages
- retry actions
- fallback states

---

# Mobile Responsive Flow

Mobile UI should support:

- collapsible sidebar
- stacked cards
- responsive forms
- responsive chatbot
- touch-friendly upload interactions

All pages must work properly on:

- mobile
- tablet
- desktop
