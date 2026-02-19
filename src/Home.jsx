import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFBEB]">
      <h1 className="text-5xl font-black text-green-600 mb-8 uppercase tracking-tighter drop-shadow-sm">
        ECO-MONSTRUOS
      </h1>
      
      {/* Botón con estilo mejorado para el briefing */}
      <Link 
        to="/juego" 
        className="px-10 py-5 bg-green-500 text-white rounded-full font-bold shadow-xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95 text-xl border-b-4 border-green-700"
      >
        ¡EMPEZAR A RECICLAR!
      </Link>
      
      <p className="mt-6 text-gray-500 font-medium italic">
        Ayuda a nuestros amigos a clasificar sus residuos
      </p>
    </div>
  );
}