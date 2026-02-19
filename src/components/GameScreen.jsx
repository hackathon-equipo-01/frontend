import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DroppableZone } from './DroppableZone';
import { DraggableItem } from './DraggableItem';

import { getAllContainers, processWaste } from '../services/ContainersCall.jsx';

const itemsToRecycle = [
    { id: 'item-1', label: 'Hoja de papel', icon: '📄', residueId: 1, type: 'Papel' }, 
    { id: 'item-2', label: 'Botella Agua', icon: '💧', residueId: 3, type: 'Plástico' },
    { id: 'item-3', label: 'Piel Plátano', icon: '🍌', residueId: 5, type: 'Orgánico' },
    { id: 'item-4', label: 'Yogur', icon: '🍦', residueId: 7, type: 'Plástico' },
];

export default function GameScreen() {

    const [containers, setContainers] = useState([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAllContainers();
                setContainers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando contenedores:", error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

async function handleDragEnd(event) {
    const { over, active } = event;

    if (!over) return;

    // Estos IDs ahora vienen de tu base de datos
    const idResidue = active.data.current.residueId; // El ID de la tabla 'residues'
    const idContainer = over.id; // El ID de la tabla 'waste_types' (el monstruo)
    const idClassroom = 1; // Un valor por defecto para tu lógica de aula

    try {
        // Llamada al servicio que conecta con Axios
        const response = await processWaste(idClassroom, idResidue, idContainer);
        
        if (response.isCorrect) {
            console.log("¡Genial! El backend ha guardado el acierto.");
            // Aquí podrías añadir una animación de éxito
        } else {
            console.log("¡Ups! El backend dice que no va en ese contenedor.");
        }
    } catch (error) {
        console.error("Error al guardar en la base de datos:", error);
    }
}

    const getColor = (name) => {
        const n = name.toLowerCase();
        if (n.includes('cartón')) return 'bg-blue-400';
        if (n.includes('plástico')) return 'bg-yellow-400';
        if (n.includes('vidrio')) return 'bg-green-400';
        return 'bg-gray-400';
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando monstruos...</div>;

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-[#FFFBEB] p-4 flex flex-col items-center">
                <div className="flex gap-4 mb-20">
                    {containers.map((monster) => (
                        <DroppableZone key={monster.id} id={monster.id}>
                            <div className="relative group">
                                <div className={`w-36 h-36 ${getColor(monster.name)} rounded-[45px] shadow-lg border-b-8 border-black/15 flex flex-col items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-105`}>
                                    <div className="flex gap-6 mb-4">
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <div className="w-3 h-3 bg-black rounded-full"></div>
                                        </div>
                                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <div className="w-3 h-3 bg-black rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="w-20 h-10 bg-black/10 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center overflow-hidden">
                                        <span className="text-[8px] text-white font-black text-center leading-tight px-1 uppercase">
                                            {monster.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 w-full flex justify-around px-8 z-0">
                                    <div className={`w-6 h-6 ${getColor(monster.name)} rounded-lg border-b-4 border-black/10`}></div>
                                    <div className={`w-6 h-6 ${getColor(monster.name)} rounded-lg border-b-4 border-black/10`}></div>
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
                            residueId={item.residueId}
                            color="bg-white"
                            label="" 
                        />
                    ))}
                </div>
            </div>
        </DndContext>
    );
}