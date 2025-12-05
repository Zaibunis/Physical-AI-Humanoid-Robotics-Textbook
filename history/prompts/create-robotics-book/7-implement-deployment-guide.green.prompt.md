---
id: 7
title: Implement Deployment Guide
stage: green
date: 2025-12-04
surface: agent
model: gemini-1.5-flash
feature: create-robotics-book
branch: 1-create-robotics-book
user: $USER
command: /sp.implement
labels: ["documentation", "deployment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - book/docs/deployment-guide.md
  - book/sidebars.ts
tests_yaml: []
prompt_text: |
  /sp.implement # Deployment Guide

  This guide explains how to deploy your existing GitHub repository to **Vercel** and **GitHub Pages**.

  ---

  ## 1. Deploy to Vercel

  1. Go to [Vercel](https://vercel.com/) and log in.
  2. Click **New Project**.
  3. Select your GitHub account and pick the repository you want to deploy.
  4. Configure the project:
     - **Framework Preset**: Detect automatically (or select your framework, e.g., Next.js, React, etc.).
     - **Build Command**: Usually `npm run build` or `yarn build`.
     - **Output Directory**: Usually `build` or `.next` depending on your framework.
  5. Click **Deploy**.
  6. After deployment, your site will be live at `https://<project-name>.vercel.app`.

  ---

  ## 2. Deploy to GitHub Pages

  > Make sure your repository is already pushed to GitHub.

  1. Open your repository on GitHub.
  2. Go to **Settings → Pages**.
  3. Under **Source**, select:
     - Branch: `main` (or your default branch)
     - Folder: `/root` or `/docs` (depending on where your static files are)
  4. Click **Save**.
  5. GitHub Pages will provide a URL like:
  https://<username>.github.io/<repo-name>/

  yaml
  Copy code
  6. Commit and push any changes if needed. Your site will automatically update.

  ---

  ## Notes

  - If you are using a framework like React or Next.js:
  - Make sure your `package.json` has proper build scripts.
  - For GitHub Pages, you may need to run `npm run build` and push the `build` folder to `gh-pages` branch.
  - Vercel handles most frameworks automatically, so no extra configuration is needed.
response_text: |
  The deployment guide has been successfully integrated into the Docusaurus project.
  - A new markdown file `book/docs/deployment-guide.md` was created with the provided content.
  - The `book/sidebars.ts` file was updated to include the new guide in the sidebar navigation.
outcome: completed
evaluation:
  - The deployment guide content is now part of the project documentation.
  - The guide is accessible through the Docusaurus sidebar.
  - The task was completed without errors.
