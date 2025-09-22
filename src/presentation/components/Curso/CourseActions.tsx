import React from "react";

const CourseActions: React.FC = () => (
  <div className="flex flex-col gap-2 mt-4">
    <button className=" border-2 border-[#0BFFB7] text-[#0BFFB7] px-4 py-1 rounded-full font-semibold w-fit hover:brightness-250">Recursos</button>
    <p className="text-white/80 text-sm">Demuestra tu conocimiento en tiempo real<br />Usa un entorno controlado donde ejecutes ciertos comandos o ataques hacking para evaluar tu conocimiento en tiempo real.</p>
    <button className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#6B64F2] to-[#A259FF] text-white font-bold hover:brightness-110">Vamos ahora</button>
  </div>
);

export default CourseActions;
