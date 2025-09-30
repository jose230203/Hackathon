"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createCertificateByCursoId } from "@/infrastructure/api/certificateService";
import { CheckCircle2, Download, Loader2 } from "lucide-react";

type Props = { cursoId?: string };

const CourseCertificate: React.FC<Props> = ({ cursoId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showDownload, setShowDownload] = useState(false);

  const onGenerate = async () => {
    if (!cursoId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await createCertificateByCursoId(cursoId);
      if (res?.success && res.filePath) {
        setFileUrl(res.filePath);
        setFileName(res.fileName || null);
      } else {
        setError(res?.error || "No se pudo generar el certificado");
      }
    } catch (e) {
      const err = e as Error;
      setError(err.message || "No se pudo generar el certificado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Activa animación de aparición cuando ya hay URL
    if (fileUrl) {
      const t = setTimeout(() => setShowDownload(true), 10);
      return () => clearTimeout(t);
    } else {
      setShowDownload(false);
    }
  }, [fileUrl]);

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="bg-[#0BFFB7]/10 text-[#0BFFB7] px-4 py-1 rounded-full font-semibold">Certificado digital</span>
      <p className="text-white/80 text-sm">
        ¡Comparte tus logros con un certificado!
        <br />
        Cuando termines el curso tendrás acceso al certificado digital para compartirlo con tu familia, amigos, empleadores y la comunidad.
      </p>
      <div className="relative w-64 h-40 mt-2">
        <Image src="/Academia.png" alt="Certificado" fill className="object-cover rounded-lg" priority />
      </div>

      {/* Acciones */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          disabled={!cursoId || loading}
          onClick={onGenerate}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : fileUrl
                ? "bg-[#1F2937] hover:bg-[#374151] border border-white/10"
                : "bg-gradient-to-r from-[#A855F7] to-[#6366F1] hover:opacity-95 shadow-lg shadow-[#6366F1]/20"}
          `}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generando…
            </>
          ) : fileUrl ? (
            <>Regenerar certificado</>
          ) : (
            <>Generar certificado</>
          )}
        </button>

        {fileUrl && (
          <div
            className={`transition-all duration-300 ${showDownload ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"}`}
          >
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-emerald-500/15 text-emerald-300 border border-emerald-400/30
                         hover:bg-emerald-500/25 hover:text-emerald-200
                         ring-1 ring-emerald-400/20 shadow-md"
            >
              <Download className="h-4 w-4" />
              <span className="font-medium">Ver/Descargar</span>
              {fileName && (
                <span className="max-w-[220px] truncate text-emerald-200/80" title={fileName}>
                  ({fileName})
                </span>
              )}
            </a>
            <div className="mt-1 flex items-center gap-1 text-emerald-300/80 text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Tu certificado está listo</span>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded px-3 py-2 mt-2">{error}</p>
      )}
    </div>
  );
};

export default CourseCertificate;
