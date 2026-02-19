import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

export default function Index() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  function handleLoginSuccess(loggedUser) {
    setShowLogin(false)
    // TODO: redirigir al panel de administración cuando esté disponible
    // navigate('/admin')  ← descomentar cuando se integre React Router
    console.log('Login correcto, redirigir a /admin', loggedUser)
  }

  return (
    <>
      {/* Botón de acceso — esquina superior derecha */}
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
        {user ? (
          <>
            <span>{user.id_usuario} ({user.rol})</span>
            {/* TODO: reemplazar por <Link to="/admin"> cuando esté la ruta */}
            <button onClick={() => console.log('Ir a /admin')}>Panel</button>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Acceso administración</button>
        )}
      </div>

      {/* Contenido principal de la landing — desarrollar en esta rama */}
      <main>
        <p>Contenido de la página index.</p>
      </main>

      {/* Modal de login */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}
