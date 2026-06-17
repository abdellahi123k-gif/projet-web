# project-web

Two independent sub-projects — **no monorepo orchestration**. Run all commands from the specific project directory.

---

## Frontend (`frontend/frontend-react/`)

- **Stack**: Vite 8 + React 19 (JSX only, no TypeScript) + Bootstrap 5 + React Router DOM v7 + Axios + ESLint 10
- **Entrypoint**: `src/main.jsx` → imports Bootstrap CSS/JS modules, then mounts `<App />`
- **Routing**: `<BrowserRouter>` > `<NotificationProvider>` > `<AppRoutes />` (uses `<Routes>`/`<Route>` pattern, NOT `createBrowserRouter`)
- **Layout**: All pages share `<MainLayout>` (navbar + footer) via React Router outlet
- **Routes**: `/` → Dashboard, `/rendez-vous` → List, `/rendez-vous/ajouter` → Add, `/rendez-vous/modifier/:id` → Edit, `/rendez-vous/:id` → Details, `*` → 404

### Commands (run from this directory)
```
npm run dev      # Vite dev server with HMR on :5173
npm run build    # Production build to dist/
npm run lint     # ESLint 10 flat config (eslint.config.js)
npm run preview  # Preview production build
```

### Known lint quirks (ESLint 10 flat config)
- `react-hooks/set-state-in-effect` — fires on **synchronous** `setState` inside `useEffect`. Use async patterns where `setState` only executes after `await`.
- `react-refresh/only-export-components` — fires when a non-component export (hook, utility) shares a file with a component export. Add `// eslint-disable-next-line react-refresh/only-export-components` on the non-component export. Used in `useNotification.jsx`.

### API integration
- **Base URL**: `import.meta.env.VITE_API_URL` from `.env` file, fallback `http://localhost:8080/api` (see `src/services/api.js`)
- **Axios interceptor**: automatically appends `:00` to `heureRendezVous` values of length 5 (`HH:mm` → `HH:mm:ss`) to match backend `LocalTime` format
- **No proxy configured** — uses absolute URL + backend CORS

### Other
- No test framework configured
- Bootstrap 5 CSS/JS imported as ES module in `main.jsx` (`import 'bootstrap/dist/css/bootstrap.min.css'`)
- ESLint ignores `dist` globally

---

## Backend (`backend/rendezvous-backend/rendezvous-backend/`)

- **Stack**: Spring Boot 4.1.1-SNAPSHOT (from `spring-snapshots` repo), Java 17, Maven, Spring Data JPA + WebMVC + Validation + Lombok + SpringDoc OpenAPI 2.8.5
- **Artifact note**: uses `spring-boot-starter-webmvc` (Spring Boot 4 naming, not `spring-boot-starter-web`)
- **Package**: `com.gestion.rendezvous_backend`
- **Main class**: `RendezvousBackendApplication`
- **API base**: `http://localhost:8080/api/rendezvous`
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`

### Architecture
```
controller/   RendezVousController (REST)
service/      RendezVousService (interface) + impl/RendezVousServiceImpl
repository/   RendezVousRepository (Spring Data JPA)
model/        RendezVous (entity), StatutRendezVous (enum)
dto/          RendezVousRequest, RendezVousResponse (Java records)
exception/    ResourceNotFoundException, GlobalExceptionHandler
config/       CorsConfig, OpenApiConfig
mapper/       RendezVousMapper (entity ↔ DTO)
```

### REST endpoints
| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/rendezvous?nomClient=&statut=&page=0&size=10` | Paginated, sorted by dateRendezVous DESC |
| GET | `/api/rendezvous/{id}` | Single by ID |
| POST | `/api/rendezvous` | Create, returns 201 |
| PUT | `/api/rendezvous/{id}` | Update |
| DELETE | `/api/rendezvous/{id}` | Returns 204 |

### Configuration (profile-based)
- `application.properties` sets `spring.profiles.active=prod`
- `application-prod.properties` contains MySQL + Jackson + server config
- **Jackson 3 quirk**: Spring Boot 4 uses Jackson 3 (tools.jackson). The property `spring.jackson.serialization.write-dates-as-timestamps` does **not exist** in Jackson 3. Dates are serialized as ISO strings by default.
- **Hibernate 7 quirk**: Dialect is auto-detected from JDBC URL. Setting `spring.jpa.properties.hibernate.dialect` is unnecessary and produces a deprecation warning.

### Database
- **Production**: MySQL, auto-DDL (`ddl-auto=update`), database name `rendezvous-backend` (with hyphen)
- **Test**: H2 in-memory via `src/test/resources/application.properties` (overrides prod profile)
- MySQL Connector/J is `runtime` scope, H2 is `test` scope

### StatutRendezVous enum
`EN_ATTENTE`, `CONFIRME`, `ANNULE`, `TERMINE` — Frontend sends all 4 values.

### CORS
Allows `http://localhost:5173` (Vite dev server) on `/api/**` with GET, POST, PUT, DELETE, OPTIONS, credentials.

### Commands (run from this directory)
```
.\mvnw spring-boot:run          # Start server (needs MySQL :3306)
.\mvnw test                     # 1 smoke test (uses H2, no MySQL)
.\mvnw clean compile            # Compile only
```
