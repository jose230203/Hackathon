import React from "react";

const ChatCard: React.FC = () => (
  <div className="rounded-xl bg-[#0B1739] p-4 flex flex-col min-h-[350px] relative">
    <div className="absolute top-4 left-4">
      <img src="/file.svg" alt="icono" className="w-6 h-6" />
    </div>
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
      <img src="/globe.svg" alt="icono" className="w-8 h-8" />
    </div>
    <div className="flex flex-1 items-end justify-center pb-4">
      <input type="text" placeholder="Escribe tu duda..." className="w-full rounded-lg p-2 bg-[#3d2177] text-white" />
    </div>
  </div>
);

export default ChatCard;
