import React from "react";
import Image from "next/image";

export default function ForgotPasswordView() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative flex items-center justify-center">
     
      {/* Contenedor principal */}
      <div className="bg-[#1A0B2E] rounded-lg p-8 shadow-lg w-[400px] text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20  flex items-center justify-center">
            <Image src="/Logo.svg" alt="Logo" width={80} height={80} className="w-20 h-20" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">¿Has olvidado tu contraseña?</h1>
        <p className="text-sm text-gray-400 mb-6">
          No te preocupes, ingresa tu correo para restablecerla
        </p>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full p-2 rounded bg-[#312E81] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2] mb-4"
        />
        <button className="bg-gradient-to-l from-[#6366F1] to-[#A855F7] text-white px-4 py-2 rounded-lg hover:brightness-125">
          Enviar correo 🚀
        </button>
      </div>
    </section>
  );
}