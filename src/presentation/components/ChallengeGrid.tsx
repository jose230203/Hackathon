import React from "react";
import ChallengeCard from "./ChallengeCard";

export type ChallengeLite = {
  id: string;
  titulo: string;
  categoria: string;
  dificultad: "Easy" | "Medium" | "Hard";
  completados: number;
  avatar?: string;
};

type Props = {
  challenges: ChallengeLite[];
};

const ChallengeGrid: React.FC<Props> = ({ challenges }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {challenges.map((ch) => (
        <ChallengeCard
          key={ch.id}
          category={ch.categoria}
          name={ch.titulo}
          difficulty={ch.dificultad}
          completedCount={ch.completados}
          avatar={ch.avatar}
          href={`/ctf/${ch.id}`}
        />
      ))}
    </div>
  );
};

export default ChallengeGrid;