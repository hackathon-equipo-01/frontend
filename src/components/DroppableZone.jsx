import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function DroppableZone({ children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'monster-droppable',
  });

  const style = {
    transform: isOver ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.3s ease',
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {children}
      {isOver && (
        <div className="absolute inset-0 bg-white/30 rounded-[60px] blur-xl animate-pulse" />
      )}
    </div>
  );
}