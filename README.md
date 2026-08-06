# NYT Clone — Progetto DevOps

## Panoramica
NYT Clone è un'applicazione full-stack che replica l'homepage del New York Times. Il repository è organizzato come monorepo con due componenti indipendenti:

- `client/` — Single Page Application (React 19, TypeScript, Vite, Tailwind CSS, Redux Toolkit, React Router). Espone la UI e gestisce autenticazione (Firebase Auth) e persistenza dei bookmark (Firestore).
- `server/` — API REST (Express, TypeScript) che funge da proxy autenticato verso NYT Top Stories API e Finnhub, isolando le credenziali di terze parti dal client.

## Architettura
```
Client (Netlify) → Server (Render) → NYT API / Finnhub
Client (Netlify) → Firebase Auth + Firestore
```

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

## Struttura del repository
```
nyt-clone-devops/
├── client/
├── server/
├── docker-compose.yml
├── .github/workflows/
└── README.md
```
