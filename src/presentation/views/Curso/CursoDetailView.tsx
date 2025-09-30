"use client";
import React, { useEffect, useState } from "react";
import NavBarLogued from "../../components/Home/NavBarLogued";
import CourseDetailHeader from "../../components/Curso/CourseDetailHeader";
import CourseClassList from "../../components/Curso/CourseClassList";
import CourseCertificate from "../../components/Curso/CourseCertificate";
import CourseActions from "../../components/Curso/CourseActions";
import ChatbotPanel from "../../components/Home/ChatbotPanel";
import ProgressCard from "../../components/Academia/ProgressCard";
import { getCursoByCursoId, getListSesionCursoByCursoId } from "@/infrastructure/api/academyService";
import { useParams } from "next/navigation";

const CursoDetailView: React.FC = () => {
  const params = useParams<{ id: string }>();
  const cursoId = params?.id as string;
  const [header, setHeader] = useState<{ titulo: string; nivel: string; clases: number; horasContenido: number; horasPractica: number; descripcion: string } | null>(null);
  type SesionLite = { id?: string; titulo: string; duracion: string; imgSrc: string };
  const [sesiones, setSesiones] = useState<SesionLite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cursoId) return;
    let mounted = true;
    (async () => {
      try {
        const [curso, ses] = await Promise.all([
          getCursoByCursoId(cursoId),
          getListSesionCursoByCursoId(cursoId),
        ]);
        if (!mounted) return;
        setHeader({
          titulo: curso.nombre,
          nivel: `Nivel ${String(curso.dificultad ?? '').toLowerCase()}`,
          clases: ses.length,
          horasContenido: 0,
          horasPractica: 0,
          descripcion: curso.descripcion ?? "",
        });
        setSesiones(ses.map(s => ({ id: s.id, titulo: s.nombre, duracion: "--", imgSrc: s.avatar || "/Academia.png" })));
      } catch (e) {
        const err = e as Error;
        setError(err.message || 'Error al cargar curso');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [cursoId]);

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#2D1B69] via-[#1A0B2E] to-[#0F0B1A]">
      <NavBarLogued />
      <div className="max-w-screen mx-10 grid grid-cols-12 gap-4 pt-4">
        <div className="grid grid-cols-12 col-start-1 col-end-9"> 
          <div className="col-span-12">
            {loading && <p className="text-gray-300">Cargando curso…</p>}
            {error && <p className="text-red-400">{error}</p>}
            {header && (
              <CourseDetailHeader
                titulo={header.titulo}
                nivel={header.nivel}
                clases={header.clases}
                horasContenido={header.horasContenido}
                horasPractica={header.horasPractica}
                descripcion={header.descripcion}
              />
            )}
          </div>

          <div className="col-span-12 row-start-2">
            <h3 className="text-xl font-bold text-white mb-2 mt-6">Clases del curso</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sesiones && (
                <>
                  <CourseClassList cursoId={cursoId} clases={sesiones.slice(0, Math.ceil(sesiones.length / 2))} />
                  <CourseClassList cursoId={cursoId} clases={sesiones.slice(Math.ceil(sesiones.length / 2))} />
                </>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              <CourseCertificate cursoId={cursoId} />
              <CourseActions />
            </div>
          </div>
        </div>

        <div className="col-start-10 col-end-14 row-start-1">
          <div className="mb-4">
            <ProgressCard />
          </div>
          <div className="sticky top-24">
            <ChatbotPanel botName="SuidBot" cursoId={cursoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursoDetailView;
