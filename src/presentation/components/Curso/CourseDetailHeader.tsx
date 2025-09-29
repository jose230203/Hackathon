import React from "react";

interface Props {
  titulo: string;
  nivel: string;
  clases: number;
  horasContenido: number;
  horasPractica: number;
  descripcion: string;
}

const CourseDetailHeader: React.FC<Props> = ({ titulo, nivel, clases, horasContenido, horasPractica, descripcion }) => (
  <section style={{ paddingLeft: 0, paddingRight: 0}}>
    <h2 className="text-3xl font-bold text-white mb-2">{titulo}</h2>
    <div className="flex flex-wrap gap-2 mb-4 mt-4">
      <span className="bg-[#312E81]/30 text-white px-3 py-1 rounded-full text-sm font-semibold">{nivel}</span>
      <span className="bg-[#312E81]/30 text-white px-3 py-1 rounded-full text-sm font-semibold">{clases} clases</span>
      <span className="bg-[#312E81]/30 text-white px-3 py-1 rounded-full text-sm font-semibold">{horasContenido} horas de contenido</span>
      <span className="bg-[#312E81]/30 text-white px-3 py-1 rounded-full text-sm font-semibold">{horasPractica} horas de práctica</span>
    </div>
    <p className="text-white/80">{descripcion}</p>
  </section>
);

export default CourseDetailHeader;
