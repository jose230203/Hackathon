"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Crown, Filter, Flame, Lock, Rocket, Zap } from "lucide-react";
import CTFNavbar from "@/presentation/components/CTFNavbar";
import ChallengeGrid, { type ChallengeLite } from "@/presentation/components/ChallengeGrid";
import { fetchChallenges, type Challenge } from "@/infrastructure/api/ctfService";

const fallbackChallenges: ChallengeLite[] = [
  {
    id: "ctf-zero-day",
    titulo: "Infiltración Zero-Day",
    categoria: "Web Exploitation",
    dificultad: "Hard",
    completados: 124,
    avatar: "/CTF.png",
  },
  {
    id: "ctf-quantum",
    titulo: "Quantum Cipher Leak",
    categoria: "Cryptography",
    dificultad: "Medium",
    completados: 302,
    avatar: "/AI.png",
  },
  {
    id: "ctf-trace",
    titulo: "Forensics: Packet Trace",
    categoria: "Forensics",
    dificultad: "Easy",
    completados: 487,
    avatar: "/globe.svg",
  },
  {
    id: "ctf-recon",
    titulo: "Red Recon Elite",
    categoria: "Recon",
    dificultad: "Medium",
    completados: 215,
    avatar: "/Terminal.png",
  },
  {
    id: "ctf-priv-esc",
    titulo: "Kernel Priv-Esc",
    categoria: "Pwn",
    dificultad: "Hard",
    completados: 82,
    avatar: "/bot.svg",
  },
  {
    id: "ctf-osint",
    titulo: "OSINT: Ghost Trail",
    categoria: "OSINT",
    dificultad: "Easy",
    completados: 540,
    avatar: "/Lupa.svg",
  },
];

const leaderboard = [
  { rank: 1, name: "SuidBot", score: 4280, streak: 12 },
  { rank: 2, name: "GhostByte", score: 3920, streak: 8 },
  { rank: 3, name: "ZeroPulse", score: 3510, streak: 4 },
  { rank: 4, name: "OverflowX", score: 3185, streak: 6 },
];

const upcomingSessions = [
  { title: "Stream en vivo: explotación SSRF", date: "12 Nov", time: "19:00 GMT" },
  { title: "Breaking Crypto: nuevo set de retos", date: "14 Nov", time: "22:00 GMT" },
];

export default function CTFView() {
  const [items, setItems] = useState<ChallengeLite[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Todos");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data: Challenge[] = await fetchChallenges();
        if (!mounted) return;
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
        setError(err.message || "Error al cargar desafíos");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const challengeList = useMemo(() => items ?? fallbackChallenges, [items]);
  const highlight = challengeList[0];

  const filteredList = useMemo(() => {
    if (activeTab === "Todos") return challengeList;
    if (activeTab === "Favoritos") return challengeList.slice(0, 3);
    if (activeTab === "En progreso") return challengeList.filter((_, i) => i % 2 === 0);
    if (activeTab === "Mis desafíos") return challengeList.filter((_, i) => i < 2);
    return challengeList;
  }, [activeTab, challengeList]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(168,85,247,0.15) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#A855F7]/30 blur-3xl" />
        <div className="absolute top-24 -right-20 h-80 w-80 rounded-full bg-[#0BFFB7]/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <CTFNavbar />

        <header className="mt-10 grid gap-8 lg:grid-cols-[1.6fr,1fr]">
          <div className="rounded-3xl border border-[#2D1B69] bg-[#1A0B2E]/80 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-white/70">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#2D1B69]/70 px-4 py-1">
                <Zap className="h-4 w-4 text-[#0BFFB7]" />
                Temporada Black Umbra
              </div>
              <div className="flex items-center gap-2 text-sm normal-case tracking-normal">
                <Flame className="h-4 w-4 text-orange-300" />
                Racha activa:
                <span className="font-semibold text-white">12 días</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row">
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
                  {highlight?.titulo ?? "Challenge destacado"}
                </h1>
                <p className="text-sm text-white/70 lg:text-base">
                  Despliega un entorno real con hints contextuales, métricas en vivo y visibilidad de puntuación instantánea. Completa este reto para desbloquear una llave de temporada.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0BFFB7] to-[#6366F1] px-5 py-2 font-semibold text-black shadow-lg shadow-[#0BFFB7]/30 transition hover:scale-[1.02]">
                    <Rocket className="h-4 w-4" />
                    Iniciar entorno
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 font-semibold text-white/80 transition hover:border-white/40">
                    <Lock className="h-4 w-4" />
                    Ver hints
                  </button>
                </div>
              </div>

              <div className="relative flex h-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-[#2D1B69] bg-[#101026]/90 p-6 text-sm">
                <div className="absolute -right-16 top-16 h-52 w-52 rounded-full bg-[#A855F7]/25 blur-3xl" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Mi panel</p>
                  <p className="mt-2 text-4xl font-black text-white">4,280 pts</p>
                  <p className="mt-1 text-xs text-white/60">Ranking global #12 • Liga Diamante</p>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-white/60">
                  <div className="rounded-2xl border border-[#2D1B69] bg-[#1A0B2E]/70 p-3">
                    <p className="text-white/50">Retos</p>
                    <p className="mt-2 text-xl font-bold text-white">36</p>
                  </div>
                  <div className="rounded-2xl border border-[#2D1B69] bg-[#1A0B2E]/70 p-3">
                    <p className="text-white/50">VM activas</p>
                    <p className="mt-2 text-xl font-bold text-white">2</p>
                  </div>
                  <div className="rounded-2xl border border-[#2D1B69] bg-[#1A0B2E]/70 p-3">
                    <p className="text-white/50">Logros</p>
                    <p className="mt-2 text-xl font-bold text-white">14</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-[#2D1B69] bg-[#1A0B2E]/85 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Clasificación relámpago</h3>
                <Crown className="h-5 w-5 text-amber-300" />
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {leaderboard.map((item) => (
                  <li key={item.rank} className="flex items-center justify-between rounded-xl border border-[#2D1B69] bg-[#0F0B1A]/60 px-4 py-3">
                    <div className="flex items-center gap-4">
                      <span className="text-white/40">#{item.rank}</span>
                      <span className="font-medium text-white">{item.name}</span>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-white text-sm font-semibold">{item.score.toLocaleString()} pts</p>
                      <p className="text-white/50">Racha {item.streak}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#2D1B69] bg-[#1A0B2E]/85 p-6">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Zap className="h-4 w-4 text-[#0BFFB7]" />
                Próximos eventos
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {upcomingSessions.map((session) => (
                  <li key={session.title} className="flex items-center justify-between rounded-xl border border-[#2D1B69] bg-[#0F0B1A]/60 px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{session.title}</p>
                      <p className="text-xs text-white/50">{session.date} • {session.time}</p>
                    </div>
                    <button className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:border-white/35">
                      Recordar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </header>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Explora los desafíos</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {["Todos", "Mis desafíos", "Favoritos", "En progreso"].map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-semibold transition ${
                      isActive
                        ? "border-[#0BFFB7]/60 bg-[#0BFFB7]/20 text-[#0BFFB7]"
                        : "border-white/10 bg-[#1A0B2E]/70 text-white/60 hover:border-white/30"
                    }`}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {loading && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-40 animate-pulse rounded-2xl border border-[#2D1B69] bg-[#1A0B2E]/60" />
              ))}
            </div>
          )}
          {error && <p className="mt-6 text-sm text-red-300">{error}</p>}
          {!loading && (
            <div className="mt-8 rounded-3xl border border-[#2D1B69] bg-[#0F0B1A]/70 p-4 backdrop-blur">
              <ChallengeGrid challenges={filteredList} />
            </div>
          )}
        </section>

        <section className="mt-16 rounded-3xl border border-[#2D1B69] bg-[#1A0B2E]/80 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Modo campaña</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Ruta: Guardianes del perímetro</h3>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                Avanza por cinco retos encadenados para desbloquear cinemáticas, obtener insignias especiales y asegurar un cupo en la final presencial. Necesitas al menos 3 llaves de oro para acceder a la misión final.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              {["Briefing", "Recon", "Persistencia", "Exfil", "Boss Fight"].map((stage, idx) => (
                <div key={stage} className="relative rounded-full border border-[#2D1B69] bg-[#0F0B1A]/70 px-4 py-2">
                  <span className="text-white/40">{idx + 1}</span>
                  <span className="ml-3 font-semibold text-white">{stage}</span>
                  {idx < 4 ? (
                    <span className="absolute -right-2 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-white/20 to-transparent sm:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}