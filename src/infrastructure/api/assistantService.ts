import { api } from "@/shared/utils/api";

export type AssistantStreamChunk =
  | { token: string }
  | { done: true; threadId: string }
  | { error: string };

// Utilidad para consumir SSE desde fetch y propagar callbacks por chunk
export async function streamAssistant(
  url: string,
  body: Record<string, unknown>,
  onChunk: (chunk: AssistantStreamChunk) => void
) {
  // Construir URL base de forma segura
  const base = (api.defaults.baseURL || "").replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;

  // Incluir Authorization si existe
  let auth: string | undefined = (api.defaults.headers?.common as unknown as { Authorization?: string })?.Authorization;
  if (!auth && typeof window !== "undefined") {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) auth = `Bearer ${token}`;
  }

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(auth ? { Authorization: auth } : {}),
    },
    body: JSON.stringify(body),
  });

  // Errores HTTP: intentar parsear JSON
  if (!res.ok) {
    try {
      const text = await res.text();
      try {
        const obj = JSON.parse(text);
        throw new Error(obj?.error || obj?.message || res.statusText);
      } catch {
        throw new Error(text || res.statusText);
      }
    } catch (e) {
      const err = e as Error;
      throw new Error(err.message || res.statusText);
    }
  }

  if (!res.body) throw new Error("No stream body");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    // Procesar eventos completos separados por \n\n según SSE
    let idx;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const eventBlock = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      // Extraer todas las líneas data:
      const dataLines = eventBlock
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.replace(/^data:\s?/, ""));
      if (!dataLines.length) continue;
      const dataText = dataLines.join("\n");
      try {
        const obj = JSON.parse(dataText) as AssistantStreamChunk;
        onChunk(obj);
      } catch {
        // ignorar bloques que no sean JSON
      }
    }
  }
}

export async function messageGeneral(
  payload: { threadId?: string | null; message: string },
  onChunk: (chunk: AssistantStreamChunk) => void
) {
  return streamAssistant("/Asistente/MessageGeneral", payload, onChunk);
}

export async function messageAcademia(
  payload: { threadId?: string | null; academiaId: string; message: string },
  onChunk: (chunk: AssistantStreamChunk) => void
) {
  return streamAssistant("/Asistente/MessageAcademia", payload, onChunk);
}

export async function messageCurso(
  payload: { threadId?: string | null; cursoId: string; message: string },
  onChunk: (chunk: AssistantStreamChunk) => void
) {
  return streamAssistant("/Asistente/MessageCurso", payload, onChunk);
}

export async function generateContentSesionBySesionId(
  payload: { threadId?: string | null; sesionId: string },
  onChunk: (chunk: AssistantStreamChunk) => void
) {
  return streamAssistant("/Asistente/GenerateContentSesionBySesionId", payload, onChunk);
}
