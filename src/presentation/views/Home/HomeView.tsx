"use client";

import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import React, { useState } from "react";
import { Academia } from "@/domain/entities/Academia";
import { Curso } from "@/domain/entities/Curso";
import { TipoAcademia, Dificultad } from "@/domain/entities/Academia";
import ProgressSection from "@/presentation/components/Home/ProgressSection";
import TopStudentsSection from "@/presentation/components/Home/TopStudentsSection";
import AcademiesSection from "@/presentation/components/Home/AcademiesSection";
import ChatbotModal from "@/presentation/components/Home/ChatbotModal";

export default function HomeView() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const usuario = {
    id: "123",
    nombre: "Carlos Espinoza",
    correo: "carlos.espinoza@example.com",
    avatar: "/itachi.png",
    contrasena: "password123",
    estado: true,
    fechaRegistro: new Date(),
  };

  const academias: Academia[] = [
    {
      id: "1",
      nombre: "Academia de Ciberseguridad",
      descripcion: "Aprende sobre ciberseguridad y hacking ético.",
      avatar: "/AcademiaProgramacion.svg",
      tipoAcademia: TipoAcademia.Academia,
      dificultad: Dificultad.Intermedio,
      estado: true,
      fechaRegistro: new Date(),
    },
    {
      id: "2",
      nombre: "Academia de Programación",
      descripcion: "Domina los fundamentos de la programación.",
      avatar: "/AcademiaCyberSeguridad.svg",
      tipoAcademia: TipoAcademia.Academia,
      dificultad: Dificultad.Novato,
      estado: true,
      fechaRegistro: new Date(),
    },
    {
      id: "3",
      nombre: "Academia de Ciberseguridad",
      descripcion: "Domina los fundamentos de la programación.",
      avatar: "/AcademiaCyberSeguridad2.svg",
      tipoAcademia: TipoAcademia.Academia,
      dificultad: Dificultad.Novato,
      estado: true,
      fechaRegistro: new Date(),
    },
  ];

  const cursos: Curso[] = [
    {
      id: "1",
      nombre: "Introducción a MCP",
      descripcion: "Curso introductorio sobre MCP.",
      avatar: "/CursoImagen.png",
      videoUrl: "https://example.com/intro-mcp",
      academiaId: "1",
      dificultad: "Intermedio",
      estado: true,
      fechaRegistro: new Date(),
    },
    {
      id: "2",
      nombre: "Curso de hacking ético",
      descripcion: "Aprende las bases del hacking ético.",
      avatar: "/CursoImagen2.png",
      videoUrl: "https://example.com/hacking-etico",
      academiaId: "1",
      dificultad: "Avanzado",
      estado: true,
      fechaRegistro: new Date(),
    },
    {
      id: "3",
      nombre: "Curso de Introducción a Growth",
      descripcion: "Descubre estrategias de crecimiento.",
      avatar: "/CursoImagen3.png",
      videoUrl: "https://example.com/intro-growth",
      academiaId: "2",
      dificultad: "Novato",
      estado: true,
      fechaRegistro: new Date(),
    },
    {
      id: "4",
      nombre: "Cursos profesionales con n8n",
      descripcion: "En este curso aprenderás a construir automatizaciones profesionales en n8n.",
      avatar: "/TestImage.png",
      videoUrl: "https://example.com/intro-mcp",
      academiaId: "1",
      dificultad: "Intermedio",
      estado: false,
      fechaRegistro: new Date(),
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
      <NavBarLogued usuario={usuario} />

      {/* Contenido principal */}
      <div className="grid grid-cols-12 gap-4  py-4">
        {/* Columna izquierda: Progreso actual y Top de estudiantes */}
        <div className="col-span-3 space-y-4">
          {/* Progreso actual */}
          <ProgressSection />

          {/* Top de estudiantes */}
          <TopStudentsSection usuario={usuario} />
        </div>

        {/* Columna derecha: Cursos activos, Academias y Otros cursos */}
        <div className="col-span-9 space-y-4">
          {/* Cursos activos */}
          <div className="grid grid-cols-3 gap-4 rounded-2xl">
            {/* Saludo */}
            <div className="col-span-12  mb-8">
              <h2 className="text-3xl font-bold text-white">
                Buenos días, {usuario.nombre}
              </h2>
            </div>
            {cursos
              .filter((curso) => curso.estado)
              .map((curso) => (
                <div
                  key={curso.id}
                  className="bg-gradient-to-r from-[#312E81]/30 to-[#581C87]/40 rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition overflow-hidden"
                >
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
                </div>
              ))}
          </div>
          <div className="col-span-12  mb-8">
            <h2 className="text-3xl font-bold text-gray-400">
              Nuestras Academias
            </h2>
          </div>

          {/* Academias */}
          <AcademiesSection academias={academias} />

          {/* Otros cursos */}
          <div className="grid grid-cols-3 gap-4">
            {cursos
              .filter((curso) => !curso.estado)
              .map((curso) => (
                <div
                  key={curso.id}
                  className="bg-[#1A0B2E] rounded-lg shadow-lg cursor-pointer hover:bg-[#2D1B69] transition overflow-hidden"
                >
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
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal del chatbot */}
      {isChatbotOpen && <ChatbotModal isOpen={isChatbotOpen} />}

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