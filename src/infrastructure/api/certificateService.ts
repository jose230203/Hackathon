import { api } from "@/shared/utils/api";

export type CertificateResult = {
  success: boolean | null;
  filePath: string;
  fileName: string;
  error?: string;
};

/**
 * Genera un certificado usando EXCLUSIVAMENTE el controller documentado:
 *   POST /Academia/generateCertificate/:cursoId
 * Sin fallbacks. Con diagnóstico detallado.
 */
export async function createCertificateByCursoId(cursoId: string): Promise<CertificateResult> {
  const url = `/Academia/generateCertificate/${encodeURIComponent(cursoId)}`;
  try {
    const { data } = await api.post(url);
    return normalizeCertificateResult(data);
  } catch (e: any) {
    // Adjuntar detalle rico (URL completa, status, body)
    throw buildDetailedAxiosError(e, "POST", url, { cursoId });
  }
}

function normalizeCertificateResult(raw: any): CertificateResult {
  // Intentar normalizar estructura esperada desde backend
  const success = raw?.success ?? null;
  const filePath = raw?.filePath ?? "";
  const fileName = raw?.fileName ?? "";
  const error = typeof raw?.error === "string" ? raw.error : undefined;
  return { success, filePath, fileName, error };
}

function buildDetailedAxiosError(e: any, method: string, url: string, ctx?: Record<string, unknown>) {
  try {
    const status = e?.response?.status;
    const statusText = e?.response?.statusText;
    const data = e?.response?.data;
    const base = (api.defaults.baseURL || "").replace(/\/$/, "");
    const fullUrl = `${base}${url.startsWith("/") ? url : `/${url}`}`;
    const bodyText = typeof data === "string" ? data : JSON.stringify(data);

    // Extraer mensaje útil si el backend mandó { error: '...' } o { error: {} }
    let backendMsg = "";
    if (data && typeof data === "object") {
      const err = (data as any).error;
      if (typeof err === "string" && err.trim()) backendMsg = err;
      else if (err && typeof err === "object" && Object.keys(err).length > 0) backendMsg = JSON.stringify(err);
    }

    const contextText = ctx ? `\nContexto: ${JSON.stringify(ctx)}` : "";
    const hint = status === 400 && !backendMsg
      ? "\nPista: El backend devolvió 400 sin mensaje. Verifica que el cursoId exista y que el entorno tenga credenciales (GITHUB_TOKEN, acceso a Supabase) configuradas."
      : "";

    const detailedMessage = `${method} ${fullUrl} -> ${status ?? ""} ${statusText ?? ""}\nRespuesta: ${backendMsg || bodyText}${contextText}${hint}`;
    const err = new Error(detailedMessage);
    (err as any).status = status;
    return err;
  } catch {
    return e;
  }
}
