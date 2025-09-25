"use client";

import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import React, { useEffect, useState } from "react";
import { Academia } from "@/domain/entities/Academia";
import { Curso } from "@/domain/entities/Curso";
import { TipoAcademia, Dificultad } from "@/domain/entities/Academia";
import ProgressSection from "@/presentation/components/Home/ProgressSection";
import TopStudentsSection from "@/presentation/components/Home/TopStudentsSection";
import AcademiesSection from "@/presentation/components/Home/AcademiesSection";
import ChatbotModal from "@/presentation/components/Home/ChatbotModal";
import { getListAcademy, getListLastCursos } from "@/infrastructure/api/academyService";
import Link from "next/link";
import { useAuth } from "@/presentation/hooks/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();


  const [academias, setAcademias] = useState<Academia[] | null>(null);
  const [cursos, setCursos] = useState<Curso[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [acs, last] = await Promise.all([
          getListAcademy(),
          getListLastCursos(),
        ]);
        if (!mounted) return;
        setAcademias(acs);
        setCursos(last);
      } catch (e: any) {
        setError(e?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Guard de autenticación: espera a que AuthContext termine de cargar antes de decidir
  useEffect(() => {
    if (authLoading) return; // aún cargando perfil/token
    if (!user) {
      router.replace("/Onboarding/login?next=/home");
    }
  }, [user, authLoading, router]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
  <NavBarLogued />

      {/* Contenido principal */}
      <div className="grid grid-cols-12 gap-4  py-4">
        {/* Columna izquierda: Progreso actual y Top de estudiantes */}
        <div className="col-span-3 space-y-4">
          {/* Progreso actual */}
          <ProgressSection />

          {/* Top de estudiantes */}
          <TopStudentsSection />
        </div>

        {/* Columna derecha: Cursos activos, Academias y Otros cursos */}
        <div className="col-span-9 space-y-4">
          {/* Cursos activos */}
          <div className="grid grid-cols-3 gap-4 rounded-2xl">
            {/* Saludo */}
            <div className="col-span-12  mb-8">
              <h2 className="text-3xl font-bold text-white">
                Buenos días, {user?.nombre || "Usuario"}
              </h2>
            </div>
            {cursos
              ?.filter((curso) => curso.estado)
              .map((curso) => (
                <Link href={`/curso/${curso.id}`} key={curso.id} className="bg-gradient-to-r from-[#312E81]/30 to-[#581C87]/40 rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition overflow-hidden block">
                  <img
                    src={curso.avatar}
                    alt={curso.nombre}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white">
                      {curso.nombre}
                    </h3>
                    <p className="text-sm text-gray-400">Clase 1 de 21</p>
                  </div>
                </Link>
              ))}
          </div>
          <div className="col-span-12  mb-8">
            <h2 className="text-3xl font-bold text-gray-400">
              Nuestras Academias
            </h2>
          </div>

          {/* Academias */}
          {loading && <p className="text-gray-300">Cargando academias…</p>}
          {error && <p className="text-red-400">{error}</p>}
          {academias && <AcademiesSection academias={academias} />}

          {/* Otros cursos */}
          <div className="grid grid-cols-3 gap-4">
            {cursos
              ?.filter((curso) => !curso.estado)
              .map((curso) => (
                <Link href={`/curso/${curso.id}`} key={curso.id} className="bg-[#1A0B2E] rounded-lg shadow-lg cursor-pointer hover:bg-[#2D1B69] transition overflow-hidden block">
                  <img
                    src={curso.avatar}
                    alt={curso.nombre}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white">
                      {curso.nombre}
                    </h3>
                    <p className="text-sm text-gray-400">Clase 1 de 21</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

  {/* Modal del chatbot (siempre montado para conservar estado) */}
  <ChatbotModal isOpen={isChatbotOpen} />

      {/* Botón para abrir el chatbot */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-4 right-4 bg-[#0B1739] p-4 rounded-full shadow-lg hover:opacity-90"
      >
        <img src="/AI.png" alt="Chat" className="w-6 h-6" />
      </button>
    </section>
  );
}