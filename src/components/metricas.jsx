import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // <--- ESTO FALTABA
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Cell
} from "recharts";

import bg from "../images/metrics_bg.png";

export default function Metricas() {
  const { user } = useAuth(); // <--- Y ESTO TAMBIÉN
  const [stats, setStats] = useState({ Carton: 0, Organico: 0, Plastico: 0, Banal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/discarded-waste");
        const data = res.data;
        
        const counts = {
          Carton: data.filter(d => d.isCorrect && d.residue?.wasteType?.name === 'Carton').length,
          Organico: data.filter(d => d.isCorrect && d.residue?.wasteType?.name === 'Organico').length,
          Plastico: data.filter(d => d.isCorrect && d.residue?.wasteType?.name === 'Plastico').length,
          Banal: data.filter(d => d.isCorrect && d.residue?.wasteType?.name === 'Banal').length,
        };
        
        setStats(counts);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando métricas", error);
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const total = stats.Carton + stats.Organico + stats.Plastico + stats.Banal;

  const COLORS = {
    plastico: "#FBBF24", // Amarillo
    organico: "#22C55E", // Verde
    carton: "#00D4FF",   // Azul
    banal: "#FF3EA5",    // Rosa/Gris
  };

  const pieData = useMemo(() => [
    { name: "Plástico", key: "plastico", value: stats.Plastico },
    { name: "Orgánico", key: "organico", value: stats.Organico },
    { name: "Cartón", key: "carton", value: stats.Carton },
    { name: "Banal", key: "banal", value: stats.Banal },
  ], [stats]);

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black italic">CONECTANDO CON GREEN LAB...</div>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 text-slate-100"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.95)), url(${bg})`,
        backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-5xl font-black tracking-tighter text-white">Panel de Métricas</h1>
          <p className="text-slate-400 font-bold uppercase text-sm tracking-widest">Estadísticas reales del aula</p>
        </div>

        {/* --- TARJETAS KPI (ESTO ARREGLA EL DESPLAZAMIENTO) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Tasa Acierto" value="78%" color="text-green-400" />
          <StatCard label="CO2 Evitado" value={`${(total * 0.45).toFixed(1)}kg`} color="text-sky-400" />
          <StatCard label="Puntos" value={total * 10} color="text-amber-400" />
          <StatCard label="Aula Activa" value={user?.id_classroom || user?.id_aula || "1"} color="text-white" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tarta */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-black mb-6">Impacto por Residuo</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={5}>
                    {pieData.map((d) => <Cell key={d.key} fill={COLORS[d.key]} />)}
                    <Label content={({ viewBox }) => (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} dy="-0.5em" className="fill-white font-black text-3xl">{total}</tspan>
                        <tspan x={viewBox.cx} dy="1.5em" className="fill-slate-400 font-bold text-xs uppercase">Total</tspan>
                      </text>
                    )} position="center" />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Barras */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-black mb-6">Comparativa Global</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {pieData.map((d) => <Cell key={d.key} fill={COLORS[d.key]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponentes auxiliares para limpiar el código principal
function StatCard({ label, value, color }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-sm shadow-xl flex flex-col items-center">
      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</span>
      <span className={`text-4xl font-black ${color}`}>{value}</span>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-950 border border-white/20 p-3 rounded-xl shadow-2xl">
        <p className="text-white font-black">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

