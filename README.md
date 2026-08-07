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

| Ambiente | Componente | Infrastruttura | Trigger | URL |
|---|---|---|---|---|
| Development | client + server | Docker Compose, locale | manuale | `http://localhost:5173` (client), `http://localhost:3000` (server) |
| Production | client | Netlify | push su `main` che supera la CI | https://nyt-clone-francodesc.netlify.app |
| Production | server | Render | push su `main` che supera la CI | https://nyt-clone-server.onrender.com |

Nota: non è presente un ambiente di staging isolato. Inizialmente il client usava le Deploy Preview automatiche di Netlify per branch/PR, ma da quando il deploy è stato spostato interamente dentro la pipeline GitHub Actions (vedi sotto), quel meccanismo non è più collegato: Netlify non è più agganciato al repository Git, riceve solo i file già pronti dalla pipeline. Il server non ha mai avuto un ambiente di staging isolato (funzionalità a pagamento su Render).

## Stack CI/CD

Pipeline unica in `.github/workflows/ci.yml`, eseguita su ogni push e pull request verso `main`, con 4 job:

- **`client` / `server` (CI):** installazione dipendenze, lint (ESLint) e build dell'immagine Docker, separatamente per client e server. Se il lint fallisce, il job si interrompe e la pipeline viene segnalata come fallita, bloccando gli step successivi.
- **`deploy-client` (CD):** parte solo se il job `client` è andato a buon fine, e solo su push reali a `main` (non su pull request). Builda il client con Vite usando le variabili d'ambiente da GitHub Secrets, poi pubblica la cartella `dist/` direttamente su Netlify tramite `netlify-cli` (autenticato con un Personal Access Token), con il flag `--no-build` per evitare che Netlify ricostruisca a sua volta il progetto con impostazioni proprie.
- **`deploy-server` (CD):** parte solo se il job `server` è andato a buon fine, e chiama il Deploy Hook di Render per innescare il deploy in produzione.

**Perché questa architettura e non l'integrazione Git nativa di Netlify/Render:** inizialmente il deploy era affidato al meccanismo automatico di Netlify/Render collegato al repository ma è sorto un problema: quel meccanismo triggera in modo indipendente dal risultato della pipeline CI, quindi anche un push con lint fallito sarebbe comunque arrivato in produzione. Per garantire che il deploy avvenga solo dopo il successo della CI (requisito esplicito della consegna), Netlify è stato scollegato dal repository e il deploy è  stato spostato interamente dentro GitHub Actions, con `needs:` a garantire l'ordine e il gating.

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
| Sentry | — | Error tracking |

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
│   │   ├── hooks/            # useAuth
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

**CORS:** il server accetta richieste solo dalle origin elencate nella variabile d'ambiente `CLIENT_URL` (default `http://localhost:5173` in sviluppo; in produzione impostata con l'URL pubblico del client su Netlify).

**Secrets nella pipeline:** tutte le chiavi (Firebase, NYT, Finnhub, Sentry, token Netlify/Render) sono salvate come GitHub Secrets e mai stampate nei log della pipeline — negli step di build vengono passate come variabili d'ambiente, mai loggate in chiaro.

## Chiavi API necessarie

Per far funzionare l'app servono account gratuiti su:
- [NYT Developer API](https://developer.nytimes.com) — per `NYT_API_KEY`
- [Finnhub](https://finnhub.io) — per `FINNHUB_API_KEY`
- Un progetto [Firebase](https://firebase.google.com) con Authentication (Google) e Firestore abilitati — per le variabili `VITE_FIREBASE_*`
- Un progetto [Sentry](https://sentry.io) — per `VITE_SENTRY_DSN`

## Monitoraggio

**Uptime monitoring — UptimeRobot:** due monitor HTTP attivi, uno sul client (`https://nyt-clone-francodesc.netlify.app`) e uno sul server (`https://nyt-clone-server.onrender.com`), con controllo ogni 5 minuti. Quando un monitor rileva un'interruzione invia una email di notifica; un'altra email arriva quando il servizio torna disponibile.

Come interpretare gli alert: un alert "Down" sul server puo essere un falso positivo dovuto al cold start del piano gratuito Render (il servizio si "addormenta" dopo inattività e la prima richiesta può impiegare fino a 50 secondi) — prima di considerarlo un'interruzione reale, verificare aprendo l'URL direttamente e attendendo la risposta. Se il monitor segnala "Down" ripetutamente su controlli consecutivi (quindi oltre il tempo di cold start), è un'interruzione reale: controllare i log del servizio interessato (Render → Logs, oppure Netlify → Deploys) per capire la causa.

**Error tracking — Sentry:** il client (`nyt-clone-client` su Sentry) invia automaticamente ogni errore JavaScript non gestito che si verifica nel browser dell'utente. Ogni evento riporta stack trace, browser/sistema operativo, URL della pagina e breadcrumb delle azioni precedenti l'errore. È stato configurato un alert che notifica via email sulla creazione di una nuova issue.

Come interpretare gli alert: alla ricezione di un'email da Sentry, aprire l'issue collegata e leggere lo stack trace per individuare il file e la riga responsabili; controllare "Breadcrumbs" per capire la sequenza di azioni dell'utente che ha portato all'errore. Una volta corretto il bug e ridistribuito il fix, l'issue va marcata come "Resolved"; se invece non è un problema reale (es. errore causato da un'estensione del browser dell'utente), va marcata come "Ignored".

## Note e limiti noti

Il piano gratuito di Render "addormenta" il servizio dopo un periodo di inattività: la prima richiesta dopo un po' di inattività può richiedere 50+ secondi prima di ricevere risposta (il monitor UptimeRobot, controllando ogni 5 minuti, ha anche l'effetto collaterale di mantenere il servizio sveglio più spesso).

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