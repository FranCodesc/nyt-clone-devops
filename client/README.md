# NYT Clone — Client

A functional clone of the New York Times homepage built with React, TypeScript, and Tailwind CSS. Fetches real-time news from the NYT API via a dedicated Express proxy server, and includes Google authentication and a personal bookmarks system.

**Live site:** https://gleaming-banoffee-3e9705.netlify.app

---

## Features

- **Real-time news** — Fetches top stories from 8 sections (U.S., World, Business, Arts, Lifestyle, Opinion, Science, Technology, Travel) via the NYT Top Stories API
- **Market data widget** — Live stock prices for AAPL and TSLA via Finnhub API
- **Google authentication** — Sign in with Google via Firebase Authentication
- **Bookmarks** — Save and remove articles, stored per user in Firebase Firestore
- **Personal dashboard** — View and manage saved articles
- **Responsive design** — Mobile-first layout with hamburger menu and slide-out drawer
- **Category navigation** — Desktop navbar with subsection dropdowns

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool and dev server |
| Tailwind CSS | v4 | Styling (utility-first) |
| Redux Toolkit | 2 | Global state management |
| React Router DOM | 7 | Client-side routing |
| Axios | 1 | HTTP requests |
| Firebase | 12 | Authentication + Firestore |

---

## Project Structure

```
src/
├── components/
│   ├── ArticleCard.tsx      # Article card with bookmark button
│   ├── Categories.tsx       # Desktop navbar with dropdowns
│   ├── Dashboard.tsx        # User dashboard with saved articles
│   ├── Footer.tsx           # Responsive footer (accordion on mobile)
│   ├── MarketData.tsx       # Live stock price widget
│   ├── MobileMenu.tsx       # Hamburger menu with drawer
│   ├── Navbar.tsx           # Top navigation bar
│   └── NewsArea.tsx         # Main news grid layout
├── data/
│   └── categories.ts        # Navigation categories and subsections
├── services/
│   ├── authService.ts       # Firebase Auth helpers
│   ├── bookmarkService.ts   # Firestore bookmark CRUD
│   ├── firebase.ts          # Firebase app initialization
│   ├── finnhubApi.ts        # Finnhub API calls (via proxy)
│   └── nytApi.ts            # NYT API calls (via proxy)
├── store/
│   ├── sliceNews.ts         # Redux slice for news state
│   └── store.ts             # Redux store configuration
├── App.tsx
└── main.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of [nyt-clone-server](https://github.com/FranCodesc/nyt-clone-server)
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
git clone https://github.com/FranCodesc/nyt-clone-client.git
cd nyt-clone-client
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

All `VITE_` prefixed variables are exposed to the client bundle by Vite. Firebase variables are safe to expose; API keys for NYT and Finnhub are kept server-side only.

### Run in Development

Start the proxy server first, then:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

## Deployment (Netlify)

The client is deployed on Netlify via the GitHub repository. On each push to `main`, Netlify automatically rebuilds and deploys.

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

**Environment variables** must be added in the Netlify dashboard under Site settings → Environment variables. Do not commit `.env` to the repository.

---

## Architecture

This client communicates exclusively with the proxy server — never directly with the NYT or Finnhub APIs. This keeps API keys out of the client bundle entirely.

```
Browser (React)
    │
    ├── /api/news/:section   ──►  Express Server  ──►  NYT API
    ├── /api/market/:symbol  ──►  Express Server  ──►  Finnhub API
    │
    └── Firebase SDK  ──►  Firebase Auth + Firestore
```

---

## Firebase Security Rules

Firestore rules allow access only to authenticated users for their own data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookmarks/{bookmarkId} {
      allow read, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## Related Repository

- **Server:** https://github.com/FranCodesc/nyt-clone-server
