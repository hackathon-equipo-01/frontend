import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ onClose, onSuccess }) {
  const { login, loading, error } = useAuth()
  const [form, setForm] = useState({ id_usuario: '', password: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await login(form.id_usuario, form.password)
    if (result.ok) {
      onSuccess(result.user)
    }
  }

  return (

    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="login-title">
        <h2 id="login-title">Acceso administración</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id_usuario">Usuario:</label>
            <input
              id="id_usuario"
              name="id_usuario"
              type="text"
              value={form.id_usuario}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p role="alert">{error}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Accediendo...' : 'Entrar'}
          </button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  )
}
