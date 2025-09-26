"use client";
import React, { useEffect, useState } from 'react';
import ChallengeGrid, { ChallengeLite } from '@/presentation/components/ChallengeGrid';
import CTFNavbar from '@/presentation/components/CTFNavbar';
import { fetchChallenges, type Challenge } from '@/infrastructure/api/ctfService';


export default function CTFView() {
  const [items, setItems] = useState<ChallengeLite[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data: Challenge[] = await fetchChallenges();
        if (!mounted) return;
        // Adapt data if backend fields differ
        const mapped: ChallengeLite[] = data.map((d) => ({
          id: d.id,
          titulo: d.titulo,
          categoria: d.categoria,
          dificultad: d.dificultad,
          completados: d.completados,
          avatar: d.avatar,
        }));
        setItems(mapped);
      } catch (e) {
        const err = e as Error;
        setError(err.message || 'Error al cargar desafíos');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      {/* Navbar */}
  <CTFNavbar />

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
        {loading && <p className="mt-6 text-gray-300">Cargando desafíos…</p>}
        {error && <p className="mt-6 text-red-400">{error}</p>}
        {items && <ChallengeGrid challenges={items} />}
      </div>
    </section>
  );
}