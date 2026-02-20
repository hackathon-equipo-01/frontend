import React, { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DroppableZone } from './DroppableZone';
import { DraggableItem } from './DraggableItem';
import { getAllContainers, processWaste } from '../services/ContainersCall.jsx';
import axios from 'axios';

export default function GameScreen() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [containers, setContainers] = useState([]);
    const [residues, setResidues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState({ msg: '', color: '' });
    const [points, setPoints] = useState(0); 
    const [quantity, setQuantity] = useState(1);
    const [lastActions, setLastActions] = useState([]);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

const getColor = (name = "") => {
    const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (n.includes('papel') || n.includes('carton')) return 'bg-sky-400'; 
    if (n.includes('plastico') || n.includes('enva')) return 'bg-yellow-400';
    if (n.includes('organico')) return 'bg-orange-800'; 
    if (n.includes('vidrio') || n.includes('cristal')) return 'bg-green-600';
    
    return 'bg-slate-400'; 
};

const getIcon = (name = "") => {
    const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (n.includes('papel') || n.includes('carton')) return '📄';
    if (n.includes('plastico') || n.includes('botella')) return '🧴';
    if (n.includes('organico') || n.includes('comida') || n.includes('piel')) return '🍎';
    if (n.includes('vidrio')) return '🍾';
    return '📦'; 
};

    useEffect(() => {
        if (!user) { navigate("/"); return; }
        const loadData = async () => {
            try {
                const [contData, resRes] = await Promise.all([
                    getAllContainers(),
                    axios.get('http://localhost:8080/api/residues')
                ]);
                console.log("Contenedores reales de la BBDD:", contData);
                setContainers(contData);
                setResidues(resRes.data);
                setLoading(false);
            } catch (error) { console.error(error); setLoading(false); }
        };
        loadData();
    }, [user]);

    async function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return;

    const idResidue = active.data.current.residueId;
    const idContainer = over.id;

    console.log("Enviando al Back -> Residuo:", active.data.current.residueId, "Contenedor:", over.id);

    try {

        const data = await processWaste(user?.id_aula || 1, idResidue, idContainer);

        console.log("Respuesta completa del servidor:", data);

        const serverId = data.id;
        const serverPoints = data.pointsEarned ?? data.puntos ?? 0;
        const isCorrect = data.isCorrect;

        if (serverId === undefined) {
            console.error("¡OJO! El servidor no devolvió un ID. El botón de borrar no funcionará.");
        }

        const totalActionPoints = serverPoints * quantity;

        setPoints(prev => prev + totalActionPoints);
        
        setFeedback({ 
            msg: isCorrect ? `¡GENIAL! +${totalActionPoints}` : `¡UPS! ${totalActionPoints}`, 
            color: isCorrect ? "text-green-600" : "text-red-500" 
        });

        setLastActions(prev => [{
            id: serverId, 
            text: `${quantity}x ${active.id}`,
            pts: totalActionPoints
        }, ...prev].slice(0, 5));

        setTimeout(() => setFeedback({ msg: '', color: '' }), 2000);
        setQuantity(1);

    } catch (error) {
        console.error("Error en la petición POST:", error);
    }
}

const undoAction = async (actionId, pts) => {

    if (!actionId) {
        console.error("No se puede borrar: actionId es undefined");
        return;
    }

    try {

        await axios.delete(`http://localhost:8080/api/discarded-waste/${actionId}`);
        
        setPoints(prev => prev - pts);
        setLastActions(prev => prev.filter(a => a.id !== actionId));
    } catch (e) {
        console.error("Error en el DELETE:", e.response?.data || e.message);
    }
};

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-[#FFFBEB] pt-10 p-4 flex flex-col items-center">
                
                {feedback.msg && (
                    <div className="fixed top-24 z-[100] animate-bounce bg-white border-2 px-8 py-3 rounded-full shadow-2xl font-black text-xl">
                        <span className={feedback.color}>{feedback.msg}</span>
                    </div>
                )}

                <div className="w-full max-w-4xl flex justify-between items-center mb-10">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border-b-4 border-green-500">
                        <span className="text-xs font-black text-green-500">PUNTOS</span>
                        <p className="text-4xl font-black">{points}</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow-md border-2 border-dashed border-gray-200">
                        <span className="text-[10px] font-black">CANTIDAD</span>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="text-2xl font-bold px-2">-</button>
                            <span className="text-2xl font-black">{quantity}</span>
                            <button onClick={() => setQuantity(quantity+1)} className="text-2xl font-bold px-2">+</button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mb-16 flex-wrap justify-center">
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
                                    <div className="w-20 h-10 bg-black/10 border-2 border-dashed border-white/40 rounded-full flex items-center justify-center">
                                        <span className="text-[8px] text-white font-black uppercase text-center">{monster.name}</span>
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

                <div className="flex gap-4 p-6 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300 overflow-x-auto max-w-full">
                    {residues.map((item) => (
                        <div key={item.id} className="flex flex-col items-center min-w-[80px]">
                            <DraggableItem 
                                id={item.name} 
                                residueId={item.id} 
                                icon={getIcon(item.name)} 
                                color="bg-white" 
                            />
                            <span className="text-[10px] font-black mt-2 text-gray-500 uppercase text-center">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 w-full max-w-md">
                    {lastActions.map(action => (
                        <div key={action.id} className="flex justify-between items-center bg-white p-3 rounded-xl mb-2 shadow-sm border-l-4 border-gray-300">
                            <span className="text-sm font-bold">{action.text} ({action.pts} pts)</span>
                            <button onClick={() => undoAction(action.id, action.pts)} className="text-red-500 font-black text-2xl px-2">×</button>
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    );
}
