# Simplified Chat App (Lumibyte Assignment)

A full-stack **simplified ChatGPT-like application** built with:

- **Frontend:** React 18, React Router v5, Tailwind CSS
- **Backend:** Node.js + Express
- **Data:** In-memory mock JSON (no database)

The app demonstrates:

- A **two-pane layout** (sidebar + main chat view)
- **Session management** with unique `sessionId` in the URL
- **Conversation history** per session
- **Structured (tabular) responses** rendered in a nice table UI
- **Dark / Light mode** with a global theme toggle
- A **mock model switcher** (GPT-3.5 / GPT-4 style)
- **Like / Dislike** feedback buttons for answers

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Clone the Repository](#clone-the-repository)  
   - [Install & Run Backend](#install--run-backend)  
   - [Install & Run Frontend](#install--run-frontend)  
6. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)  
   - [Phase 1 – Backend (Mock API Server)](#phase-1--backend-mock-api-server)  
   - [Phase 2 – Frontend Setup](#phase-2--frontend-setup)  
   - [Phase 3 – Core Chat Logic](#phase-3--core-chat-logic)  
   - [Phase 4 – Polished UI/UX](#phase-4--polished-uiux)  
   - [Phase 5 – Extras](#phase-5--extras)  
7. [API Documentation](#api-documentation)  
8. [How the App Works](#how-the-app-works)  
9. [Scripts](#scripts)  
10. [Future Improvements](#future-improvements)

---

## Project Overview

The goal of this assignment is to mimic a **very simplified version of ChatGPT**:

- The **left sidebar** shows all chat sessions (“Sample Sales Analysis”, “New Chat”, etc.).
- The **main panel** shows the full conversation for the selected `sessionId`.
- Each session’s URL looks like:  
  `http://localhost:3000/chat/<sessionId>`
- When the user sends a message, the backend returns a **mock assistant answer** plus a **structured table**.

Everything is powered by **static/mock data** in memory on the backend—no database is needed.

---

## Features

### Core

- ✅ Single Page Application (SPA) with React and React Router v5  
- ✅ Sidebar listing all sessions  
- ✅ “New Chat” flow that creates a fresh `sessionId` and navigates to it  
- ✅ Full conversation history per session  
- ✅ Assistant responses that include **tabular data**, rendered using a dedicated `TableResponse` component  

### UI / UX

- ✅ Chat bubbles:  
  - User messages: right-aligned blue bubble  
  - Assistant messages: left-aligned card with table + feedback  
- ✅ Scrollable chat history with auto-scroll to the latest message  
- ✅ Feedback buttons (👍 / 👎) under assistant responses  
- ✅ Model switcher (GPT-3.5 / GPT-4 style toggle)  

### Theming

- ✅ **Global Dark / Light mode toggle** in the header  
- ✅ Theme stored in `localStorage`  
- ✅ CSS variables (`:root` & `.dark`) used to drive colors  
- ✅ Entire layout (sidebar, chat, cards, inputs) responds to theme changes  

---

## Tech Stack

**Frontend**

- React 18  
- React Router DOM v5  
- Tailwind CSS  
- Plain CSS modules (`index.css` per component)

**Backend**

- Node.js (LTS)  
- Express  
- CORS  
- `uuid` for generating session and message IDs  

---

## Project Structure

```txt
chat-app-project/
│
├── backend/
│   ├── server.js          # Express app + REST endpoints
│   ├── mockData.js        # In-memory sessions + utilities
│   ├── package.json
│   └── ... (node_modules, etc.)
│
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── index.jsx      # React root, React 18 createRoot
        ├── App.js         # Routing (Landing + Chat)
        ├── tailwind.css   # Tailwind + global theme hooks
        ├── index.css      # Global CSS variables + basic theme
        ├── services/
        │   └── api.js     # Wrapper around fetch to backend
        └── components/
            ├── LandingPage/
            │   ├── index.js
            │   └── index.css
            ├── ChatPage/
            │   ├── index.js
            │   └── index.css
            ├── Sidebar/
            │   ├── index.js
            │   └── index.css
            ├── ChatWindow/
            │   ├── index.js
            │   └── index.css
            ├── ChatInput/
            │   ├── index.js
            │   └── index.css
            ├── TableResponse/
            │   ├── index.js
            │   └── index.css
            ├── AnswerFeedback/
            │   ├── index.js
            │   └── index.css
            ├── ThemeToggle/
            │   ├── index.js
            │   └── index.css
            └── ModelSwitcher/
                ├── index.js
                └── index.css
video-link:https://drive.google.com/file/d/1jkC_zPFNqbq_lNtWnjJlByrTZ6nO8mjS/view?usp=sharing


