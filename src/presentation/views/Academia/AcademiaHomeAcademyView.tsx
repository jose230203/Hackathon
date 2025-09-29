"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import { Academia } from "@/domain/entities/Academia";
import { Curso } from "@/domain/entities/Curso";
import { getAcademyByAcademiaId, getListCursoByAcademiaId, getListSesionCursoByCursoId } from "@/infrastructure/api/academyService";
import Link from "next/link";
import ChatbotModal from "@/presentation/components/Home/ChatbotModal";

export default function AcademiaHomeAcademyView({ academiaId }: { academiaId: string }) {
  const [academia, setAcademia] = useState<Academia | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [clasesPorCurso, setClasesPorCurso] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [a, cs] = await Promise.all([
          getAcademyByAcademiaId(academiaId),
          getListCursoByAcademiaId(academiaId),
        ]);
        if (!mounted) return;
        setAcademia(a);
        setCursos(cs);

        // Obtener cantidad de sesiones por curso en paralelo
        const counts = await Promise.all(
          cs.map(async (c) => {
            try {
              const sesiones = await getListSesionCursoByCursoId(c.id);
              return [c.id, sesiones.length] as const;
            } catch {
              return [c.id, 0] as const;
            }
          })
        );
        if (!mounted) return;
        setClasesPorCurso(Object.fromEntries(counts));
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Error al cargar la academia");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [academiaId]);

  const header = useMemo(() => (
    <section className="rounded-xl bg-[#3d2177] p-6 mb-6 mt-6">
      <div className="flex items-center gap-4">
        <img src={academia?.avatar || "/Hazagey.jpg"} alt={academia?.nombre || "Academia"} className="w-16 h-16 object-contain" />
        <div>
          <h2 className="text-3xl font-bold mb-1">{academia?.nombre || "Academia"}</h2>
          <p className="text-white/80 text-sm">{academia?.descripcion || "Explora los cursos disponibles"}</p>
        </div>
      </div>
    </section>
  ), [academia]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-l from-[#2D1B69] via-[#1A0B2E] to-[#0F0B1A] text-white">
      <NavBarLogued />
      <div className="grid grid-cols-12 gap-4 mx-1">
        <div className="col-span-12">
          {loading && <div className="rounded-xl bg-[#3d2177] p-6 mb-6">Cargando…</div>}
          {error && <div className="rounded-xl bg-red-900/30 border border-red-500/30 p-4 mb-6 text-red-200">{error}</div>}
          {!loading && !error && header}
        </div>

        <div className="col-span-12">
          <h2 className="text-2xl font-bold mb-4">Los cursos de la academia</h2>
          {cursos.length === 0 && !loading && !error && (
            <p className="text-gray-300">No hay cursos disponibles.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {cursos.map((curso) => (
              <Link
                key={curso.id}
                href={`/curso/${curso.id}`}
                className="rounded-xl p-4 flex flex-col gap-2 shadow-md bg-gradient-to-br from-[#581C87]/40 to-[#312E81]/30 hover:opacity-90 transition h-full min-h-[300px]"
              >
                <img src={curso.avatar || "/Hazagey.jpg"} alt={curso.nombre} className="rounded-lg w-full h-32 object-cover mb-2" />
                <h3 className="text-lg font-semibold">{curso.nombre}</h3>
                <span className="text-white/70 text-sm">
                  {`Clase 1 de ${clasesPorCurso[curso.id] ?? 0}`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modal del chatbot (siempre montado) */}   
      <ChatbotModal isOpen={isChatbotOpen} />
      {/* Botón para abrir/cerrar el chatbot */}
      <button
        onClick={() => setIsChatbotOpen((v) => !v)}
        className="fixed bottom-4 right-4 bg-[#0B1739] p-4 rounded-full shadow-lg hover:opacity-90"
      >
        <img src="/AI.png" alt="Chat" className="w-6 h-6" />
      </button>
    </div>
  );
}
