---
id: 1
title: Specify Simplified Urdu Translation Feature
stage: spec
date: 2025-12-08
surface: agent
model: gemini
feature: 003-urdu-translation
branch: 003-urdu-translation
user: n/a
command: /sp.specify
labels: [spec, urdu, translation, simplified]
links:
  spec: specs/003-urdu-translation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-urdu-translation/spec.md
  - specs/003-urdu-translation/checklists/requirements.md
tests:
  - none
---

## Prompt

# FEATURE: Urdu Translation for Textbook Chapters (+50 Bonus Points) ## OBJECTIVE Add a feature where **anyone** can translate any chapter of the textbook into **Urdu** by clicking a **"Translate to Urdu"** button placed at the **start of each chapter**. The translated content must NOT replace the original. It should appear in a **toggle view** (English / اردو). ================================================== ## REQUIREMENTS ### Functional Requirements 1. Each chapter page must contain a visible button: **"Translate this chapter to Urdu (+50 points)"** 2. Button is available to **all users**, no login or session tracking required. 3. On button click: * Get full chapter content * Send it to translation API (Gemini or other) * Receive Urdu translation * Display result below original OR in toggle tab * Add +50 points (optional, per click) 4. If translation fails → show a retry message. ================================================== ## TECH STACK Translation API: Gemini 1.5 / Gemini Pro Frontend: Next.js / Docusaurus Backend: FastAPI Database: PostgreSQL / MongoDB (optional to store translations) Language: English → Urdu ================================================================== ## FRONTEND TASKS 1. Add button at top of each chapter page in Docusaurus: Text: “Translate to Urdu (+50 Points)” 2. When clicked, call backend endpoint: POST /translate/chapter Body: ``` { "chapter_id": "ch_01", "content": "<full chapter content>" } ``` 3. Show states: * Loading: "Translating..." * Success: Show Urdu text * Error: "Try again" 4. Add Toggle Button: [ English | اردو ] ================================================== ## BACKEND TASKS ### API: /translate/chapter Input: ``` chapter_id content ``` Steps: 1. Send content to Gemini for translation 2. Optionally save translated content in database 3. Return translation to frontend ================================================== ## GEMINI TRANSLATION PROMPT SYSTEM: You are a professional Urdu translator for academic textbooks. USER: Translate the following content into clear, simple, accurate Urdu. Keep headings, structure, formulas and code unchanged. Do NOT summarize, explain or remove anything. Only translate. TEXT: ================================================== ## SECURITY RULES * No login required * Rate limit: 3 translations per hour per device (optional) ================================================== ## FAIL SAFE If Gemini fails: "I'm unable to translate this content right now. Please try again later." ================================================== ## FINAL OUTPUT NEEDED FROM GEMINI 1. Backend API code (FastAPI) 2. Frontend button component (Docusaurus/Next.js) 1) Translation integration 2) README instructions ================================================== ## START MESSAGE ✅ Urdu Translation Feature Enabled ✅ Ready for Chapter Translation

## Response snapshot

I have created a new, simplified feature specification based on your latest input.
- **Branch**: `003-urdu-translation`
- **Specification**: `specs/003-urdu-translation/spec.md`
- The previous clarification session has been aborted. This new spec is ready for planning.

## Outcome

- ✅ Impact: Created a new, simplified feature specification and all related artifacts. Aborted the previous, more complex feature specification.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `specs/003-urdu-translation/spec.md`
  - `specs/003-urdu-translation/checklists/requirements.md`
  - `history/prompts/003-urdu-translation/1-specify-simplified-urdu-translation-feature.spec.prompt.md`
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The user provided a completely new, simplified spec, indicating a change in direction. I correctly identified this, stopped the clarification process for the old spec, and created a new set of artifacts for the new one. The manual file creation process remains a necessary workaround for the script limitations.
