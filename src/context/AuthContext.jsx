import { createContext, useContext, useState } from 'react'
export const ALLOWED_ROLES = ['profesor', 'administrador']

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null) 
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function login(email, password) {
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      })
      if (!res.ok) { 
      const errorData = await res.text()  
        throw new Error(errorData || 'Credenciales incorrectas')
      }

      const newData = await res.json()

      const userData = {
        id_usuario: newData.id,
        nombre: newData.name,
        rol: newData.role.toLowerCase(), 
        id_aula: newData.classroomId
      };

      let rolParaVerificar = userData.rol;
      if (userData.rol === 'teacher') rolParaVerificar = 'profesor';
      if (userData.rol === 'admin') rolParaVerificar = 'administrador';
      
      if (!ALLOWED_ROLES.includes(rolParaVerificar)) {
        throw new Error('No tienes permisos para acceder al panel');
      }

      setUser(userData);
      return { ok: true, user: userData }

    } catch (e) {
      const cleanMessage = e.message.includes('<!DOCTYPE html>') 
        ? "El servidor no responde correctamente" 
        : e.message;
    
    setError(cleanMessage);
    return { ok: false, error: cleanMessage };
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setError('')
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
