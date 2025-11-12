"use client";
import React, { useEffect, useMemo, useState } from "react";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";
import { useParams, useRouter } from "next/navigation";
import { getListSesionCursoByCursoId } from "@/infrastructure/api/academyService";
import { generateContentSesionBySesionId, type AssistantStreamChunk } from "@/infrastructure/api/assistantService";
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
  // Convertir <br> en saltos de línea
  t = t.replace(/<br\s*\/?>(\s*)/gi, "\n");
  // Convertir <img ...> a sintaxis Markdown ![alt](src)
  // Primero con alt explícito
  t = t.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']+)["'][^>]*>/gi, "![$1]($2)");
  t = t.replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "![$2]($1)");
  // Luego sin alt
  t = t.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, "![]($1)");
  // Asegurar encabezados al inicio de línea
  t = t.replace(/\s+#####\s*/g, "\n\n##### ");
  t = t.replace(/\s+####\s*/g, "\n\n#### ");
  t = t.replace(/\s+###\s*/g, "\n\n### ");
  t = t.replace(/\s+##\s*/g, "\n\n## ");
  t = t.replace(/\s+#\s*/g, "\n\n# ");
  // Nota: No tocamos guiones/"---" para no romper tablas GFM
  return t.trim();
}

export default function CursoSesionView() {
  const params = useParams<{ id: string; sesionId: string }>();
  const router = useRouter();
  const cursoId = useMemo(() => params?.id as string, [params]);
  const sesionId = useMemo(() => params?.sesionId as string, [params]);

  const [contenido, setContenido] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sesionesOrden, setSesionesOrden] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!cursoId) return;
        const sesiones = await getListSesionCursoByCursoId(cursoId);
        if (!mounted) return;
        setSesionesOrden(sesiones.map((s) => s.id));
      } catch {
        // silenciar errores no críticos de carga de sesiones
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cursoId]);

  // Cargar el contenido markdown de la sesión con streaming incremental
  useEffect(() => {
    let mounted = true;
    let buffer = "";
    (async () => {
      if (!sesionId) return;
      try {
        setLoading(true);
        setError(null);
        await generateContentSesionBySesionId({ sesionId }, (chunk: AssistantStreamChunk) => {
          if (!mounted) return;
          if ("token" in chunk) {
            buffer += chunk.token || "";
            const normalizedPartial = normalizeMarkdown(buffer);
            setContenido(normalizedPartial);
          } else if ("done" in chunk) {
            // opcional: podríamos guardar threadId si fuera útil
            setLoading(false);
          } else if ("error" in chunk) {
            setError(chunk.error);
            setLoading(false);
          }
        });
        if (mounted) setLoading(false);
      } catch (e) {
        const err = e as Error;
        setError(err.message || "No se pudo cargar el contenido de la sesión");
      } finally {
        // el estado loading se maneja también al recibir done/error
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
          <div className="rounded-lg p-6 min-h-[400px]">
            {loading && !contenido && <p className="text-gray-300">Cargando contenido…</p>}
            {error && <p className="text-red-400">{error}</p>}
            {contenido && (
              <article className="max-w-none text-gray-200 leading-7 space-y-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-3xl font-bold mt-2 mb-4" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
                    ),
                    p: ({ ...props }) => <p className="mb-3" {...props} />,
                    ul: ({ ...props }) => (
                      <ul className="list-disc pl-6 space-y-1" {...props} />
                    ),
                    ol: ({ ...props }) => (
                      <ol className="list-decimal pl-6 space-y-1" {...props} />
                    ),
                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                    table: ({ ...props }) => (
                      <div className="w-full overflow-x-auto my-4">
                        <table className="min-w-full border border-white/10 text-sm" {...props} />
                      </div>
                    ),
                    thead: ({ ...props }) => (
                      <thead className="bg-white/5" {...props} />
                    ),
                    tbody: ({ ...props }) => <tbody {...props} />,
                    tr: ({ ...props }) => (
                      <tr className="border-b border-white/10" {...props} />
                    ),
                    th: ({ ...props }) => (
                      <th className="px-3 py-2 text-left font-semibold" {...props} />
                    ),
                    td: ({ ...props }) => (
                      <td className="px-3 py-2 align-top" {...props} />
                    ),
                    img: ({ alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { node?: unknown }) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        alt={typeof alt === "string" ? alt : ""}
                        className="inline-block max-w-full h-auto align-middle rounded"
                        {...rest}
                      />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-4 border-purple-400/60 pl-4 italic text-gray-300" {...props} />
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className && !String(children).includes("\n");
                      return isInline ? (
                        <code className="bg-black/30 px-1.5 py-0.5 rounded text-purple-200">{children}</code>
                      ) : (
                        <pre className="bg-black/30 p-3 rounded overflow-x-auto">
                          <code className={className ?? ""}>{children}</code>
                        </pre>
                      );
                    },
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
          
          <ChatbotPanel botName="SuidBot" sesionId={sesionId || undefined} />
        </aside>
      </div>
    </section>
  );
}
