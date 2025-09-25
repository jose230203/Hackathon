import { api, API_URL } from "@/shared/utils/api";
import mock from "./mockData/ctf.json";

export type Challenge = {
  id: string;
  titulo: string;
  categoria: string;
  dificultad: "Easy" | "Medium" | "Hard";
  completados: number;
  avatar?: string;
  resumen?: string;
};

export async function fetchChallenges(): Promise<Challenge[]> {
  if (!API_URL) {
    return mock as Challenge[];
  }
  const { data } = await api.get("/ctf/challenges");
  return data as Challenge[];
}

export async function fetchChallengeById(id: string): Promise<Challenge> {
  if (!API_URL) {
    return (mock as Challenge[]).find((c) => c.id === id) || (mock as Challenge[])[0];
  }
  const { data } = await api.get(`/ctf/challenges/${id}`);
  return data as Challenge;
}

export async function startVm(id: string): Promise<{ status: string }> {
  const { data } = await api.post(`/ctf/challenges/${id}/vm/start`);
  return data;
}

export async function stopVm(id: string): Promise<{ status: string }> {
  const { data } = await api.post(`/ctf/challenges/${id}/vm/stop`);
  return data;
}

export async function submitFlags(id: string, payload: { userFlag?: string; rootFlag?: string }) {
  const { data } = await api.post(`/ctf/challenges/${id}/flags`, payload);
  return data;
}
