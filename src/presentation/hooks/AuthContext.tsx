"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Usuario } from "@/domain/entities/user";
import { getProfile } from "@/infrastructure/api/authService";
import { setAuthToken } from "@/shared/utils/api";

type AuthState = {
  user: Usuario | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type RawUsuario = Partial<{
    Id: string; id: string;
    Nombre: string; nombre: string;
    Correo: string; correo: string;
    Avatar: string; avatar: string;
    Estado: boolean; estado: boolean;
    FechaRegistro: string | Date;
  }>;

  const mapUser = useCallback((u: RawUsuario): Usuario => ({
    id: u?.Id ?? u?.id ?? "",
    nombre: u?.Nombre ?? u?.nombre,
    correo: u?.Correo ?? u?.correo,
    avatar: u?.Avatar ?? u?.avatar,
    contrasena: undefined,
    estado: (u?.Estado ?? u?.estado) ?? true,
    fechaRegistro: u?.FechaRegistro ? new Date(u.FechaRegistro) : new Date(),
  }), []);

  const refreshProfile = useCallback(async () => {
    const token = (typeof window !== "undefined") ? (localStorage.getItem("token") || sessionStorage.getItem("token")) : null;
    if (!token) {
      // Sin token: limpiar estado y finalizar carga para que los guards puedan actuar
      setAuthToken(null);
      setUser(null);
      setError(null);
      setLoading(false);
      return;
    }
    try {
      setError(null);
      setLoading(true);
      setAuthToken(token);
      const u = await getProfile(token);
      setUser(mapUser(u));
    } catch (e) {
      const err = e as Error;
      setError(err.message || "No se pudo cargar el perfil");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [mapUser]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    } catch {}
    setAuthToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ user, loading, error, refreshProfile, logout }), [user, loading, error, refreshProfile, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
