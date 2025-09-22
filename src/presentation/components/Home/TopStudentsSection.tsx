import React from "react";

export default function TopStudentsSection({ usuario }: { usuario: any }) {
  return (
    <div className="bg-[#0B1739] rounded-lg p-6 shadow-lg border border-[#1A0B2E]">
      <h2 className="text-3xl text-center font-bold mb-6 text-white text-shadow-custom">Top de estudiantes</h2>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center mb-4 p-4 rounded-2xl"
          style={{
            background: "radial-gradient(circle, rgba(62, 102, 143, 0.4) 0%, rgba(42, 69, 100, 0.4) 100%)",
          }}
        >
          <img
            src={usuario.avatar}
            alt="Avatar"
            className="w-15 h-15 rounded-full mr-4"
          />
          <p className="text-sm text-gray-400">{usuario.nombre} - 1200 puntos</p>
        </div>
      ))}
    </div>
  );
}