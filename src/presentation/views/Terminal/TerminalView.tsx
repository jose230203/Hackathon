"use client";
import React, { useCallback, useState } from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import { execCommand } from "@/infrastructure/api/consoleService";

export default function TerminalView() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const run = useCallback(async () => {
    const cmd = command.trim();
    if (!cmd) return;
    setLoading(true);
    setError("");
    try {
      const result = await execCommand(cmd);
      setOutput((prev) => (prev ? prev + "\n" : "") + `$ ${cmd}\n` + result);
      setCommand("");
    } catch (e) {
      const err = e as unknown as { response?: { data?: { error?: string } }; message?: string };
      const msg = err?.response?.data?.error || err?.message || "Error al ejecutar el comando";
      setError(msg);
      setOutput((prev) => (prev ? prev + "\n" : "") + `$ ${cmd}\n` + msg);
    } finally {
      setLoading(false);
    }
  }, [command]);
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
  <NavBarLogued />

      <div className="px-8 py-4">
        <h1 className="text-3xl text-white font-bold mb-4 text-shadow-custom">Examen Practico: Introduccion a Nmap</h1>

        <div className="grid grid-cols-12 gap-4">
          {/* Barra con esferas y terminal */}
          <div className="col-span-7">
            {/* Barra con esferas */}
            <div className="flex items-center bg-gradient-to-r from-[#312E81] to-[#02CCA3] rounded-xl px-4 py-2 w-full">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>

            {/* Terminal */}
            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg h-[360px] border border-[#6B64F2] mt-0 flex flex-col">
              <div className="flex-1 overflow-y-auto font-mono text-sm whitespace-pre-wrap scrollbar-purple pr-2">
                {output ? (
                  <pre className="leading-relaxed">{output}</pre>
                ) : (
                  <p className="text-gray-400">Escribe un comando abajo y presiona Enter o Ejecutar…</p>
                )}
              </div>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      run();
                    }
                  }}
                  placeholder="Ejemplo: uptime"
                  className="flex-1 p-2 rounded bg-[#312E81] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
                />
                <button
                  onClick={run}
                  disabled={loading}
                  className="ml-2 bg-gradient-to-l from-[#02CCA3] to-[#6366F1] text-white px-4 py-2 rounded-lg hover:brightness-125 disabled:opacity-60"
                >
                  {loading ? "Ejecutando…" : "Ejecutar"}
                </button>
              </div>
            </div>
          </div>

          {/* Detalles del examen, instrucciones y subir */}
          <div className="col-span-5 space-y-4">
            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Detalles del examen</h2>
              <p className="text-sm text-gray-400">Nombre del Examen: Introduccion a nmap</p>
              <p className="text-sm text-gray-400">Tiempo Restante: 02:14:30</p>
              <p className="text-sm text-gray-400">Dificultad: Facil</p>
            </div>

            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Instrucciones</h2>
            </div>

            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Subir</h2>
              <button className="bg-gradient-to-l from-[#02CCA3] to-[#6366F1] text-white px-4 py-2 rounded-lg hover:brightness-125">
                Subir Examen
              </button>
            </div>
          </div>
        </div>

        {/* Preguntas */}
        <div className="mt-6 grid grid-cols-12 gap-4">
          {/* Pregunta 1 */}
          <div className="col-span-7 bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Ingrese la flag que se encontro al scanear Puertos y Servicios</h2>
            <input
              type="text"
              placeholder="Puertos y Servicios de la maquina"
              className="w-full p-2 rounded bg-[#312E81] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
            />
            <button className="bg-gradient-to-l from-[#02CCA3] to-[#6366F1] text-white px-4 py-2 rounded-lg mt-2 hover:brightness-125">
              Enviar
            </button>
          </div>

          {/* Pregunta 2 */}
          <div className="col-span-7 bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Para que sirve nmap Principalmente?</h2>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span className="text-sm text-[#5B79A5]">Monitorear El rendimiento del cpu</span>
                <input type="checkbox" className="form-checkbox" style={{ accentColor: 'green' }} />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-[#5B79A5]">Descubrir Host y puertos de una Red</span>
                <input type="checkbox" className="form-checkbox" style={{ accentColor: 'green' }} />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-[#5B79A5]">Crear Contraseñas Seguras</span>
                <input type="checkbox" className="form-checkbox" style={{ accentColor: 'green' }} />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-[#5B79A5]">Instalar Firewalls</span>
                <input type="checkbox" className="form-checkbox" style={{ accentColor: 'green' }} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}