import React from "react";
import type { Curso } from "@/domain/entities/Curso";

export default function CoursesSection({ cursos }: { cursos: Curso[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-8">
        <h2 className="text-3xl font-bold text-white">Buenos días, Carlos</h2>
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
              <h3 className="text-lg font-bold text-white">{curso.nombre}</h3>
              <p className="text-sm text-gray-400">Clase 1 de 21</p>
            </div>
          </div>
        ))}
    </div>
  );
}