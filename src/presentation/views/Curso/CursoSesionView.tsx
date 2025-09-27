"use client";
import React, { useEffect, useMemo, useState } from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getListSesionCursoByCursoId } from "@/infrastructure/api/academyService";
import { generateContentSesionMarkdown } from "@/infrastructure/api/assistantService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatbotPanel from "@/presentation/components/Home/ChatbotPanel";

function normalizeMarkdown(s: string): string {
  if (!s) return s;
  let t = s;
  // Convertir secuencias escapadas a saltos reales
  t = t.replace(/\\n/g, "\n");
  // Normalizar CRLF a LF
  t = t.replace(/\r\n/g, "\n");
  // Separadores a líneas
  t = t.replace(/\s*---\s*/g, "\n\n");
  // Asegurar encabezados al inicio de línea
  t = t.replace(/\s+#####\s*/g, "\n\n##### ");
  t = t.replace(/\s+####\s*/g, "\n\n#### ");
  t = t.replace(/\s+###\s*/g, "\n\n### ");
  t = t.replace(/\s+##\s*/g, "\n\n## ");
  t = t.replace(/\s+#\s*/g, "\n\n# ");
  // Viñetas: forzar salto antes de "- " si no hay
  t = t.replace(/([^\n])\s+-\s/g, "$1\n- ");
  return t.trim();
}

export default function CursoSesionView() {
  const params = useParams<{ id: string; sesionId: string }>();
  const router = useRouter();
  const search = useSearchParams();
  const cursoId = useMemo(() => params?.id as string, [params]);
  const sesionId = useMemo(() => params?.sesionId as string, [params]);

  const [contenido, setContenido] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sesionesOrden, setSesionesOrden] = useState<string[]>([]);

  // Cargar lista de sesiones para saber anterior/siguiente
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!cursoId) return;
        const sesiones = await getListSesionCursoByCursoId(cursoId);
        if (!mounted) return;
        setSesionesOrden(sesiones.map((s) => s.id));
      } catch (e) {
        // opcional
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cursoId]);

  // Cargar el contenido markdown de la sesión
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!sesionId) return;
      try {
        setLoading(true);
        setError(null);
  const md = await generateContentSesionMarkdown(sesionId);
        if (!mounted) return;
  const normalized = normalizeMarkdown(md || "");
  setContenido(normalized || "# Sesión\nContenido no disponible");
      } catch (e) {
        const err = e as Error;
        setError(err.message || "No se pudo cargar el contenido de la sesión");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [sesionId]);

  const idxActual = useMemo(() => sesionesOrden.findIndex((s) => s === sesionId), [sesionesOrden, sesionId]);
  const prevId = idxActual > 0 ? sesionesOrden[idxActual - 1] : null;
  const nextId = idxActual >= 0 && idxActual < sesionesOrden.length - 1 ? sesionesOrden[idxActual + 1] : null;

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      <NavBarLogued />

      <div className="mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Main content */}
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-3xl font-bold mb-4">Contenido de la sesión</h1>
          <div className="bg-[#1A142B] rounded-lg p-6 min-h-[400px]">
            {loading && <p className="text-gray-300">Cargando contenido…</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && !error && (
              <article className="max-w-none text-gray-200 leading-7 space-y-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl font-bold mt-2 mb-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="mb-3" {...props} />,
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 space-y-1" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 space-y-1" {...props} />
                    ),
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-purple-400/60 pl-4 italic text-gray-300" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) => (
                      inline ? (
                        <code className="bg-black/30 px-1.5 py-0.5 rounded text-purple-200" {...props}>{children}</code>
                      ) : (
                        <pre className="bg-black/30 p-3 rounded overflow-x-auto" {...props}>
                          <code>{children}</code>
                        </pre>
                      )
                    ),
                    hr: () => <hr className="border-t border-white/10 my-6" />,
                  }}
                >
                  {contenido}
                </ReactMarkdown>
              </article>
            )}
          </div>

          {/* Navegación */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              disabled={!prevId}
              onClick={() => prevId && router.push(`/curso/${cursoId}/sesion/${prevId}`)}
              className={`px-6 py-2 rounded-lg ${prevId ? "bg-[#10B981]" : "bg-gray-600 cursor-not-allowed"} text-white font-semibold`}
            >
              Clase anterior
            </button>
            <button
              disabled={!nextId}
              onClick={() => nextId && router.push(`/curso/${cursoId}/sesion/${nextId}`)}
              className={`px-6 py-2 rounded-lg ${nextId ? "bg-[#10B981]" : "bg-gray-600 cursor-not-allowed"} text-white font-semibold`}
            >
              Siguiente clase
            </button>
          </div>
        </div>

        {/* Sidebar derecha */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-[#1A142B] rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">Progreso actual</h2>
            <p className="text-sm text-gray-300">Progreso ctf</p>
            <div className="w-full bg-[#2D1B69] rounded-full h-2">
              <div className="bg-[#7C3AED] h-2 rounded-full" style={{ width: "80%" }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">Siguiente nivel 90%</p>
          </div>

          <ChatbotPanel botName="SuidBot" />
        </aside>
      </div>
    </section>
  );
}
