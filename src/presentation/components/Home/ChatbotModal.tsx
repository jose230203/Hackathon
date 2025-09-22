import React from "react";

export default function ChatbotModal({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {/* Modal del chatbot */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-[#0F0B1A] rounded-lg p-6 shadow-lg w-96 h-[500px] border border-[#1A0B2E]">
          <div className="flex items-center mb-4">
            <img
              src="/bot.svg"
              alt="Bot Icon"
              className="w-6 h-6 mr-2"
            />
            <h2 className="text-lg font-bold text-white">
              Buenos días Carlos, ¿En qué puedo ayudarte el día de hoy?
            </h2>
          </div>
          <div className="space-y-4">
            {/* Pregunta */}
            <div className="flex items-center justify-end mb-4">
              <p className="text-sm text-gray-400">¿Qué es nmap?</p>
            </div>
            {/* Respuesta */}
            <div className="flex items-center mb-4">
              <img
                src="/bot.svg"
                alt="Bot Icon"
                className="w-6 h-6 mr-2"
              />
              <p className="text-sm text-gray-400">Respuesta de la IA...</p>
            </div>
          </div>
          {/* Input para escribir dudas */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Escribe tu duda..."
              className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
            />
            <button className="ml-2">
              <img
                src="/lupa.svg"
                alt="Search Icon"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}