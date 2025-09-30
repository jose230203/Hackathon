"use client";
import React, { useState } from "react";
import Image from "next/image";
import { createCertificateByCursoId } from "@/infrastructure/api/certificateService";

type Props = { cursoId?: string };

const CourseCertificate: React.FC<Props> = ({ cursoId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
      <div className="mt-3 flex items-center gap-3">
        <button
          disabled={!cursoId || loading}
          onClick={onGenerate}
          className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-600" : "bg-gradient-to-r from-[#A855F7] to-[#6366F1] hover:opacity-90"}`}
        >
          {loading ? "Generando…" : "Generar certificado"}
        </button>
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#0BFFB7]/20 text-[#0BFFB7] hover:bg-[#0BFFB7]/30"
          >
            Ver/Descargar {fileName ? `(${fileName})` : "PDF"}
          </a>
        )}
      </div>
      {error && (
        <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded px-3 py-2 mt-2">{error}</p>
      )}
    </div>
  );
};

export default CourseCertificate;
