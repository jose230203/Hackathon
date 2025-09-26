"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { getTopFiveUsuarioProgreso } from "@/infrastructure/api/userProgressService";

type TopItem = {
  id: string;
  usuarioId: string;
  puntos: number;
  racha: number;
  retosCompletados: number;
};

export default function TopStudentsSection() {
  const [items, setItems] = useState<TopItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const top = await getTopFiveUsuarioProgreso();
        if (!mounted) return;
        setItems(top);
      } catch (e) {
        const err = e as Error;
        setError(err.message || "No se pudo cargar el top 5");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-[#0B1739] rounded-lg p-6 shadow-lg border border-[#1A0B2E]">
      <h2 className="text-3xl text-center font-bold mb-6 text-white text-shadow-custom">Top de estudiantes</h2>
      {loading && <p className="text-gray-300 text-center">Cargando top 5…</p>}
      {error && (
        <p className="text-red-300 text-center text-sm bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
          {error}
        </p>
      )}
      {!loading && !error && (
        <div className="space-y-3">
          {items?.slice(0, 5).map((it, idx) => {
            const rank = idx + 1;
            const label = `Usuario ${it.usuarioId?.slice(0, 6) ?? ""}`;
            const avatar = "/itachi.png"; // Placeholder si no hay avatar en la API
            return (
              <div
                key={it.id || `${it.usuarioId}-${idx}`}
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(62, 102, 143, 0.4) 0%, rgba(42, 69, 100, 0.4) 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold w-6 text-center">
                    {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
                  </span>
                  <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm text-gray-200 leading-tight">{label}</p>
                    <p className="text-xs text-gray-400">Racha: {it.racha} • Retos: {it.retosCompletados}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#A855F7]">{it.puntos} pts</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}