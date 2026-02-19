import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableItem({ id, type, icon, color, label, textColor }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { type: type }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="flex flex-col items-center gap-2 touch-none z-50 cursor-grab active:cursor-grabbing">
            <div className={`${color} w-24 h-24 rounded-[30px] shadow-lg flex items-center justify-center text-4xl border-b-4 border-black/10`}>
                {icon}
            </div>
            <span className={`font-black text-xs ${textColor}`}>{label}</span>
        </div>
    );
}