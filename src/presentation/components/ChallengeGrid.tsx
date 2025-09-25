import React from "react";
import ChallengeCard, { ChallengeCardProps } from "./ChallengeCard";
import { Academia, Dificultad, TipoAcademia } from "../../domain/entities/Academia";

const challenges: Academia[] = [
  {
    id: "1",
    nombre: "SQL Injection",
    descripcion: "Aprende sobre inyecciones SQL y cómo prevenirlas.",
    avatar: "/sql-injection.png",
    tipoAcademia: TipoAcademia.Academia, 
    dificultad: Dificultad.Intermedio,
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "2",
    nombre: "RSA Decryption",
    descripcion: "Desafío avanzado de criptografía RSA.",
    avatar: "/rsa-decryption.png",
    tipoAcademia: TipoAcademia.Laboratorio, 
    dificultad: Dificultad.Avanzado,
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: "3",
    nombre: "Memory Dump Analysis",
    descripcion: "Analiza volcados de memoria para encontrar pistas.",
    avatar: "/CursoImagen.png",
    tipoAcademia: TipoAcademia.Academia,
    dificultad: Dificultad.Novato,
    estado: true,
    fechaRegistro: new Date(),
  },
];

const ChallengeGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={index}
          category={challenge.tipoAcademia}
          name={challenge.nombre}
          difficulty={
            challenge.dificultad === Dificultad.Novato
              ? "Easy"
              : challenge.dificultad === Dificultad.Intermedio
              ? "Medium"
              : "Hard"
          } 
          completedCount={0}
          avatar={challenge.avatar}
        />
      ))}
    </div>
  );
};

export default ChallengeGrid;