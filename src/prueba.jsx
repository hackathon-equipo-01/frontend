import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import GameScreen from './components/GameScreen.jsx';


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

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego" element={<GameScreen />} />
        </Routes>
    </BrowserRouter>
  );
}