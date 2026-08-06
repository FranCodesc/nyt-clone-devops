# NYT Clone — Server

An Express.js proxy server that sits between the React client and external APIs (NYT and Finnhub). Its sole purpose is to keep API keys out of the client bundle by handling all third-party requests server-side.

**Deployed on:** https://nyt-clone-server.onrender.com

---

## Why a Proxy Server?

When API keys are used directly in a React app, they get bundled into the JavaScript that the browser downloads — meaning anyone can read them in DevTools. This server solves that by:

1. Receiving requests from the client (no API keys needed client-side)
2. Attaching the secret API keys server-side via environment variables
3. Forwarding the request to the external API
4. Returning the response to the client

---

## Endpoints

### News

```
GET /api/news/:section
```

Fetches top stories from the NYT Top Stories API for a given section.

**Supported sections:** `us`, `world`, `business`, `arts`, `fashion`, `opinion`, `science`, `technology`, `travel`, `health`, `movies`, `theater`, `realestate`

**Example:**
```
GET /api/news/technology
```

**Response:** NYT Top Stories API response (array of articles with title, abstract, url, multimedia, etc.)

---

### Market Data

```
GET /api/market/:symbol
```

Fetches a real-time stock quote from the Finnhub API.

**Example:**
```
GET /api/market/AAPL
```

**Response:** Finnhub quote object (`c` = current price, `d` = change, `dp` = percent change, etc.)

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 5 | HTTP server and routing |
| TypeScript | 6 | Type safety |
| ts-node | 10 | Run TypeScript directly in dev |
| nodemon | 3 | Auto-restart on file changes |
| Axios | 1 | HTTP requests to external APIs |
| cors | 2 | Cross-origin request handling |
| dotenv | 17 | Load environment variables |

---

## Project Structure

```
src/
├── routes/
│   ├── news.ts       # GET /api/news/:section → NYT API
│   └── market.ts     # GET /api/market/:symbol → Finnhub API
└── index.ts          # Express app setup, CORS, route mounting
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A NYT Developer API key — https://developer.nytimes.com
- A Finnhub API key — https://finnhub.io

### Installation

```bash
git clone https://github.com/FranCodesc/nyt-clone-server.git
cd nyt-clone-server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NYT_API_KEY=your_nyt_api_key
FINNHUB_API_KEY=your_finnhub_api_key
```

Never commit this file — it is listed in `.gitignore`.

### Run in Development

```bash
npm run dev
```

The server runs at `http://localhost:3000`. nodemon will automatically restart on any TypeScript file change.

### Build & Run in Production

```bash
npm run build   # compiles TypeScript to dist/
npm start       # runs dist/index.js with Node
```

---

## CORS Configuration

The server uses the `cors` package to restrict which origins can call it. In `src/index.ts`:

```ts
app.use(cors({
  origin: ["http://localhost:5173", "https://gleaming-banoffee-3e9705.netlify.app"]
}));
```

If you deploy the client to a different domain, add it to this array and redeploy the server.

---

## Deployment (Render)

The server is deployed as a **Web Service** on Render, connected to the GitHub repository. Every push to `main` triggers an automatic redeploy.

**Build & start settings:**
- Build command: `npm install && npm run build`
- Start command: `node dist/index.js`

**Environment variables** must be added in the Render dashboard under Environment. Do not commit `.env` to the repository.

> **Note:** The free Render tier spins down after periods of inactivity. The first request after a cold start may take 50+ seconds.

---

## Related Repository

- **Client:** https://github.com/FranCodesc/nyt-clone-client
