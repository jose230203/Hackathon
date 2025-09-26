"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import { Academia } from "@/domain/entities/Academia";
import { Curso } from "@/domain/entities/Curso";
import { getAcademyByAcademiaId, getListCursoByAcademiaId } from "@/infrastructure/api/academyService";
import Link from "next/link";

export default function AcademiaDetailView({ academiaId }: { academiaId: string }) {
  const [academia, setAcademia] = useState<Academia | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Error al cargar la academia");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [academiaId]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-l from-[#2D1B69] via-[#1A0B2E] to-[#0F0B1A] text-white">
      <NavBarLogued />
      <div className="grid grid-cols-12 gap-4 mx-1">
        <div className="col-span-12">
          {loading && <div className="rounded-xl bg-[#3d2177] p-6 mb-6">Cargando…</div>}
          {error && <div className="rounded-xl bg-red-900/30 border border-red-500/30 p-4 mb-6 text-red-200">{error}</div>}
          {academia && (
            <section className="rounded-xl bg-[#3d2177] p-6 mb-6">
              <div className="flex items-center gap-4">
                <img src={academia.avatar || "/Hazagey.jpg"} alt={academia.nombre} className="w-16 h-16 object-contain" />
                <div>
                  <h2 className="text-3xl font-bold mb-1">{academia.nombre}</h2>
                  <p className="text-white/80 text-sm">{academia.descripcion || "Cursos de esta academia"}</p>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="col-span-12">
          <h2 className="text-2xl font-bold mb-4">Cursos de la academia</h2>
          {cursos.length === 0 && !loading && !error && (
            <p className="text-gray-300">No hay cursos disponibles.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cursos.map((curso) => (
              <Link
                key={curso.id}
                href={`/curso/${curso.id}`}
                className="rounded-xl p-4 flex flex-col gap-2 shadow-md bg-gradient-to-br from-[#581C87]/40 to-[#312E81]/30 hover:opacity-90 transition"
              >
                <img src={curso.avatar || "/Hazagey.jpg"} alt={curso.nombre} className="rounded-lg w-full h-32 object-cover mb-2" />
                <h3 className="text-lg font-semibold">{curso.nombre}</h3>
                <span className="text-white/70 text-sm">{curso.descripcion || "Clase 1 de 21"}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
