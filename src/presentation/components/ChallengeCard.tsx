/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

interface ChallengeCardProps {
  category: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completedCount: number;
  avatar?: string;
  href?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  category,
  name,
  difficulty,
  completedCount,
  avatar,
  href,
}) => {
  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  const cardContent = (
    <div className="bg-[#1A1A2E] text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar || "/RegisterBallena.png"}
          alt="avatar"
          className="h-12 w-12 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-400">Categoría: {category}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${difficultyColors[difficulty]}`}
        >
          {difficulty}
        </span>
        <span className="text-sm text-gray-300">
          {completedCount} completado{completedCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
};

export type { ChallengeCardProps };
export default ChallengeCard;