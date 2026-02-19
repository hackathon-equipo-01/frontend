// ─────────────────────────────────────────────────────────────
// Capa de API — sustituye BASE_URL por la URL de tu backend.
// Todas las operaciones CRUD pasan por aquí.
// Actualmente usa un store en memoria como mock.
// ─────────────────────────────────────────────────────────────

const BASE_URL = '/api' // Cambia esto por tu endpoint real

// ── MOCK en memoria (elimina esto cuando conectes el backend) ──
const _mock = {}

function _initMock(entity) {
  if (!_mock[entity]) _mock[entity] = []
}

// ── Helpers ──
async function http(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status}`)
  return res.json()
}

// ─────────────────────────────────────────────────────────────
// CRUD GENÉRICO
// Cambia cada función para usar http() en lugar de _mock
// ─────────────────────────────────────────────────────────────

export async function getAll(entity) {
  // return http('GET', `${BASE_URL}/${entity}`)
  _initMock(entity)
  return [..._mock[entity]]
}

export async function create(entity, data) {
  // return http('POST', `${BASE_URL}/${entity}`, data)
  _initMock(entity)
  _mock[entity].push({ ...data })
  return { ...data }
}

export async function update(entity, pk, pkValue, data) {
  // return http('PUT', `${BASE_URL}/${entity}/${pkValue}`, data)
  _initMock(entity)
  const idx = _mock[entity].findIndex(r => r[pk] === pkValue)
  if (idx !== -1) _mock[entity][idx] = { ...data }
  return { ...data }
}

export async function remove(entity, pk, pkValue) {
  // return http('DELETE', `${BASE_URL}/${entity}/${pkValue}`)
  _initMock(entity)
  _mock[entity] = _mock[entity].filter(r => r[pk] !== pkValue)
  return { ok: true }
}
