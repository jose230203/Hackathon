"use client";

import FeaturedSection from "@/presentation/components/Home/FeaturedSection";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import React, { useState } from "react";
import { Academia } from "@/domain/entities/Academia";
import { Curso } from "@/domain/entities/Curso";
import { TipoAcademia, Dificultad } from "@/domain/entities/Academia";

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
      <div className="grid grid-cols-12 gap-4 px-8 py-4">
        {/* Columna izquierda: Progreso actual y Top de estudiantes */}
        <div className="col-span-4 space-y-4">
          {/* Progreso actual */}
          <div className="bg-[#1E1536] rounded-lg p-6 shadow-lg border border-[#6B64F2]">
            <h2 className="text-xl font-bold mb-4 text-[#A855F7]">Progreso actual</h2>
            <p className="text-gray-300">Progreso CTF: 80%</p>
            <p className="text-gray-300">Siguiente nivel: 90%</p>
            <p className="text-gray-300">Retos: 25</p>
            <p className="text-gray-300">Puntos: 1800</p>
            <p className="text-gray-300">Racha: 7 días</p>
          </div>

          {/* Top de estudiantes */}
          <div className="bg-[#1E1536] rounded-lg p-6 shadow-lg border border-[#6B64F2]">
            <h2 className="text-xl font-bold mb-4 text-[#A855F7]">Top de estudiantes</h2>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center mb-4">
                <img
                  src={usuario.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-4 border-2 border-[#A855F7]"
                />
                <p className="text-gray-300">{usuario.nombre} - 1200 puntos</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: Cursos destacados y Academias */}
        <div className="col-span-8 space-y-4">
          {/* Cursos destacados */}
          <div className="grid grid-cols-3 gap-4">
            {cursos
              .filter((curso) => curso.estado)
              .map((curso) => (
                <div
                  key={curso.id}
                  className="bg-[#0F0B1A] rounded-lg shadow-lg p-4 flex flex-col border border-[#1A0B2E]"
                >
                  <img
                    src={curso.avatar}
                    alt={curso.nombre}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold text-white">{curso.nombre}</h3>
                  <p className="text-sm text-gray-400">Clase 1 de 21</p>
                </div>
              ))}
          </div>
          <div className="flex font-black text-3xl">
            <text className="text-white">Nuestras Academias</text>
          </div>
        

          {/* Academias */}
          <div className="grid grid-cols-3 gap-4">
            {academias.map((academia) => (
              <div
                key={academia.id}
                className="bg-[#0F0B1A] rounded-lg shadow-lg p-4 flex flex-col border border-[#1A0B2E]"
              >
                <div className="flex items-center justify-between">
                  <img
                    src={academia.avatar}
                    alt={academia.nombre}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">{academia.nombre}</h3>
                    <p className="text-sm text-gray-400">12 cursos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cursos con estado false */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {cursos
              .filter((curso) => !curso.estado)
              .map((curso) => (
                <div
                  key={curso.id}
                  className="bg-[#0F0B1A] rounded-lg shadow-lg p-4 flex flex-col border border-[#1A0B2E]"
                >
                  <img
                    src={curso.avatar}
                    alt={curso.nombre}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold text-white">{curso.nombre}</h3>
                  <p className="text-sm text-gray-400">Clase 1 de 21</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal del chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-0 right-0 bg-[#241A49] rounded-lg p-6 shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Chatbot</h2>
          <p className="text-gray-300">
            Buenos días Carlos, ¿En qué puedo ayudarte el día de hoy?
          </p>
          <input
            type="text"
            placeholder="Escribe tu duda..."
            className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          />
        </div>
      )}

      {/* Botón para abrir el chatbot */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] text-white p-4 rounded-full shadow-lg hover:opacity-90"
      >
        💬
      </button>
    </section>
  );
}