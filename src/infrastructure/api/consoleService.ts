import { api } from "@/shared/utils/api";

export interface ExecCommandResponse {
  result: string;
}

export async function execCommand(command: string): Promise<string> {
  const { data } = await api.post<ExecCommandResponse>("/Consola/ExecCommand", { command });
  return data.result;
}
