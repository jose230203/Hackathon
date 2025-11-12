"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";

type Pregunta = {
  Pregunta: string;
  Opciones: string[];
  Respuesta: string;
};

type Examen = {
  Nombre: string;
  Descripcion?: string;
  Preguntas: Pregunta[];
};

export default function TerminalView() {
  const RAW_URL =
    "https://raw.githubusercontent.com/carlos-Espinoza-perez/files-hackathon-2025/main/Examenes/preguntas_nmap.json";

  const [exam, setExam] = useState<Examen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Estado por pregunta: seleccion/input y si está bloqueada por acierto
  const [answers, setAnswers] = useState<Array<{ value: string; correct: boolean; locked: boolean }>>([]);
  const [verified, setVerified] = useState(false);

  const terminalSrc = useMemo(() => {
    const u = process.env.NEXT_PUBLIC_TERMINAL_URL + ":8080" || "35.208.27.6:8080";
    if (!u) return "";
    return /^https?:\/\//i.test(u) ? u : `http://${u}`;
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(RAW_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`No se pudo cargar el examen (${res.status})`);
        const data = (await res.json()) as Examen;
        if (!mounted) return;
        setExam(data);
        setAnswers(data.Preguntas.map(() => ({ value: "", correct: false, locked: false })));
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Error al cargar el examen");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const total = exam?.Preguntas.length ?? 0;
  const correctas = answers.filter((a) => a.correct).length;

  const handleSelect = (idx: number, opcion: string) => {
    // Solo se puede seleccionar una vez; no mostramos resultado hasta verificar
    if (!exam || answers[idx]?.locked || verified) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = { value: opcion, correct: false, locked: true };
      return next;
    });
  };

  const handleFlagChange = (idx: number, val: string) => {
    if (answers[idx]?.locked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], value: val };
      return next;
    });
  };

  const verificarFlag = (idx: number) => {
    if (!exam || verified) return;
    setAnswers((prev) => {
      const evaluated = prev.map((a, i) => {
        const q = exam.Preguntas[i];
        const val = (a?.value ?? "").trim();
        const correct = val.length > 0 && val === (q.Respuesta || "").trim();
        // Al verificar, todas quedan bloqueadas
        if (i === idx) {
          return { value: a?.value ?? "", correct, locked: true };
        }
        // Para opción múltiple, ya estaban bloqueadas al elegir; si no eligieron, también bloquea
        return { value: a?.value ?? "", correct, locked: true };
      });
      return evaluated;
    });
    setVerified(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar */}
      <NavBarLogued />

      <div className="px-8 py-4">
        <h1 className="text-3xl text-white font-bold mb-2 text-shadow-custom">
          {exam?.Nombre || "Examen de Nmap"}
        </h1>
        {exam?.Descripcion && (
          <p className="text-sm text-white/70 mb-4">{exam.Descripcion}</p>
        )}

        <div className="mb-4 flex items-center gap-3 text-sm text-white/80">
          {loading && <span>Cargando examen…</span>}
          {error && (
            <span className="text-red-300 bg-red-500/10 border border-red-500/20 rounded px-2 py-1">
              {error}
            </span>
          )}
          {!loading && !error && total > 0 && (
            <span className="bg-white/5 border border-white/10 rounded px-2 py-1">
              Progreso: {correctas}/{total} correctas
            </span>
          )}
        </div>

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
              <div className="relative w-full h-full overflow-hidden rounded">
                <iframe
                  src={terminalSrc}
                  className="w-full h-full rounded no-scrollbar"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
                {/* Overlays para cubrir scrollbars del iframe si aparecen */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-[#1A0B2E]" />
                <div className="pointer-events-none absolute left-0 bottom-0 w-full h-4 bg-[#1A0B2E]" />
              </div>
            </div>
          </div>

          {/* Detalles del examen */}
          <div className="col-span-5 space-y-4">
            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Detalles del examen</h2>
              <p className="text-sm text-gray-400">Nombre: {exam?.Nombre || "—"}</p>
              <p className="text-sm text-gray-400">Preguntas: {total}</p>
              <p className="text-sm text-gray-400">Correctas: {correctas}</p>
            </div>
            <div className="bg-[#1A0B2E] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Instrucciones</h2>
              <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                <li>Responde seleccionando una opción en cada pregunta.</li>
                <li>Para la pregunta de flag, escribe el valor encontrado en la terminal y presiona Verificar.</li>
                <li>Las preguntas se bloquearán automáticamente al acertar.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preguntas dinámicas */}
        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7 space-y-4">
            {!loading && !error && exam?.Preguntas.map((q, idx) => {
              const isFlag = !q.Opciones || q.Opciones.length === 0;
              const st = answers[idx];
              const locked = !!st?.locked;
              const isCorrect = !!st?.correct;
              const showStatus = verified;
              const borderClass = showStatus ? (isCorrect ? "border-emerald-500/40" : "border-red-500/40") : "border-[#6B64F2]";
              return (
                <div key={idx} className={`bg-[#1A0B2E] rounded-lg p-4 shadow-lg border ${borderClass}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold">{q.Pregunta}</h2>
                    {showStatus && (
                      isCorrect ? (
                        <span className="text-emerald-300 text-xs bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-0.5">Correcto</span>
                      ) : (
                        <span className="text-red-300 text-xs bg-red-500/10 border border-red-500/30 rounded px-2 py-0.5">Incorrecto</span>
                      )
                    )}
                  </div>

                  {isFlag ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={st?.value || ""}
                        onChange={(e) => handleFlagChange(idx, e.target.value)}
                        disabled={locked || verified}
                        placeholder="Ingresa la flag encontrada en la terminal"
                        className="flex-1 p-2 rounded bg-[#312E81] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2] disabled:opacity-70"
                      />
                      <button
                        onClick={() => verificarFlag(idx)}
                        disabled={verified || !st?.value}
                        className={`px-4 py-2 rounded-lg ${verified ? "bg-gray-600" : "bg-gradient-to-l from-[#02CCA3] to-[#6366F1] hover:brightness-110"}`}
                      >
                        {verified ? "Verificado" : "Verificar"}
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-2 mt-2">
                      {q.Opciones.map((op) => {
                        const checked = st?.value === op;
                        const correct = op === q.Respuesta;
                        const bgClass = showStatus && correct
                          ? "bg-emerald-500/10"
                          : showStatus && checked && !correct
                            ? "bg-red-500/10"
                            : checked
                              ? "bg-white/10"
                              : "bg-white/5";
                        return (
                          <li
                            key={op}
                            className={`flex items-center justify-between rounded px-3 py-2 ${bgClass} ${(locked || verified) ? "cursor-default" : "cursor-pointer hover:bg-white/10"}`}
                            onClick={() => handleSelect(idx, op)}
                            onKeyDown={(e) => {
                              if ((e.key === "Enter" || e.key === " ") && !(locked || verified)) {
                                e.preventDefault();
                                handleSelect(idx, op);
                              }
                            }}
                            role="radio"
                            aria-checked={checked}
                            aria-disabled={locked || verified}
                            tabIndex={(locked || verified) ? -1 : 0}
                          >
                            <span className="text-sm text-[#D1D5DB] pr-4 flex items-center gap-2">
                              {checked && !showStatus && (
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#6B64F2]/30 text-white/90">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                              {op}
                            </span>
                            <input
                              type="radio"
                              name={`q-${idx}`}
                              checked={checked}
                              onChange={() => handleSelect(idx, op)}
                              disabled={locked || verified}
                              className="form-radio"
                              style={{ accentColor: locked ? (correct ? "#10B981" : "#6B7280") : "#6B64F2" }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Reglas globales para ocultar scrollbars donde sea posible */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}