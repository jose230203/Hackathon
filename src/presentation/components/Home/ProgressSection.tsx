import React from "react";

export default function ProgressSection() {
  return (
    <div className="bg-[#0B1739] rounded-lg p-6 shadow-lg border border-[#1A0B2E]">
      <h2 className="text-xl font-bold mb-4 text-[#FFFFFF]">Progreso actual</h2>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-[#FFFFFF]">Progreso CTF</h3>
        <h3 className="text-lg font-bold text-[#A855F7]">80%</h3>
      </div>
      <div className="w-full bg-[#1A0B2E] rounded-full h-4 mb-4">
        <div className="bg-[#A855F7] h-4 rounded-full" style={{ width: "80%" }}></div>
      </div>
      <h3 className="text-lg font-bold text-[#5B79A5] mb-4">Siguiente nivel 90%</h3>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-[#FFFFFF]">Retos:</p>
        <span className="text-2xl font-bold text-[#A855F7]">25</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-[#FFFFFF]">Puntos:</p>
        <span className="text-2xl font-bold text-[#A855F7]">1800</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg text-[#FFFFFF]">Racha:</p>
        <span className="text-2xl font-bold text-[#A855F7]">7 días</span>
      </div>
    </div>
  );
}