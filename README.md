# Admin CRUD — Reciclaje

Panel de administración CRUD para las tablas del sistema de reciclaje.

## Instalación y arranque

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── entities.js              # Definición del esquema (tablas, campos, tipos, PKs)
├── api.js                   # Capa de API — aquí van todos los fetch()
├── App.jsx                  # Componente raíz + navegación
└── components/
    ├── EntitySection.jsx    # Lógica CRUD de una entidad (estado, handlers)
    ├── EntityForm.jsx       # Formulario genérico de crear/editar
    └── EntityTable.jsx      # Tabla genérica con acciones
```

## Cómo conectar al backend PostgreSQL

Abre `src/api.js` y en cada función:

1. Descomenta la línea `return http(...)`
2. Elimina las líneas de `_mock`
3. Ajusta `BASE_URL` a la URL de tu API

```js
// Ejemplo — antes (mock):
export async function getAll(entity) {
  _initMock(entity)
  return [..._mock[entity]]
}

// Después (API real):
export async function getAll(entity) {
  return http('GET', `${BASE_URL}/${entity}`)
}
```

## Añadir o modificar una entidad

Solo edita `src/entities.js`. Los componentes son completamente genéricos y se adaptan automáticamente a cualquier configuración de campos.

```js
mi_tabla: {
  label: 'Mi Tabla',
  pk: 'id_mi_tabla',
  fields: [
    { name: 'id_mi_tabla', label: 'ID',    type: 'text',   required: true },
    { name: 'nombre',      label: 'Nombre', type: 'text',   required: true },
    { name: 'tipo',        label: 'Tipo',   type: 'enum',   required: true,
      options: ['a', 'b', 'c'] },
  ],
}
```

### Tipos de campo disponibles
| type             | Renderiza           |
|------------------|---------------------|
| `text`           | `<input type="text">` |
| `number`         | `<input type="number">` |
| `datetime-local` | `<input type="datetime-local">` |
| `enum`           | `<select>` con options |
