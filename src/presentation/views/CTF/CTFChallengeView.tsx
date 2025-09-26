"use client";

import React, { useEffect, useMemo, useState } from 'react';
import CTFNavbar from '@/presentation/components/CTFNavbar';
import { fetchChallengeById, startVm, stopVm, submitFlags, type Challenge } from '@/infrastructure/api/ctfService';
import { useParams, useSearchParams } from 'next/navigation';

type Props = { id?: string };
export default function CTFChallengeView({ id }: Props) {
  const params = useParams();
  const search = useSearchParams();
  const effectiveId = useMemo(() => id ?? (params as unknown as { id?: string })?.id ?? search.get('id') ?? null, [id, params, search]);
  const [vmActive, setVmActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userFlag, setUserFlag] = useState("");
  const [rootFlag, setRootFlag] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!effectiveId) {
        setLoading(false);
        return;
      }
      try {
        const ch = await fetchChallengeById(effectiveId);
        if (!mounted) return;
        setChallenge(ch);
      } catch (e) {
        const err = e as Error;
        setError(err.message || 'No se pudo cargar el challenge');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [effectiveId]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
  <CTFNavbar />

      <div className="mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Left: VM (9 cols) then questions */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
          {/* VM panel with button */}
          <div className="bg-[#1A142B] rounded-lg p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{challenge?.titulo ?? 'Challenge'}</h1>
                <p className="text-sm text-gray-300">Máquina virtual asociada al challenge.</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={async () => {
                    try {
                      if (!vmActive) {
                        if (!effectiveId) return;
                        await startVm(effectiveId);
                        setVmActive(true);
                      } else {
                        if (!effectiveId) return;
                        await stopVm(effectiveId);
                        setVmActive(false);
                      }
                    } catch (e) {
                      // opcional: mostrar toast
                    }
                  }}
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
                  <img src={challenge?.avatar || "/SecureNet.png"} className="w-full max-w-md mb-4 rounded" alt="VM" />
                  <h3 className="font-bold text-xl">{challenge?.titulo ?? 'Challenge'}</h3>
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
            <input value={userFlag} onChange={(e) => setUserFlag(e.target.value)} className="w-full p-2 rounded bg-[#0F0B1A] text-white border border-gray-700 mb-4" />
            <label className="block text-sm mb-2">Flag de root</label>
            <input value={rootFlag} onChange={(e) => setRootFlag(e.target.value)} className="w-full p-2 rounded bg-[#0F0B1A] text-white border border-gray-700 mb-4" />
            <button onClick={async () => {
              try {
                if (!effectiveId) return;
                await submitFlags(effectiveId, { userFlag, rootFlag });
                setUserFlag("");
                setRootFlag("");
              } catch (e) {
                // opcional: mostrar error
              }
            }} className="bg-purple-600 text-white px-4 py-2 rounded">Enviar flags</button>
          </div>
        </div>

        {/* Right: Purple panel (3 cols) with machine image and metadata */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-[#2D1B69] rounded-lg p-4 flex flex-col items-center">
            <div className="w-full grid grid-cols-1 gap-4">
              <img src={challenge?.avatar || "/SecureNet.png"} alt="machine" className="w-full rounded mb-2 object-cover" />
              <div className="text-center text-white">
                <h4 className="font-semibold">{challenge?.titulo ?? 'Challenge'}</h4>
                <p className="text-sm text-gray-200">{challenge?.resumen ?? 'Resumen de la máquina'}</p>
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
