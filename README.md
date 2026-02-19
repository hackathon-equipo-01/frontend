# Admin CRUD

Administration panel for managing the recycling system database.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── entities.js              # Schema definition (tables, fields, types, PKs)
├── api.js                   # All fetch() calls centralised here
├── App.jsx                  # Root component + navigation
└── components/
    ├── EntitySection.jsx    # CRUD logic per entity (state, handlers)
    ├── EntityForm.jsx       # Generic create/edit form
    └── EntityTable.jsx      # Generic records table with actions
```

## Connecting the backend

Open `src/api.js` and for each function:

1. Uncomment the `return http(...)` line
2. Remove the `_mock` lines
3. Set `BASE_URL` to your API endpoint

```js
// Before (mock):
export async function getAll(entity) {
  _initMock(entity)
  return [..._mock[entity]]
}

// After (real API):
export async function getAll(entity) {
  return http('GET', `${BASE_URL}/${entity}`)
}
```

## Adding or modifying an entity

Edit `src/entities.js`. Components are fully generic and adapt automatically.

```js
my_table: {
  label: 'My Table',
  pk: 'id_my_table',
  fields: [
    { name: 'id_my_table', label: 'ID',   type: 'text', required: true },
    { name: 'name',        label: 'Name', type: 'text', required: true },
    { name: 'type',        label: 'Type', type: 'enum', required: true,
      options: ['a', 'b', 'c'] },
  ],
}
```

### Supported field types

| type             | Renders                         |
|------------------|---------------------------------|
| `text`           | `<input type="text">`           |
| `number`         | `<input type="number">`         |
| `datetime-local` | `<input type="datetime-local">` |
| `enum`           | `<select>` with options         |