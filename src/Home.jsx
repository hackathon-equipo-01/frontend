import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import bg from "./images/image.png";
import btnMetricas from "./images/image5.png";
import btnContenedores from "./images/image4.png";


export default function Home() {
    const buttonBase =
        "shrink-0 block rounded-2xl hover:scale-105 active:scale-95 transition-transform duration-150";

    const buttonStyle = (img) => ({
        backgroundImage: `url(${img})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    });

    const BTN_W = 620;
    const BTN_H = 250;
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef(null);
    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);


    useEffect(() => {
        if (!isLoginOpen) return;

        setTimeout(() => emailRef.current?.focus(), 0);

        const onKeyDown = (e) => {
            if (e.key === "Escape") closeLogin();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isLoginOpen]);

    const handleEnter = (e) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        closeLogin();
    };

return (
     <div
      className="min-h-screen w-full flex flex-col items-center justify-start pt-6 sm:pt-8"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
    <div className="flex gap-6 px-4 w-full justify-center overflow-x-auto whitespace-nowrap pb-2">

        <Link
          to="/juego"
            className={buttonBase}
            style={{ ...buttonStyle(btnContenedores), width: BTN_W, height: BTN_H }}
            aria-label="Contenedores"
            title="Contenedores"
                >
            <span className="sr-only">Contenedores</span>
                </Link>
                <Link
                    to="/Metricas"
                    className={buttonBase}
                    style={{ ...buttonStyle(btnMetricas), width: BTN_W, height: BTN_H }}
                    aria-label="Panel de métricas"
                    title="Panel de métricas"
                >
                    <span className="sr-only">Panel de métricas</span>
                </Link>
            </div>
            <div className="mt-4 mb-10 px-10 py-6 rounded-2xl bg-white/45 backdrop-blur-md border border-white/60 shadow-lg">
                <h1 className="text-8xl lg:text-9xl font-black text-green-800 uppercase tracking-tighter leading-none drop-shadow-sm">
                    GREEN LAB
                </h1>
            </div>
            <button
                type="button"
                onClick={openLogin}
                className="px-10 py-5 bg-green-600 text-white rounded-full font-bold shadow-xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95 text-xl border-b-4 border-green-900"
            >
                ¡Log in !
            </button>
            {isLoginOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeLogin}
                    />
            <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Login"
                        className="relative w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-2xl p-6"
                    >
                        <button
                            type="button"
                            onClick={closeLogin}
                            className="absolute top-3 right-3 rounded-full px-3 py-1 text-gray-700 hover:bg-black/10"
                            aria-label="Cerrar"
                            title="Cerrar"
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-black text-green-800 uppercase tracking-tight mb-6">
                            Log in
                        </h2>

                        <form onSubmit={handleEnter} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">
                                    Correo electrónico
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ej: correo@ejemplo.com"
                                    className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 outline-none focus:ring-4 focus:ring-green-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 outline-none focus:ring-4 focus:ring-green-300"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 px-6 py-3 rounded-xl bg-green-600 text-white font-extrabold shadow-lg hover:bg-green-700 active:scale-[0.99] transition"
                            >
                                Enter
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
