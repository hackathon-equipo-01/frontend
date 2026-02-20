import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';
import GameScreen from './components/GameScreen.jsx';
import Home from './Home.jsx';
import Metricas from './components/metricas.jsx';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Navbar /> 
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juego" element={<GameScreen />} />
            <Route path="/Metricas" element={<Metricas />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}