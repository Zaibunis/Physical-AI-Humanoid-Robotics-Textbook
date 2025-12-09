---
id: 11
title: Update Docusaurus BaseURL
stage: green
date: 2025-12-04
surface: agent
model: gemini-1.5-flash
feature: create-robotics-book
branch: 1-create-robotics-book
user: $USER
command: /sp.implement
labels: ["configuration", "docusaurus"]
links:
  spec: specs/1-create-robotics-book/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - book/docusaurus.config.ts
response_text: |
  The `baseUrl` in `book/docusaurus.config.ts` has been updated to `/Physical-AI-Humanoid-Robotics-Textbook/`.
  The user needs to re-run the deployment command for the changes to take effect.
outcome: completed
evaluation:
  - The `baseUrl` in `book/docusaurus.config.ts` was successfully updated.
  - The user was informed about the change and the need to re-run deployment.
