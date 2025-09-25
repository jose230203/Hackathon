import React from 'react';
import ChallengeGrid from '@/presentation/components/ChallengeGrid';
import CTFNavbar from '@/presentation/components/CTFNavbar';
 const usuario = {
    id: "123",
    nombre: "Carlos Espinoza",
    correo: "carlos.espinoza@example.com",
    avatar: "/itachi.png",
    contrasena: "password123",
    estado: true,
    fechaRegistro: new Date(),
  };


export default function CTFView() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      {/* Navbar */}
      <CTFNavbar usuario={usuario} />

      {/* Main Content */}
      <div className=" text-white p-4 flex items-center justify-between shadow-md">

      </div>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Desafíos CTF</h1>
                <div className="flex space-x-4">
          <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
            <option>Category</option>
            <option>Web</option>
            <option>Crypto</option>
            <option>Forensics</option>
          </select>
          <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
            <option>Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
            <option>Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
        <ChallengeGrid />
      </div>
    </section>
  );
}