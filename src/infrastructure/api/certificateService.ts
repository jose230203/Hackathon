import { api } from "@/shared/utils/api";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

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
  } catch (e: unknown) {
    // Adjuntar detalle rico (URL completa, status, body)
    throw buildDetailedAxiosError(e, "POST", url, { cursoId });
  }
}

type BackendCertificateResponse = {
  success?: boolean;
  filePath?: string;
  fileName?: string;
  error?: string | Record<string, unknown>;
} | unknown;

function normalizeCertificateResult(raw: BackendCertificateResponse): CertificateResult {
  // Intentar normalizar estructura esperada desde backend
  const obj = (raw && typeof raw === "object") ? (raw as Record<string, unknown>) : {};
  const success = typeof obj["success"] === "boolean" ? (obj["success"] as boolean) : null;
  const filePath = typeof obj["filePath"] === "string" ? (obj["filePath"] as string) : "";
  const fileName = typeof obj["fileName"] === "string" ? (obj["fileName"] as string) : "";
  const errVal = obj["error"];
  const error = typeof errVal === "string" ? errVal : undefined;
  return { success, filePath, fileName, error };
}

type StatusError = Error & { status?: number };

function buildDetailedAxiosError(e: unknown, method: string, url: string, ctx?: Record<string, unknown>) {
  try {
    const axiosErr: AxiosError | undefined = isAxiosError(e) ? (e as AxiosError) : undefined;
    const status = axiosErr?.response?.status;
    const statusText = axiosErr?.response?.statusText;
    const data = axiosErr?.response?.data as unknown;
    const base = (api.defaults.baseURL || "").replace(/\/$/, "");
    const fullUrl = `${base}${url.startsWith("/") ? url : `/${url}`}`;
    const bodyText = typeof data === "string" ? data : JSON.stringify(data);

    // Extraer mensaje útil si el backend mandó { error: '...' } o { error: {} }
    let backendMsg = "";
    if (data && typeof data === "object") {
      const errField = (data as Record<string, unknown>)["error"];
      if (typeof errField === "string" && errField.trim()) backendMsg = errField;
      else if (errField && typeof errField === "object" && Object.keys(errField as Record<string, unknown>).length > 0) backendMsg = JSON.stringify(errField);
    }

    const contextText = ctx ? `\nContexto: ${JSON.stringify(ctx)}` : "";
    const hint = status === 400 && !backendMsg
      ? "\nPista: El backend devolvió 400 sin mensaje. Verifica que el cursoId exista y que el entorno tenga credenciales (GITHUB_TOKEN, acceso a Supabase) configuradas."
      : "";

    const detailedMessage = `${method} ${fullUrl} -> ${status ?? ""} ${statusText ?? ""}\nRespuesta: ${backendMsg || bodyText}${contextText}${hint}`;
    const err: StatusError = new Error(detailedMessage) as StatusError;
    err.status = status;
    return err;
  } catch {
    return e;
  }
}
