import React, { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DroppableZone } from './DroppableZone';
import { DraggableItem } from './DraggableItem';

const WASTE_TYPES = [
  { id: 'papel', label: 'PAPEL', icon: '📄', color: 'bg-blue-400', textColor: 'text-blue-600', lightColor: 'bg-blue-100' },
  { id: 'plastico', label: 'PLÁSTICO', icon: '💧', color: 'bg-yellow-400', textColor: 'text-yellow-600', lightColor: 'bg-yellow-100' },
  { id: 'vidrio', label: 'VIDRIO', icon: '🍷', color: 'bg-green-400', textColor: 'text-green-600', lightColor: 'bg-green-100' },
];

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(WASTE_TYPES[0]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over && over.id === 'monster-droppable') {
      if (active.data.current.type === target.id) {
        setScore(score + 10);
        const next = WASTE_TYPES[Math.floor(Math.random() * WASTE_TYPES.length)];
        setTarget(next);
      } else {
        alert("¡Cuidado! Eso no va ahí.");
      }
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-[#FFFBEB] p-6 flex flex-col items-center">
        {/* Marcador */}
        <div className="w-full max-w-sm flex justify-between items-center mb-10">
          <div className="bg-white px-6 py-2 rounded-full shadow-md border-2 border-yellow-200">
            <span className="font-black text-gray-700 text-lg">⭐ {score}</span>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
        </div>

        {/* Monstruo */}
        <DroppableZone>
          <div className={`w-56 h-60 ${target.color} rounded-[60px] flex flex-col items-center justify-center shadow-2xl border-b-[12px] border-black/20 transition-colors duration-500`}>
            <div className="flex gap-8 mb-6">
              <div className="w-6 h-6 bg-black rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-black rounded-full border-2 border-white"></div>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-2xl border-2 border-dashed border-white/40">
              <p className="text-white font-black text-xs text-center">DAME {target.label}</p>
            </div>
          </div>
        </DroppableZone>

        {/* Galería inferior */}
        <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-md">
          {WASTE_TYPES.map((w) => (
            <DraggableItem key={w.id} {...w} color={w.lightColor} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}