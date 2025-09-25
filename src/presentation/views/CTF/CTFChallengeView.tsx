"use client";

import React, { useState } from 'react';
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

export default function CTFChallengeView() {
  const [vmActive, setVmActive] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      <CTFNavbar usuario={usuario} />

      <div className="mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Left: VM (9 cols) then questions */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
          {/* VM panel with button */}
          <div className="bg-[#1A142B] rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">SecureNet VM</h1>
                <p className="text-sm text-gray-300">Máquina virtual asociada al challenge.</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setVmActive(!vmActive)}
                  className={`px-4 py-2 rounded text-white ${vmActive ? 'bg-green-500' : 'bg-purple-600'}`}
                >
                  {vmActive ? 'Detener VM' : 'Iniciar VM'}
                </button>
                <span className={`px-3 py-1 rounded text-sm ${vmActive ? 'bg-green-600 text-black' : 'bg-gray-700 text-gray-200'}`}>
                  {vmActive ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>

            {/* White area that shows VM content when active */}
            <div className="bg-white text-black rounded-lg p-6 mt-2 flex items-center justify-center">
              {vmActive ? (
                <div className="text-center">
                  <img src="/SecureNet.png" className="w-full max-w-md mb-4 rounded" alt="VM" />
                  <h3 className="font-bold text-xl">SecureNet VM</h3>
                  <p className="text-sm text-gray-600">La VM está activa y lista para conectarse.</p>
                </div>
              ) : (
                <div className="text-center w-full">
                  <div className="h-20 w-20 rounded-full bg-[#1A0B2E] mx-auto mb-4"></div>
                  <h3 className="font-bold text-xl text-white">VM inactiva</h3>
                  <p className="text-sm text-gray-300">Inicia la VM para ver el contenido aquí.</p>
                </div>
              )}
            </div>
          </div>

          {/* Questions / Flags (below VM) */}
          <div className="bg-[#1A142B] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Preguntas de la máquina</h2>
            <label className="block text-sm mb-2">Flag de usuario</label>
            <input className="w-full p-2 rounded bg-[#0F0B1A] text-white border border-gray-700 mb-4" />
            <label className="block text-sm mb-2">Flag de root</label>
            <input className="w-full p-2 rounded bg-[#0F0B1A] text-white border border-gray-700 mb-4" />
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Enviar flags</button>
          </div>
        </div>

        {/* Right: Purple panel (3 cols) with machine image and metadata */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-[#2D1B69] rounded-lg p-4 flex flex-col items-center">
            <div className="w-full grid grid-cols-1 gap-4">
              <img src="/SecureNet.png" alt="machine" className="w-full rounded mb-2 object-cover" />
              <div className="text-center text-white">
                <h4 className="font-semibold">SecureNet VM</h4>
                <p className="text-sm text-gray-200">Resumen de la máquina</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A142B] rounded-lg p-4">
            <h5 className="text-lg font-bold mb-2">Información rápida</h5>
            <ul className="text-sm text-gray-300 list-disc list-inside">
              <li>Sistema operativo: Linux</li>
              <li>Puertos abiertos: 22, 80</li>
              <li>Tiempo estimado: 30 min</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
