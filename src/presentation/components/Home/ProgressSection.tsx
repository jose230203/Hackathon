"use client";
import React, { useEffect, useState } from "react";
import { getUsuarioProgreso } from "@/infrastructure/api/userProgressService";

export default function ProgressSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [retos, setRetos] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const up = await getUsuarioProgreso();
        if (!mounted) return;
        setPuntos(up.puntos ?? 0);
        setRacha(up.racha ?? 0);
        setRetos(up.retosCompletados ?? 0);
      } catch (e) {
        const err = e as Error;
        setError(err.message || "No se pudo cargar el progreso");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const porcentaje = Math.min(100, Math.round((retos / 30) * 100)) || 0; // heurística

  return (
    <div className="bg-[#0B1739] rounded-2xl p-6 shadow-lg border border-[#1A0B2E]">
      <h2 className="text-xl font-bold mb-4 text-[#FFFFFF]">Progreso actual</h2>
      {loading && <p className="text-gray-300">Cargando progreso…</p>}
      {error && (
        <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
          {error}
        </p>
      )}
      {!loading && (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Progreso CTF</h3>
            <h3 className="text-lg font-bold text-[#A855F7]">{porcentaje}%</h3>
          </div>
          <div className="w-full bg-[#1A0B2E] rounded-full h-4 mb-4">
            <div className="bg-[#A855F7] h-4 rounded-full" style={{ width: `${porcentaje}%` }}></div>
          </div>
          <h3 className="text-lg font-bold text-[#5B79A5] mb-4">Siguiente nivel {Math.min(100, porcentaje + 10)}%</h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-[#FFFFFF]">Retos:</p>
            <span className="text-2xl font-bold text-[#A855F7]">{retos}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-[#FFFFFF]">Puntos:</p>
            <span className="text-2xl font-bold text-[#A855F7]">{puntos}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg text-[#FFFFFF]">Racha:</p>
            <span className="text-2xl font-bold text-[#A855F7]">{racha} días</span>
          </div>
        </>
      )}
    </div>
  );
}