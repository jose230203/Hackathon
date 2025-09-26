import React from "react";
import type { Academia } from "@/domain/entities/Academia";
import Link from "next/link";

export default function AcademiesSection({ academias }: { academias: Academia[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {academias.map((academia, index) => (
        <Link
          key={academia.id}
          href={`/Academy/HomeAcademy/${academia.id}`}
          className="bg-[#0B1739] rounded-lg shadow-lg p-8 flex items-center justify-between border border-[#1A0B2E] cursor-pointer hover:bg-[#2D1B69] transition"
          style={{ opacity: Math.max(0.4, 1 - index * 0.1) }}
        >
          <img
            src={academia.avatar || "/Hazagey.jpg"}
            alt={academia.nombre}
            className="w-20 h-20 object-contain"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-bold text-white">{academia.nombre}</h3>
            <p className="text-lg text-gray-400">Ver cursos</p>
          </div>
        </Link>
      ))}
    </div>
  );
}