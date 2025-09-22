import React from "react";

const ProgressCard: React.FC = () => (
  <div className="rounded-xl bg-[#2a1752] p-4 mb-4">
    <h3 className="text-lg font-bold text-white mb-2">Progreso actual</h3>
    <div className="mb-2">
      <span className="text-white/80">Progreso ctf</span>
      <div className="w-full bg-[#3d2177] rounded-full h-3 mt-1">
        <div className="bg-[#a259ff] h-3 rounded-full" style={{ width: "80%" }}></div>
      </div>
      <span className="text-white/60 text-sm">Siguiente nivel 90%</span>
    </div>
  </div>
);

export default ProgressCard;
