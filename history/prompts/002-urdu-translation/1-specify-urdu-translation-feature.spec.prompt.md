---
id: 1
title: Specify Urdu Translation Feature
stage: spec
date: 2025-12-08
surface: agent
model: gemini
feature: 002-urdu-translation
branch: 002-urdu-translation
user: n/a
command: /sp.specify
labels: [spec, urdu, translation]
links:
  spec: specs/002-urdu-translation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-urdu-translation/spec.md
  - specs/002-urdu-translation/checklists/requirements.md
tests:
  - none
---

## Prompt

# FEATURE: Urdu Translation for Textbook Chapters (+50 Bonus Points) ## OBJECTIVE Add a feature where **any user (guest or logged-in)** can translate any chapter of the textbook into **Urdu** by clicking a **"Translate to Urdu"** button placed at the **start of each chapter**. Users who successfully translate chapters receive **+50 bonus points** (tracked by browser/session/fingerprint if not logged in). The translated content must NOT replace the original. It should appear in a **toggle view** (English / اردو). ================================================== ## REQUIREMENTS ### Functional Requirements 1. Each chapter page must contain a visible button: **"Translate this chapter to Urdu (+50 points)"** 2. Button is available to: * All users (no login required) * Only if this chapter has not already been translated in this browser/session 3. On button click: * Get full chapter content * Send it to translation API (Gemini or other) * Receive Urdu translation * Display result below original OR in toggle tab 4. On successful translation: * Add +50 points (saved via browser storage or device fingerprint) * Save translation in database (by session_id / device_id + chapter) * Do not give points again for the same chapter on same device 5. If translation fails → show a retry message. ================================================== ## HOW TO IDENTIFY USER (NO LOGIN) Use ONE of the following: * Browser LocalStorage ID * Device Fingerprint * Anonymous Session ID (UUID) * IP + User Agent hash This ID is used to: * Prevent multiple rewards for same chapter * Store points * Link translations to a user anonymously Example ID name: ``` anon_user_id ``` ================================================== ## TECH STACK Translation API: Gemini 1.5 / Gemini Pro Frontend: Next.js / Docusaurus Backend: FastAPI Database: PostgreSQL / MongoDB Points: Stored per anon_user_id Language: English → Urdu ================================================== ## DATABASE MODELS ### AnonymousUser ``` id (anon_user_id) points created_at ``` ### ChapterTranslation ``` id anon_user_id chapter_id original_text urdu_text created_at ``` ================================================== ## FRONTEND TASKS 1. Add button at top of each chapter page in Docusaurus: Text: “Translate to Urdu (+50 Points)” 2. Generate anonymous ID if not exists: Save in LocalStorage: ``` anon_user_id = uuid() ``` 3. When clicked, call backend endpoint: POST /translate/chapter Body: ``` { "anon_user_id": "abc-123", "chapter_id": "ch_01", "content": "<full chapter content>" } ``` 4. Show states: * Loading: "Translating..." * Success: Show Urdu text * Error: "Try again" 5. Add Toggle Button: [ English | اردو ] ================================================== ## BACKEND TASKS ### API: /translate/chapter Input: ``` anon_user_id chapter_id content ``` Steps: 1. Check if this `anon_user_id` already translated this `chapter_id` 2. If yes → return saved Urdu version (no points) 3. If no: * Send content to Gemini for translation * Save translated content in database * Add +50 points to anon_user * Return the translation ================================================== ## GEMINI TRANSLATION PROMPT SYSTEM: You are a professional Urdu translator for academic textbooks. USER: Translate the following content into clear, simple, accurate Urdu. Keep headings, structure, formulas and code unchanged. Do NOT summarize, explain or remove anything. Only translate. TEXT: <CHAPTER CONTENT HERE> ================================================== ## SECURITY RULES * No login required * One chapter = one reward = 50 points per device/session * Rate limit: 3 translations per hour per device ================================================== ## BONUS POINTS LOGIC On success: ``` if chapter not translated before by this anon_user_id: anon_user.points += 50 ``` Show notification: ✅ "Translation completed! You earned 50 points." ================================================== ## FAIL SAFE If Gemini fails: "I'm unable to translate this content right now. Please try again later." ================================================== ## FINAL OUTPUT NEEDED FROM GEMINI 1. Backend API code (FastAPI) 2. Frontend button component (Docusaurus/Next.js) 3. Session-based user ID logic 4. Database schema 5. Translation integration 6. README instructions ================================================== ## START MESSAGE ✅ Urdu Translation Feature Enabled ✅ No Login Required ✅ Bonus System Active "Click on any chapter to translate it to Urdu and earn 50 points." ==================================================

## Response snapshot

I have created the feature specification for the "Urdu Translation" feature.
- The feature branch is `002-urdu-translation`.
- The specification file is located at `specs/002-urdu-translation/spec.md`.
- A validation checklist has been created at `specs/002-urdu-translation/checklists/requirements.md`.
- The specification has been validated and is ready for the next phase.

## Outcome

- ✅ Impact: Created a new feature specification and all related artifacts.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `specs/002-urdu-translation/spec.md`
  - `specs/002-urdu-translation/checklists/requirements.md`
  - `history/prompts/002-urdu-translation/1-specify-urdu-translation-feature.spec.prompt.md`
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The `create-new-feature.ps1` script had issues with long arguments, so I had to create the files manually. The rest of the process was smooth.
