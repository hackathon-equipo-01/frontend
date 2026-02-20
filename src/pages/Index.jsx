import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from '../components/LoginModal'

export default function Index() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  function handleLoginSuccess(loggedUser) {
    setShowLogin(false)
    console.log('Login correcto, redirigir a /admin', loggedUser)
  }

  return (
    <>
     
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>
        {user ? (
          <>
            <span>{user.id_usuario} ({user.rol})</span>
            <button onClick={() => console.log('Ir a /admin')}>Panel</button>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Acceso administración</button>
        )}
      </div>

      <main>
        <p>Contenido de la página index.</p>
      </main>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}
