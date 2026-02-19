import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-black text-green-600 mb-8">ECO-MONSTRUOS</h1>
      <Link 
        to="/juego" 
        className="px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition-transform hover:scale-105"
      >
        ¡EMPEZAR A RECICLAR!
      </Link>
    </div>
  );
}