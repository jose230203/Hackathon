import React from "react";

interface Props {
  titulo: string;
  duracion: string;
  imgSrc: string;
  selected?: boolean;
}

const CourseClassCard: React.FC<Props> = ({ titulo, duracion, imgSrc, selected }) => (
  <div
  className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all duration-200 bg-[#312E81]/30 group hover:brightness-200 hover:shadow-lg`}
  >
    <img
      src={imgSrc}
      alt={titulo}
      className="w-20 h-12 rounded-md object-cover transition-all duration-200"
    />
    <div>
      <h4 className="text-white font-semibold text-base">{titulo}</h4>
      <span className="text-white/70 text-sm">{duracion}</span>
    </div>
  </div>
);

export default CourseClassCard;
