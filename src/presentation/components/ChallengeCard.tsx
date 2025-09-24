import React from "react";

interface ChallengeCardProps {
  category: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completedCount: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  category,
  name,
  difficulty,
  completedCount,
}) => {
  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  return (
    <div className="bg-[#1A1A2E] text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-sm text-gray-400 mb-2">Categoría: {category}</p>
      <div className="flex items-center justify-between">
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
};

export type { ChallengeCardProps };
export default ChallengeCard;