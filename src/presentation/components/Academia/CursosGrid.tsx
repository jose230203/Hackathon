import React from "react";
import CursoCard from "./CursoCard";
import { Curso } from "@/domain/entities/Curso";

const cursos: Curso[] = [
  {
    id: "1",
    nombre: "Introducción a MCP",
    descripcion: "Clase 1 de 21",
    avatar: "/Hazagey.jpg",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Básico",
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "2",
    nombre: "Curso de hacking ético",
    descripcion: "Clase 1 de 21",
    avatar: "/Etico.png",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Intermedio",
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "3",
    nombre: "Curso de Introducción a Growth",
    descripcion: "Clase 12 de 23",
    avatar: "/Growth.png",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Básico",
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "4",
    nombre: "Introducción a MCP",
    descripcion: "Clase 1 de 21",
    avatar: "/MCP.png",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Básico",
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "5",
    nombre: "Curso de hacking ético",
    descripcion: "Clase 1 de 21",
    avatar: "/Hazagey.jpg",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Intermedio",
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "6",
    nombre: "Curso de Introducción a Growth",
    descripcion: "Clase 12 de 23",
    avatar: "/Growth.png",
    videoUrl: "",
    academiaId: "A1",
    dificultad: "Básico",
    estado: true,
    fechaRegistro: new Date(),
  },
];

const CursosGrid: React.FC = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-white">Los cursos de la academia</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <CursoCard key={curso.id} titulo={curso.nombre} clase={curso.descripcion} imgSrc={curso.avatar} />
      ))}
    </div>
  </section>
);

export default CursosGrid;
