# NYT Clone — Progetto DevOps

## Panoramica
NYT Clone è un'applicazione full-stack che replica l'homepage del New York Times. Il repository è organizzato come monorepo con due componenti indipendenti:

- `client/` — Single Page Application (React 19, TypeScript, Vite, Tailwind CSS, Redux Toolkit, React Router). Espone la UI e gestisce autenticazione (Firebase Auth) e persistenza dei bookmark (Firestore).
- `server/` — API REST (Express, TypeScript) che funge da proxy autenticato verso NYT Top Stories API e Finnhub, isolando le credenziali di terze parti dal client.

## Funzionalità principali
- Notizie in tempo reale da 8+ sezioni del NYT (U.S., World, Business, Arts, Lifestyle, Opinion, Science, Technology, Travel), tramite la NYT Top Stories API
- Widget quotazioni di borsa in tempo reale (AAPL, MSFT, GOOGL) via Finnhub API
- Login con Google tramite Firebase Authentication
- Bookmark: salvataggio e rimozione articoli, persistenti per utente su Firebase Firestore
- Dashboard personale con gli articoli salvati
- Layout responsive, mobile-first, con menu a scomparsa
- Navigazione per categoria con sottosezioni

## Architettura
```
Client (Netlify) → Server (Render) → NYT API / Finnhub
Client (Netlify) → Firebase Auth + Firestore
```

Il client comunica esclusivamente con il proprio server, mai direttamente con NYT o Finnhub: questo tiene le rispettive API key fuori dal bundle JavaScript scaricato dal browser, dove chiunque potrebbe leggerle dagli strumenti sviluppatore. Verso Firebase invece il client comunica direttamente, usando chiavi pubbliche per design (la sicurezza reale è demandata alle regole di Firestore, vedi sezione "Sicurezza" più sotto).

## Ambienti

| Ambiente | Componente | Infrastruttura | Trigger |
|---|---|---|---|
| Development | client + server | Docker Compose, locale | manuale |
| Staging | client | Netlify Deploy Preview | push su branch ≠ main / apertura PR |
| Production | client | Netlify | push su main |
| Production | server | Render | push su main |

Nota: il server non dispone di un ambiente di staging isolato (funzionalità a pagamento su Render). Gli ambienti di staging del client puntano quindi al server di produzione.

## Stack CI/CD
- **CI:** GitHub Actions — nativo su GitHub, nessuna dipendenza da servizi terzi aggiuntivi.
- **CD:** Netlify (client) + Render (server) — entrambi con deploy automatico via integrazione Git su push a `main`.

## Tech stack

**Client**

| Tecnologia | Versione | Ruolo |
|---|---|---|
| React | 19 | Libreria UI |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool e dev server |
| Tailwind CSS | v4 | Styling utility-first |
| Redux Toolkit | 2 | Gestione stato globale (news) |
| React Router DOM | 7 | Routing lato client |
| Axios | 1 | Chiamate HTTP |
| Firebase | 12 | Authentication + Firestore |

**Server**

| Tecnologia | Versione | Ruolo |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 5 | Server HTTP e routing |
| TypeScript | 6 | Type safety |
| ts-node | 10 | Esecuzione TypeScript in sviluppo |
| nodemon | 3 | Restart automatico su modifica file (dev) |
| Axios | 1 | Chiamate alle API esterne |
| cors | 2 | Gestione richieste cross-origin |
| dotenv | 17 | Caricamento variabili d'ambiente |

## Struttura del repository
```
nyt-clone-devops/
├── client/
│   ├── src/
│   │   ├── components/     # ArticleCard, Categories, Dashboard, Footer, MarketData, MobileMenu, Navbar, NewsArea
│   │   ├── data/            # categorie di navigazione
│   │   ├── services/        # authService, bookmarkService, firebase, finnhubApi, nytApi
│   │   ├── store/            # Redux slice + store
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── .env.example
├── server/
│   ├── src/
│   │   ├── routes/           # news.ts (proxy NYT), market.ts (proxy Finnhub)
│   │   └── index.ts
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── .github/workflows/
└── README.md
```

## API del server

Tutte le route sono montate sotto `/api` e restituiscono direttamente la risposta JSON dell'API esterna corrispondente.

**`GET /api/news/:section`** — Top stories NYT per sezione.
Sezioni supportate: `us`, `world`, `business`, `arts`, `fashion`, `opinion`, `science`, `technology`, `travel`, `health`, `movies`, `theater`, `realestate`.
Esempio: `GET /api/news/technology` → array di articoli con titolo, abstract, url, immagini.

**`GET /api/market/:symbol`** — Quotazione azionaria in tempo reale via Finnhub.
Esempio: `GET /api/market/AAPL` → oggetto quotazione (`c` = prezzo corrente, `d` = variazione, `dp` = variazione percentuale).

## Sicurezza

**Chiavi Firebase lato client:** sono pubbliche per progettazione di Firebase stesso — la sicurezza non dipende dal nasconderle, ma dalle regole di accesso configurate su Firestore. Regole applicate ai bookmark (accesso solo all'utente autenticato proprietario del dato):
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

**Chiavi NYT e Finnhub:** restano esclusivamente lato server, lette da variabili d'ambiente (`NYT_API_KEY`, `FINNHUB_API_KEY`), mai esposte al client.

**CORS:** il server accetta richieste solo dalle origin elencate nella variabile d'ambiente `CLIENT_URL` (default `http://localhost:5173` in sviluppo; in produzione va impostata con l'URL pubblico del client). Vedi `server/.env.example`.

## Chiavi API necessarie

Per far funzionare l'app servono account gratuiti su:
- [NYT Developer API](https://developer.nytimes.com) — per `NYT_API_KEY`
- [Finnhub](https://finnhub.io) — per `FINNHUB_API_KEY`
- Un progetto [Firebase](https://firebase.google.com) con Authentication (Google) e Firestore abilitati — per le variabili `VITE_FIREBASE_*`

## Note e limiti noti

Il piano gratuito di Render "addormenta" il servizio dopo un periodo di inattività: la prima richiesta dopo un po' di inattività può richiedere 50+ secondi prima di ricevere risposta.

## Comandi Docker usati

Build delle immagini (fase di produzione, usata anche dalla pipeline CI):
```
docker build -t nyt-clone-client ./client
docker build -t nyt-clone-server ./server
```

Avvio dell'ambiente di sviluppo locale (client + server insieme, con hot-reload):
```
docker compose up --build
```

Il flag `--build` forza la ricostruzione delle immagini secondo `docker-compose.yml`, evitando che Compose riusi immagini con lo stesso nome costruite in precedenza a mano.

Arresto dell'ambiente:
```
docker compose down
```
