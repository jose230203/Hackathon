"use client";

import React from "react";
import Image from "next/image";

export default function LearningPathSection() {
  const styleCard = {
    borderRadius: "16px",
    height: "260px"
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20  text-center relative" style={{ paddingTop: "5rem" }}>
      <h2 className="font-['arial'] text-5xl font-bold text-[#ffffff95] mb-10">
        Explora nuestra ruta de aprendizaje
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Ciberseguridad */}
        <div className="relative group">
          <div className="bg-black/10 rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] cursor-pointer" style={styleCard}>
            <div className="flex justify-center mb-4">
              <Image
                src="/CyberSeguridad.png"
                alt="Ciberseguridad"
                width={96}
                height={96}
              />
            </div>
            <h3 className="font-['arial'] text-xl font-semibold mb-2">Ciberseguridad</h3>
            <p className="font-['arial'] text-gray-300">
              Aprende técnicas de ciberseguridad con laboratorios realistas
            </p>
          </div>
          {/* Tarjeta emergente */}
          <div className="absolute top-0 left-0 w-full bg-[#241A49] rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-[104%] transition-all duration-300 z-50">
            <h4 className="font-['arial'] text-lg font-bold mb-2">Más información</h4>
            <p className="font-['arial'] text-sm text-gray-300">
              Explora técnicas avanzadas y protege sistemas críticos. Accede a recursos exclusivos y mejora tus habilidades.
            </p>
          </div>
        </div>

        {/* Retos CTF */}
        <div className="relative group">
          <div className="bg-black/10 rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] cursor-pointer" style={styleCard}>
            <div className="flex justify-center mb-4">
              <Image
                src="/CTF.png"
                alt="Retos CTF"
                width={96}
                height={96}
              />
            </div>
            <h3 className="font-['arial'] text-xl font-semibold mb-2">Retos CTF</h3>
            <p className="font-['arial'] text-gray-300">
              Desafíos Capture The Flag de todos los niveles
            </p>
          </div>
          {/* Tarjeta emergente */}
          <div className="absolute top-0 left-0 w-full bg-[#241A49] rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-[104%] transition-all duration-300 z-50">
            <h4 className="font-['arial'] text-lg font-bold mb-2">Más información</h4>
            <p className="font-['arial'] text-sm text-gray-300">
              Participa en competiciones y mejora tus habilidades de hacking. Obtén experiencia práctica en entornos simulados.
            </p>
          </div>
        </div>

        {/* Cursos Guiados */}
        <div className="relative group">
          <div className="bg-black/10 rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] cursor-pointer" style={styleCard}>
            <div className="flex justify-center mb-4">
              <Image
                src="/Academia.png"
                alt="Cursos Guiados"
                width={96}
                height={96}
              />
            </div>
            <h3 className="font-['arial'] text-xl font-semibold mb-2">Cursos Guiados</h3>
            <p className="font-['arial'] text-gray-300">
              Rutas de aprendizaje estructuradas y mentorías
            </p>
          </div>
          {/* Tarjeta emergente */}
          <div className="absolute top-0 left-0 w-full bg-[#241A49] rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-[104%] transition-all duration-300 z-50">
            <h4 className="font-['arial'] text-lg font-bold mb-2">Más información</h4>
            <p className="font-['arial'] text-sm text-gray-300">
              Aprende con expertos y sigue rutas personalizadas. Accede a mentorías exclusivas y proyectos prácticos.
            </p>
          </div>
        </div>

        {/* Programación */}
        <div className="relative group">
          <div className="bg-black/10 rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] cursor-pointer" style={styleCard}>
            <div className="flex justify-center mb-4">
              <Image
                src="/Programacion.png"
                alt="Programación"
                width={96}
                height={96}
              />
            </div>
            <h3 className="font-['arial'] text-xl font-semibold mb-2">Programación</h3>
            <p className="text-gray-300">
              Practica tus habilidades de programador
            </p>
          </div>
          {/* Tarjeta emergente */}
          <div className="absolute top-0 left-0 w-full bg-[#241A49] rounded-xl p-6 text-white shadow-lg border border-[rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-[104%] transition-all duration-300 z-50">
            <h4 className="font-['arial'] text-lg font-bold mb-2">Más información</h4>
            <p className="font-['arial'] text-sm text-gray-300">
              Domina lenguajes y frameworks modernos. Construye proyectos reales y mejora tu portafolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}