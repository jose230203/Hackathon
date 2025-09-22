import React from "react";

interface CursoCardProps {
  titulo: string;
  clase: string;
  imgSrc: string;
}

const CursoCard: React.FC<CursoCardProps> = ({ titulo, clase, imgSrc }) => (
  <div
    className="rounded-xl p-4 flex flex-col gap-2 shadow-md"
    style={{
      background: "linear-gradient(135deg, rgba(88,28,135,0.4) 60%, rgba(49,46,129,0.3) 100%)"
    }}
  >
    <img src={imgSrc} alt={titulo} className="rounded-lg w-full h-32 object-cover mb-2" />
    <h3 className="text-lg font-semibold text-white">{titulo}</h3>
    <span className="text-white/70">{clase}</span>
  </div>
);

export default CursoCard;
