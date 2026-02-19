# frontend

React + Vite frontend for the recycling management system.

## Stack

- **React 18** + **Vite 5**
- Component-based architecture, no external UI library
- Styles loaded separately via `feat/styles` branch

## Getting started

```bash
npm install
npm run dev
```

## Branch strategy

```
main
└── dev
    ├── feat/cover          # Landing page + auth (login modal, AuthContext)
    ├── feat/coveradmin     # Admin CRUD panel
    └── feat/styles         # Global styles
```

All feature branches are children of `dev`. Open PRs against `dev`, never directly against `main`.

## Project structure

```
src/
├── context/
│   └── AuthContext.jsx     # Auth state, login/logout, role guard
├── components/
│   ├── LoginModal.jsx      # Login form modal
│   ├── EntityForm.jsx      # Generic CRUD form
│   ├── EntitySection.jsx   # CRUD logic per entity
│   └── EntityTable.jsx     # Generic records table
├── pages/
│   └── Index.jsx           # Landing page
├── entities.js             # DB schema config (tables, fields, PKs)
├── api.js                  # All fetch() calls centralised here
└── main.jsx                # App entry point
```

## Connecting the backend

### REST API

Open `src/api.js` and for each function:
1. Uncomment the `return http(...)` line
2. Remove the `_mock` lines
3. Set `BASE_URL` to your API endpoint

```js
// Before (mock):
export async function getAll(entity) {
  return [..._mock[entity]]
}

// After (real API):
export async function getAll(entity) {
  return http('GET', `${BASE_URL}/${entity}`)
}
```

### Authentication

Open `src/context/AuthContext.jsx` and replace the mock block with the real call:

```js
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id_usuario, password }),
})
const data = await res.json() // { id_usuario, rol, id_aula, token }
```

Allowed roles: `profesor`, `administrador`. Any other role is rejected at the AuthContext level.

## Adding a new entity

Edit `src/entities.js`. Components are fully generic and adapt automatically.

```js
my_table: {
  label: 'My Table',
  pk: 'id_my_table',
  fields: [
    { name: 'id_my_table', label: 'ID',     type: 'text', required: true },
    { name: 'status',      label: 'Status', type: 'enum', required: true,
      options: ['active', 'inactive'] },
  ],
}
```

Supported field types: `text`, `number`, `datetime-local`, `enum`.

## Commit convention

```
<type>(<scope>): <description>

feat(cover): add index page with admin login modal
fix(api): handle 401 response on token expiry
chore(deps): update vite to 5.4.2
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`.