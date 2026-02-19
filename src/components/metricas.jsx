import React, { useMemo } from "react";
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
} from "recharts";

import bg from "../images/metrics_bg.png";

export default function Metricas() {
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("metrics") || "null");
    } catch {
      return null;
    }
  })();

  const plastico = stored?.plastico ?? 10;
  const organico = stored?.organico ?? 6;
  const papel = stored?.papel ?? 8;
  const comun = stored?.comun ?? 4;

  const total = plastico + organico + papel + comun;

  const pieData = useMemo(
    () => [
      { name: "Plástico", key: "plastico", value: plastico },
      { name: "Orgánico", key: "organico", value: organico },
      { name: "Papel", key: "papel", value: papel },
      { name: "Basura común", key: "comun", value: comun },
    ],
    [plastico, organico, papel, comun]
  );

  const barData = useMemo(
    () => [
      { name: "Plástico", value: plastico },
      { name: "Orgánico", value: organico },
      { name: "Papel", value: papel },
      { name: "Común", value: comun },
    ],
    [plastico, organico, papel, comun]
  );

  const COLORS = {
    plastico: "#00D4FF", 
    organico: "#22C55E", 
    papel: "#FBBF24", 
    comun: "#FF3EA5", 
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 text-slate-100"
      style={{
       
        backgroundImage: `linear-gradient(135deg, rgba(2,6,23,0.92), rgba(15,23,42,0.92), rgba(30,27,75,0.88)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-full max-w-6xl">
      
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Panel de Métricas
            </h1>
            <p className="text-slate-200/90 font-semibold">
              Residuos recogidos por contenedor
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.85)]" />
            <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.85)]" />
            <div className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.85)]" />
            <div className="h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_18px_rgba(244,114,182,0.85)]" />
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
     
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black tracking-tight">
                Resumen general
              </h2>
              <span className="text-xs text-slate-300/90">
                (localStorage: <b>metrics</b>)
              </span>
            </div>

            <div className="h-[320px] rounded-2xl bg-slate-950/40 border border-white/10 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={92}
                    outerRadius={130}
                    paddingAngle={2}
                  >
                    {pieData.map((d) => (
                      <Cell key={d.key} fill={COLORS[d.key]} />
                    ))}

                    <Label content={<CenterLabel total={total} />} position="center" />
                  </Pie>

                  <Tooltip content={<DarkTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

      
            <div className="grid grid-cols-2 gap-3 mt-4">
              <NeonStat label="Plástico" value={plastico} color={COLORS.plastico} />
              <NeonStat label="Orgánico" value={organico} color={COLORS.organico} />
              <NeonStat label="Papel" value={papel} color={COLORS.papel} />
              <NeonStat label="Basura común" value={comun} color={COLORS.comun} />
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black tracking-tight">
                Comparación por contenedor
              </h2>
              <span className="text-sm text-slate-200">
                Total: <b className="text-white">{total}</b>
              </span>
            </div>

            <div className="h-[420px] rounded-2xl bg-slate-950/40 border border-white/10 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={54}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "rgba(226,232,240,0.85)", fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(226,232,240,0.6)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<DarkTooltip />} />

                  <Bar dataKey="value" radius={[14, 14, 6, 6]}>
                    {barData.map((item) => (
                      <Cell
                        key={item.name}
                        fill={
                          item.name === "Plástico"
                            ? COLORS.plastico
                            : item.name === "Orgánico"
                            ? COLORS.organico
                            : item.name === "Papel"
                            ? COLORS.papel
                            : COLORS.comun
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-3 text-sm text-slate-200/90">
              Tip: actualiza <b>localStorage.metrics</b> desde el juego y este panel cambia solo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


function NeonStat({ label, value, color }) {
  return (
    <div className="rounded-2xl bg-slate-950/35 border border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className="h-3.5 w-3.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 18px ${color}aa`,
          }}
        />
        <span className="font-extrabold text-slate-200">{label}</span>
      </div>

      <span className="text-3xl font-black text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}

function CenterLabel({ total }) {
  return ({ viewBox }) => {
    const { cx, cy } = viewBox || {};
    return (
      <g>
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-white"
          style={{ fontSize: 48, fontWeight: 900 }}
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 24}
          textAnchor="middle"
          className="fill-slate-300"
          style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1 }}
        >
          RECOGIDOS
        </text>
      </g>
    );
  };
}

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const name = item?.name || label || "";
  const value = item?.value ?? 0;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/90 px-4 py-3 shadow-2xl">
      <div className="text-slate-200 font-black">{name}</div>
      <div className="text-white font-extrabold text-lg tabular-nums">
        {value}
      </div>
    </div>
  );
}
