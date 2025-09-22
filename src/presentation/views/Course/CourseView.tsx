import React from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import ProgressSection from "@/presentation/components/Home/ProgressSection";
import ChatbotModal from "@/presentation/components/Home/ChatbotModal";

export default function CourseView() {
  const usuario = {
    id: "123",
    nombre: "Carlos Espinoza",
    correo: "carlos.espinoza@example.com",
    avatar: "/itachi.png",
    contrasena: "password123",
    estado: true,
    fechaRegistro: new Date(),
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
      <NavBarLogued usuario={usuario} />

      <div className="grid grid-cols-12 gap-4 px-8 py-4">
        <ChatbotModal isOpen={true} />

        {/* Columna derecha: Contenido del curso */}
        <div className="col-span-9 space-y-4">
          <div className="bg-linear-[from-[#312E81] to-[#581C87]] rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Curso de NMAP</h1>
            <div
              className="rounded-lg p-4 mb-40 border border-[#A855F7]/20"
              style={{
                background:
                  "linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(49, 46, 129, 0.3))",
              }}
            >
              <h2 className="text-xl font-bold mb-2">Iniciar Examen</h2>
              <p className="text-sm text-gray-400 mb-2">
                Para realizar el proceso de Live testing debes iniciar una máquina.
              </p>
              <button className="bg-gradient-to-l from-[#02CCA3] to-[#6366F1] border-[#E5E7EB] text-white px-4 py-2 rounded-lg hover:brightness-125">
                Encender máquina
              </button>
            </div>
            <div
              className="rounded-lg p-4 border border-[#A855F7]/20"
              style={{
                background:
                  "linear-gradient(to right, rgba(88, 28, 135, 0.4), rgba(49, 46, 129, 0.3))",
              }}
            >
              <h2 className="text-xl font-bold mb-2">
                ¿Cuál es el comando correcto para escanear solo los puertos 22 y 80?
              </h2>
              <ul className="space-y-2">
                <li className="text-sm text-[#5B79A5]">nmap -p 22,80 192.168.1.10</li>
                <li className="text-sm text-[#5B79A5]">nmap -sS 192.168.1.10</li>
                <li className="text-sm text-[#5B79A5]">nmap -Pn 192.168.1.10</li>
                <li className="text-sm text-[#5B79A5]">nmap -O 192.168.1.10</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}