import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    console.log("Datos del usuario en el Navbar:", user);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-black text-green-700 tracking-tighter">
                GREEN LAB ♻️
            </Link>
            
            <div className="flex items-center gap-6 font-bold text-gray-600">
                <Link to="/juego" className="hover:text-green-600 transition-colors">Juego</Link>
                
                
                {(user?.rol === 'teacher' || user?.rol === 'admin') && (
                    <>
                        <Link to="/metricas" className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all shadow-sm">
                            📊 Métricas
                        </Link>
                    </>
                )}

                {user ? (
                    <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                            {user.name || user.nombre} 
                        </span>
                        <button 
                            onClick={handleLogout}
                            className="text-sm text-red-500 hover:text-red-700 transition-colors font-bold"
                        >
                            Salir
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="text-sm font-bold text-green-600 hover:text-green-800">
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </nav>
    );
}

