import React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DroppableZone } from './DroppableZone';
import { DraggableItem } from './DraggableItem';

const wasteTypes = [
    { id: 'papel', label: 'PAPEL', icon: '📄', color: 'bg-blue-400', textColor: 'text-blue-600', lightColor: 'bg-blue-100' },
    { id: 'plastico', label: 'PLÁSTICO', icon: '💧', color: 'bg-yellow-400', textColor: 'text-yellow-600', lightColor: 'bg-yellow-100' },
    { id: 'vidrio', label: 'VIDRIO', icon: '🍷', color: 'bg-green-400', textColor: 'text-green-600', lightColor: 'bg-green-100' },
];

const itemsToRecycle = [
    { id: 'item-1', type: 'papel', icon: '📰' },
    { id: 'item-2', type: 'plastico', icon: '🥤' },
    { id: 'item-3', type: 'vidrio', icon: '🍾' },
];

export default function GameScreen() {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    function handleDragEnd(event) {
        const { over, active } = event;

        if (!over) return;
        if (active.data.current.type === over.id) {
        console.log("¡Es mi favorito!");
        } else {
        console.log("¡Odio eso, quiero otra cosa!");
        }
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="min-h-screen bg-[#FFFBEB] p-4 flex flex-col items-center">
            <div className="flex gap-4 mb-20">
                {wasteTypes.map((monster) => (
                    <DroppableZone key={monster.id} id={monster.id}>
                        <div className="relative group">
                            <div className={`w-36 h-36 ${monster.color} rounded-[45px] shadow-lg border-b-8 border-black/15 flex flex-col items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105`}>
                                <div className="flex gap-6 mb-4">
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <div className="w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <div className="w-3 h-3 bg-black rounded-full"></div>
                                    </div>
                                </div>
                                <div className="w-20 h-10 bg-black/10 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center overflow-hidden">
                                    <span className="text-[8px] text-white font-black text-center leading-tight px-1">
                                        {monster.label}
                                    </span>
                                </div>
                                <div className="absolute w-full flex justify-between px-4 top-20">
                                    <div className="w-3 h-1 bg-white/20 rounded-full"></div>
                                    <div className="w-3 h-1 bg-white/20 rounded-full"></div>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 w-full flex justify-around px-8 z-0">
                                <div className={`w-6 h-6 ${monster.color} rounded-lg border-b-4 border-black/10`}></div>
                                <div className={`w-6 h-6 ${monster.color} rounded-lg border-b-4 border-black/10`}></div>
                            </div>
                        </div>
                    </DroppableZone>
                ))}
            </div>

            <div className="flex gap-8 p-6 bg-white/50 rounded-full shadow-inner border-2 border-dashed border-gray-300">
            {itemsToRecycle.map((item) => (
                <DraggableItem 
                key={item.id}
                id={item.id}
                type={item.type}
                icon={item.icon}
                color="bg-white"
                label="" 
                />
            ))}
            </div>
        </div>
        </DndContext>
    );
}