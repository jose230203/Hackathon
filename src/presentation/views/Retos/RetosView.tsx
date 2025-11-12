"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Medal,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const personalPath = [
  {
    title: "Reconocimiento activo",
    description: "Completa 3 laboratorios de enumeración con Burp y Zakuro.",
    progress: 2,
    total: 3,
    eta: "45 min",
  },
  {
    title: "Explotación web sin CVE",
    description: "Construye un exploit ciego usando SSRF + file write.",
    progress: 1,
    total: 2,
    eta: "1 h",
  },
  {
    title: "Persistencia y escalado",
    description: "Escala privilegios en un contenedor y mantén acceso.",
    progress: 0,
    total: 2,
    eta: "1 h 15 min",
  },
];

const sprintChallenges = [
  {
    tag: "#reto-diario",
    title: "Rompe la seed del PRNG",
    reward: "+120 XP",
    time: "Dispon. 6h",
  },
  {
    tag: "#speedrun",
    title: "Backdoor en 5 pasos",
    reward: "Badge Neon",
    time: "Dispon. 12h",
  },
  {
    tag: "#co-op",
    title: "Resuelve el puzzle binario en equipo",
    reward: "+2 llaves doradas",
    time: "Dispon. 24h",
  },
];

const communityFeed = [
  {
    user: "Kitsune",
    action: "publicó un writeup de Crypto Mirage.",
    time: "hace 12 min",
  },
  {
    user: "ShadowRoot",
    action: "abrió un reto colaborativo sobre LLM prompt leaks.",
    time: "hace 18 min",
  },
  {
    user: "BinaryNeko",
    action: "compartió PoC para escalar a kube-system.",
    time: "hace 25 min",
  },
];

const upcomingRewards = [
  { name: "Skin holográfica", requirement: "5 retos de la campaña actual" },
  { name: "Token Black Umbra", requirement: "Top 10 en leaderboard semanal" },
  { name: "Entrada LAN Night", requirement: "Completar 3 speedruns" },
];

const gradientCard =
  "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur";

export default function RetosView() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05030d] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#130c36] via-[#08041a] to-[#01000a]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(99,102,241,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-24 right-12 h-80 w-80 rounded-full bg-[#6366F1]/30 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-[#0BFFB7]/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <header className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/80">
              <Sparkles className="h-4 w-4 text-[#0BFFB7]" />
              XP Season 04
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
              Retos y campañas inmersivas
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/70 lg:text-base">
              Avanza por rutas diseñadas para tu nivel, combina retos diarios con campañas narrativas y desbloquea recompensas coleccionables. Ajustamos la dificultad en tiempo real según tu desempeño.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0BFFB7] to-[#22d3ee] px-5 py-2 font-semibold text-black shadow-lg shadow-[#0BFFB7]/30 transition hover:scale-[1.02]">
              <Trophy className="h-4 w-4" />
              Activar campaña
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition hover:border-white/40">
              <BookmarkCheck className="h-4 w-4" />
              Guardar para luego
            </button>
          </div>
        </header>

        <main className="mt-12 grid gap-8 lg:grid-cols-[1.5fr,1fr]">
          <div className="space-y-8">
            <section className={`${gradientCard}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                    Camino sugerido para ti
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Operación Vector Fantasma
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Recopila inteligencia, exfiltra datos y limpia rastros. Completa los 3 módulos antes de la próxima sincronía para desbloquear la misión cooperativa.
                  </p>
                </div>
                <div className="hidden rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-xs text-white/70 sm:block">
                  <p className="uppercase tracking-[0.3em] text-white/40">Meta</p>
                  <p className="mt-2 text-3xl font-bold text-white">72%</p>
                  <p>de alineación</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {personalPath.map((step, idx) => {
                  const completion = Math.round((step.progress / step.total) * 100);
                  return (
                    <div
                      key={step.title}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <p className="text-xs uppercase text-white/50">
                            Módulo {idx + 1}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                          <p className="mt-1 text-sm text-white/60">
                            {step.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#0BFFB7]" />
                            {step.progress}/{step.total}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#22d3ee]" />
                            {step.eta}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-[#0BFFB7] to-[#4f46e5]"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  Racha en retos: <span className="font-semibold text-white">7 días</span>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#0BFFB7] transition hover:text-[#5eead4]"
                >
                  Ver plan detallado
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <section className={`${gradientCard}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Sprint relámpago
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">Retos de hoy</h2>
                </div>
                <div className="rounded-full border border-white/10 bg-black/30 px-4 py-1 text-xs text-white/60">
                  Reinicia en 04:12:58
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {sprintChallenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                        <Target className="h-3 w-3" />
                        {challenge.tag}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                    </div>
                    <div className="mt-4 space-y-2 text-xs text-white/60">
                      <p className="flex items-center gap-2">
                        <Medal className="h-4 w-4 text-amber-300" />
                        {challenge.reward}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#22d3ee]" />
                        {challenge.time}
                      </p>
                    </div>
                    <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 transition hover:border-white/40">
                      Intentar ahora
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className={`${gradientCard}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Actividad comunitaria</h2>
                <Link
                  href="#"
                  className="text-xs text-white/60 transition hover:text-white"
                >
                  Ver todo
                </Link>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {communityFeed.map((item) => (
                  <li
                    key={item.user}
                    className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
                  >
                    <p>
                      <span className="font-semibold text-white">{item.user}</span> {item.action}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{item.time}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${gradientCard}`}>
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-[#facc15]" />
                <div>
                  <h2 className="text-lg font-semibold">Recompensas próximas</h2>
                  <p className="text-xs text-white/60">
                    Completa objetivos para desbloquear items cosméticos exclusivos.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {upcomingRewards.map((reward) => (
                  <li
                    key={reward.name}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0BFFB7]/20 text-[#0BFFB7]">
                      ★
                    </span>
                    <div>
                      <p className="font-semibold text-white">{reward.name}</p>
                      <p className="text-xs text-white/60">{reward.requirement}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </main>
      </div>
    </section>
  );
}
