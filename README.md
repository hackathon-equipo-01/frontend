# ♻️ EcoSchool — Waste Management System for School
A full-stack web application for registering, classifying, and monitoring waste in educational centres. Built with a separated frontend/backend architecture and a REST API.

## 👥 Authors

| Name 
|------|--------|
| Ingrid López | 
| Cristina Viejó | 
| Facundo Garavaglia |
| Xavier Piñeiro | 
| Sergio Fernandez | 
| Marlen Alvarez | 

## 🔗 Resources

- 🎨 [Figma Design](https://www.figma.com/design/Ns9KGkITG36xOT2dVi5REh/Hackaton?t=iiXZSyrW7DVWi2eT-0)
- 🗄️ [Database Diagram](https://drive.google.com/file/d/19e2ulCx6UqVhS5MPr8ZJvVckunWT7mFJ/view)



## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [API & Authentication](#api--authentication)
- [Adding Entities](#adding-entities)
- [Admin CRUD Panel](#admin-crud-panel)
- [Commit Convention](#commit-convention)


## Overview

EcoSchool allows schools to:

- Register and classify waste by category (plastic, paper, organic, etc.)
- List and monitor the status of each waste entry
- Visualise total volume per category
- Trigger alerts when thresholds are exceeded
- Manage data through a role-protected admin panel


## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| State / Auth | React Context API |
| Backend | REST API (stack open) |
| Database | Relational (see diagram) |
| Styles | Custom CSS (`feat/styles` branch) |
| Testing | Unit tests · ≥75% coverage |



## Project Structure


root/
├── frontend/
│   └── src/
│       ├── context/
│       │   └── AuthContext.jsx       # Auth state, login/logout, role guard
│       ├── components/
│       │   ├── LoginModal.jsx        # Login form modal
│       │   ├── EntityForm.jsx        # Generic CRUD form
│       │   ├── EntitySection.jsx     # CRUD logic per entity
│       │   └── EntityTable.jsx       # Generic records table with actions
│       ├── pages/
│       │   └── Index.jsx             # Landing page
│       ├── entities.js               # DB schema config (tables, fields, PKs)
│       ├── api.js                    # All fetch() calls centralised here
│       └── main.jsx                  # App entry point
└── backend/
    └── ...                           # Controllers, routes, models


## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev


### Backend

```bash
cd backend
# Follow backend-specific setup instructions


## Branch Strategy


main
└── dev
    ├── feat/cover          # Landing page + auth (login modal, AuthContext)
    ├── feat/coveradmin     # Admin CRUD panel
    └── feat/styles         # Global styles


All feature branches are children of `dev`. Open PRs against `dev`, **never** directly against `main`.


## API & Authentication

### Connecting the REST API

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

### Authentication

Open `src/context/AuthContext.jsx` and replace the mock block with the real call:

```js
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id_usuario, password }),
})
const data = await res.json() // { id_usuario, rol, id_aula, token }


Allowed roles: `profesor`, `administrador`. Any other role is rejected at the `AuthContext` level.


## Adding Entities

Edit `src/entities.js`. All components are fully generic and adapt automatically.

```js
my_table: {
  label: 'My Table',
  pk: 'id_my_table',
  fields: [
    { name: 'id_my_table', label: 'ID',     type: 'text',   required: true },
    { name: 'status',      label: 'Status', type: 'enum',   required: true,
      options: ['active', 'inactive'] },
    { name: 'count',       label: 'Count',  type: 'number', required: false },
  ],
}

### Supported Field Types

| Type | Renders |
|------|---------|
| `text` | `<input type="text">` |
| `number` | `<input type="number">` |
| `datetime-local` | `<input type="datetime-local">` |
| `enum` | `<select>` with options |

## Admin CRUD Panel

The admin panel (`feat/coveradmin`) is a separate interface for managing the database directly.

### Connecting the Backend (Admin)

Open `src/api.js` inside the admin panel and follow the same steps as the main frontend.

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

Set `BASE_URL` to your deployed or local API endpoint.

## Commit Convention

```
<type>(<scope>): <description>

feat(cover): add index page with admin login modal
fix(api): handle 401 response on token expiry
chore(deps): update vite to 5.4.2
```

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructure, no behaviour change |
| `chore` | Maintenance, dependency updates |
| `docs` | Documentation only |
| `style` | Formatting, styles |

---

---

# ♻️ EcoSchool — Sistema de Gestión de Residuos para Centros Escolares

Aplicación web full-stack para registrar, clasificar y monitorizar residuos en centros educativos. Construida con arquitectura frontend/backend separada y comunicación mediante API REST.

---

## 👥 Autores

| Nombre | GitHub |
|--------|--------|
| Ingrid López | — |
| Cristina Viejó | — |
| Facundo Garavaglia | — |
| Xavier Piñeiro | — |
| Sergio Fernandez | — |
| Marlen Alvarez | — |

---

## 🔗 Recursos

- 🎨 [Diseño en Figma](https://www.figma.com/design/Ns9KGkITG36xOT2dVi5REh/Hackaton?t=iiXZSyrW7DVWi2eT-0)
- 🗄️ [Diagrama de Base de Datos](https://drive.google.com/file/d/19e2ulCx6UqVhS5MPr8ZJvVckunWT7mFJ/view)

---

## 📋 Tabla de Contenidos

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Inicio rápido](#inicio-rápido)
- [Estrategia de ramas](#estrategia-de-ramas)
- [API y Autenticación](#api-y-autenticación)
- [Añadir entidades](#añadir-entidades)
- [Panel CRUD de administración](#panel-crud-de-administración)
- [Convención de commits](#convención-de-commits)

---

## Descripción general

EcoSchool permite a los centros escolares:

- Registrar y clasificar residuos por categoría (plástico, papel, orgánico, etc.)
- Listar y monitorizar el estado de cada entrada de residuos
- Visualizar el volumen total por categoría
- Activar alertas cuando se superan umbrales definidos
- Gestionar los datos mediante un panel de administración con control de roles

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite 5 |
| Estado / Auth | React Context API |
| Backend | API REST (stack libre) |
| Base de datos | Relacional (ver diagrama) |
| Estilos | CSS personalizado (rama `feat/styles`) |
| Testing | Tests unitarios · ≥75% de cobertura |

---

## Estructura del proyecto

```
root/
├── frontend/
│   └── src/
│       ├── context/
│       │   └── AuthContext.jsx       # Estado de auth, login/logout, guardia de roles
│       ├── components/
│       │   ├── LoginModal.jsx        # Modal de inicio de sesión
│       │   ├── EntityForm.jsx        # Formulario CRUD genérico
│       │   ├── EntitySection.jsx     # Lógica CRUD por entidad
│       │   └── EntityTable.jsx       # Tabla genérica con acciones
│       ├── pages/
│       │   └── Index.jsx             # Página de inicio
│       ├── entities.js               # Configuración del esquema de BD
│       ├── api.js                    # Todas las llamadas fetch() centralizadas
│       └── main.jsx                  # Punto de entrada de la app
└── backend/
    └── ...                           # Controladores, rutas, modelos
```

---

## Inicio rápido

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
# Sigue las instrucciones específicas del backend
```

---

## Estrategia de ramas

```
main
└── dev
    ├── feat/cover          # Landing page + auth (modal de login, AuthContext)
    ├── feat/coveradmin     # Panel CRUD de administración
    └── feat/styles         # Estilos globales
```

Todas las ramas de funcionalidad son hijas de `dev`. Abre PRs contra `dev`, **nunca** directamente contra `main`.

---

## API y Autenticación

### Conectar la API REST

Abre `src/api.js` y para cada función:

1. Descomenta la línea `return http(...)`
2. Elimina las líneas `_mock`
3. Establece `BASE_URL` con el endpoint de tu API

```js
// Antes (mock):
export async function getAll(entity) {
  return [..._mock[entity]]
}

// Después (API real):
export async function getAll(entity) {
  return http('GET', `${BASE_URL}/${entity}`)
}
```

### Autenticación

Abre `src/context/AuthContext.jsx` y sustituye el bloque mock por la llamada real:

```js
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id_usuario, password }),
})
const data = await res.json() // { id_usuario, rol, id_aula, token }
```

Roles permitidos: `profesor`, `administrador`. Cualquier otro rol es rechazado en el nivel de `AuthContext`.

---

## Añadir entidades

Edita `src/entities.js`. Todos los componentes son genéricos y se adaptan automáticamente.

```js
mi_tabla: {
  label: 'Mi Tabla',
  pk: 'id_mi_tabla',
  fields: [
    { name: 'id_mi_tabla', label: 'ID',      type: 'text',   required: true },
    { name: 'estado',      label: 'Estado',  type: 'enum',   required: true,
      options: ['activo', 'inactivo'] },
    { name: 'cantidad',    label: 'Cantidad', type: 'number', required: false },
  ],
}
```

### Tipos de campo soportados

| Tipo | Renderiza |
|------|-----------|
| `text` | `<input type="text">` |
| `number` | `<input type="number">` |
| `datetime-local` | `<input type="datetime-local">` |
| `enum` | `<select>` con opciones |

---

## Panel CRUD de administración

El panel de administración (`feat/coveradmin`) es una interfaz separada para gestionar la base de datos directamente.

### Conectar el backend (Admin)

Abre `src/api.js` dentro del panel de administración y sigue los mismos pasos que en el frontend principal.

```js
// Antes (mock):
export async function getAll(entity) {
  _initMock(entity)
  return [..._mock[entity]]
}

// Después (API real):
export async function getAll(entity) {
  return http('GET', `${BASE_URL}/${entity}`)
}
```

Establece `BASE_URL` con el endpoint de tu API (local o desplegado).

---

## Convención de commits

```
<tipo>(<ámbito>): <descripción>

feat(cover): añadir página index con modal de login para admin
fix(api): gestionar respuesta 401 al expirar el token
chore(deps): actualizar vite a 5.4.2
```

| Tipo | Cuándo usarlo |
|------|---------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `refactor` | Reestructuración sin cambios de comportamiento |
| `chore` | Mantenimiento, actualización de dependencias |
| `docs` | Solo documentación |
| `style` | Formato, estilos |
