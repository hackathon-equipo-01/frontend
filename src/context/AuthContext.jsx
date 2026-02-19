//El mock temporal usa id_usuario: 'prof_01' y admin_01 con password 1234

import { createContext, useContext, useState } from 'react'

// Roles con acceso al panel de administración
export const ALLOWED_ROLES = ['profesor', 'administrador']

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)  // { id_usuario, rol, id_aula }
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function login(id_usuario, password) {
    setError('')
    setLoading(true)

    try {
      // ── TODO: sustituir por llamada real a la API ──────────────────────
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id_usuario, password }),
      // })
      // if (!res.ok) throw new Error('Credenciales incorrectas')
      // const data = await res.json()  // { id_usuario, rol, id_aula, token }
      // ──────────────────────────────────────────────────────────────────

      // Mock temporal — eliminar cuando esté el backend
      const MOCK_USERS = [
        { id_usuario: 'prof_01',  rol: 'profesor',       id_aula: 'aula_1', password: '1234' },
        { id_usuario: 'admin_01', rol: 'administrador',  id_aula: null,     password: '1234' },
      ]
      const found = MOCK_USERS.find(
        u => u.id_usuario === id_usuario && u.password === password
      )
      if (!found) throw new Error('Credenciales incorrectas')
      const { password: _, ...data } = found
      // ── fin mock ──────────────────────────────────────────────────────

      // Verificar que el rol tiene acceso
      if (!ALLOWED_ROLES.includes(data.rol)) {
        throw new Error('No tienes permisos para acceder al panel')
      }

      setUser(data)
      // TODO: guardar token en httpOnly cookie o localStorage según estrategia
      return { ok: true, user: data }

    } catch (e) {
      setError(e.message)
      return { ok: false, error: e.message }
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setError('')
    // TODO: invalidar token en backend / limpiar cookie
  }

  return (
    <AuthContext.Provider value={{ user, error, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
