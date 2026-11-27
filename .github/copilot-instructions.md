# Sublime copilot instructions

## Architecture
- The app is a React 19/Vite 8 SPA plus an Express 5/CommonJS API; run `frontend/` and `backend/` separately.
- Backend entry: `backend/src/server.js` loads `backend/src/app.js`; app.js registers routes under `/usuarios`, `/estoque`, `/dashboard`, `/producao`, `/pedidos`, `/alertas`, `/caixa`, and `/visaoGeral`.
- Typical API flow is `routes/*.js` -> `controllers/*.js` -> Prisma singleton from `backend/src/config/database.js`. Dashboard is the exception with controller -> `services/dashboardService.js`.
- Data is MySQL/MariaDB through Prisma 7 and `@prisma/adapter-mariadb`. The Prisma models live in `backend/prisma/schema.prisma`; preserve existing Portuguese/Snake Case database field names.
- Frontend routing is centralized in `frontend/src/App.jsx`. Main pages use `frontend/src/pages/<feature>/`, shared UI uses `frontend/src/componentes/` (the `frontend/src/components/` folder is a duplicate/stale layout; App imports `componentes`).

## Local workflows
- Backend: `cd backend && npm install`, then `npm run dev` (nodemon) or `npm start`; default port is 3000. `npm run prisma:generate` generates the Prisma client.
- Frontend: `cd frontend && npm install && npm run dev`; build with `npm run build` and lint with `npm run lint`.
- Local MySQL fallback is `127.0.0.1:3306`, user `root`, empty password, database `sublime_db`; set `DATABASE_URL` for other databases. Set `JWT_SECRET` for auth.
- SQL snapshots/import sources include `sublimedb.sql` and `Dump20261005 (2).sql`; use them for local database recovery, not as generated migrations.
- Manual API checks are in `backend/src/tests/testes_backend.http`; there is no configured automated test script in the package manifests.

## API and data conventions
- Routes map HTTP CRUD directly: for example `estoqueRoutes.js` uses GET/POST/PUT/DELETE and `pedidoRoutes.js` also uses PATCH `/pedidos/:id/status`.
- Controllers return `{ data, total, ... }` or domain objects in many modules; dashboard/alert/error responses often include `sucesso`, `mensagem`, and `dados/error`. Match the target module instead of imposing a global response shape.
- Convert between Prisma enum/Portuguese values and frontend-friendly uppercase values in controller helpers (see `pedidoController.js` and `producaoController.js`). Do not return raw Decimal/Date objects without converting with `Number(...)` or `toISOString()`.
- Protecting `/usuarios` is inconsistent: `senhaAut` middleware protects list/profile, but login/create remain public. A request's decoded JWT currently sets `req.usuarioId`, while one profile fallback reads `req.usuario.id`/`req.usuario.email`; verify payload handling before changing auth.
- Use the shared Prisma instance for database access. Handle Prisma `P2025` as 404 where existing delete/update code does; log and return a module-specific 500/400 response.

## Frontend conventions
- Pages are mostly large stateful JSX components with local `useState`, `useEffect`, native `fetch`, and modal/detail views in the same file. Reuse `frontend/src/services/dashboardService.js` or `frontend/src/services/api.js` as patterns, but do not assume every page uses them.
- The backend is currently hard-coded as `http://localhost:3000` in many pages/services; some dashboard/alerts code accepts `VITE_API_URL`. Centralizing API URLs is possible but requires updating all call sites.
- Keep route names and casing aligned with `frontend/src/App.jsx`; several paths are legacy flat names (for example `/fluxocaixaregistrar`, `/registrarmeta`, `/detalhesordem/:id`) rather than REST-style nested paths.
- Use existing Portuguese labels and status strings. Preserve date conversion helpers (`DD/MM/YYYY` <-> ISO) and currency parsing in pages that already implement them.
- Vite aliases `@` to `frontend/src`; deployment rewrites and backend routing are declared in `vercel.json`.

## Change cautions
- Before adding an endpoint, check `backend/src/app.js` mounts it and `vercel.json` includes its prefix; `calendarioRoutes`, `fluxoController`, and `caixa`/`visaoGeral` routing are not uniformly wired in every deployment/config file.
- Schema changes must consider `backend/prisma/schema.prisma` and MariaDB adapter/config files (`prisma.config.ts` and `prisma7.config.ts`) rather than only changing a controller.
- This is a mixed mature/working-in-progress codebase: duplicate folders, hard-coded URLs, and mismatches such as `index.js` plus `server.js` exist. Make scoped fixes and verify the actual mounted route in `app.js`.
