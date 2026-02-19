import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import './index.css';
import GameScreen from './components/GameScreen.jsx';
import Home from './Home.jsx';

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