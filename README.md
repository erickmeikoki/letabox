# Letabox - Movie Discovery Platform

A full-stack movie discovery application built with React, TypeScript, and Firebase. Browse movies, create watchlists, and share reviews with other users.

## Live Demo

The application is deployed and accessible at: [https://ayayaya-f8483.web.app/](https://ayayaya-f8483.web.app/)

## Features

- 🎬 Browse popular and trending movies
- 🔍 Search for movies by title
- 👤 User authentication with Firebase
- ⭐ Rate and review movies
- 📋 Create and manage personal watchlists
- 🎯 Real-time updates using Firebase
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend:**

  - React
  - TypeScript
  - TailwindCSS
  - Shadcn/ui
  - Tanstack Query
  - Wouter (Router)

- **Backend:**

  - Firebase Authentication
  - Cloud Firestore
  - Firebase Hosting
  - Firebase Cloud Functions

- **APIs:**
  - TMDB API for movie data

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/erickmeikoki/letabox.git
cd letabox
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key
```

4. Start the development server:

```bash
npm run dev
```

## Deployment

The application is deployed using Firebase Hosting. To deploy your own instance:

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase:

```bash
firebase init
```

4. Build and deploy:

```bash
npm run build
firebase deploy
```

## License

MIT License
