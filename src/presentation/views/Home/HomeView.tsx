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
  const { user, loading: authLoading, error: authError, refreshProfile } = useAuth();
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
      } catch (e) {
        const err = e as Error;
        setError(err.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Guard de autenticación: espera a que AuthContext termine de cargar antes de decidir
  // Evitar "rebote" al login justo después de iniciar sesión
  const [justNavigatedFromLogin, setJustNavigatedFromLogin] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ref = document.referrer || '';
      const flag = sessionStorage.getItem('auth:justLoggedIn');
      if (ref.includes('/Onboarding/login') || flag === '1') setJustNavigatedFromLogin(true);
      // dejar el flag más tiempo para evitar rebotes en redes lentas
      const t = setTimeout(() => {
        setJustNavigatedFromLogin(false);
        try { sessionStorage.removeItem('auth:justLoggedIn'); } catch {}
      }, 10000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return; // aún cargando perfil/token
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || sessionStorage.getItem('token')) : null;
    // Redirigir si definitivamente no hay token
    if (!token) {
      router.replace("/Onboarding/login?next=/home");
      return;
    }
    // Si venimos del login y aún no hay user, forzar refresh una vez
    if (justNavigatedFromLogin && !user) {
      refreshProfile().catch(() => {});
    }
    // Si ya resolvimos el usuario, limpiar bandera
    if (user && justNavigatedFromLogin) {
      setJustNavigatedFromLogin(false);
      try { sessionStorage.removeItem('auth:justLoggedIn'); } catch {}
    }
    // No redirigir basados en authError inmediatamente; confiar en la presencia del token para dejar cargar.
  }, [authLoading, user, router, justNavigatedFromLogin, refreshProfile]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
  <NavBarLogued />

      {/* Contenido principal */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 px-4 sm:px-6">
        {/* Columna izquierda: Progreso actual y Top de estudiantes */}
  <div className="col-span-12 lg:col-span-3 space-y-4">
          {/* Progreso actual */}
          <ProgressSection />

          {/* Top de estudiantes */}
          <TopStudentsSection />
        </div>

        {/* Columna derecha: Cursos activos, Academias y Otros cursos */}
  <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Cursos activos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rounded-2xl items-stretch">
            {/* Saludo */}
            <div className="col-span-12  mb-8">
              <h2 className="text-3xl font-bold text-white">
                Buenos días, {user?.nombre || "Usuario"}
              </h2>
            </div>
            {cursos
              ?.filter((curso) => curso.estado)
              .map((curso) => (
                <Link href={`/curso/${curso.id}`} key={curso.id} className="bg-gradient-to-r from-[#312E81]/30 to-[#581C87]/40 rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition overflow-hidden h-full flex flex-col min-h-[300px]">
                  <img
                    src={curso.avatar || "/Hazagey.jpg"}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
            {cursos
              ?.filter((curso) => !curso.estado)
              .map((curso) => (
                <Link href={`/curso/${curso.id}`} key={curso.id} className="bg-[#1A0B2E] rounded-lg shadow-lg cursor-pointer hover:bg-[#2D1B69] transition overflow-hidden h-full flex flex-col min-h-[300px]">
                  <img
                    src={curso.avatar || "/Hazagey.jpg"}
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