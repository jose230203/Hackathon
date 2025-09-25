"use client";
import React, { useState } from 'react';
import Button from '@/presentation/components/Button';
import Link from 'next/link';
import { loginUser } from '@/infrastructure/api/authService';
import { setAuthToken } from '@/shared/utils/api';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        // Persistencia condicional según 'Recuérdame'
        try {
          if (remember) {
            localStorage.setItem("token", res.token);
            sessionStorage.removeItem("token");
          } else {
            sessionStorage.setItem("token", res.token);
            localStorage.removeItem("token");
          }
        } catch {}
        // Configurar interceptor con el token actual
        setAuthToken(res.token);
        router.push('/home');
        return;
      }
      // Si no hubo token, considerar credenciales inválidas
      setError("Problema con el correo o contraseña");
    } catch (err: any) {
      setError("Problema con el correo o contraseña");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="bg-[#241A49] rounded-lg p-8 shadow-lg w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email o Número de teléfono
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="********"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="form-checkbox text-[#6B64F2]"
          />
          <span className="ml-2 text-sm">Recuérdame</span>
        </label>
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <Button variant="primary" className="w-full">
        {loading ? "Ingresando…" : "Inicia Sesión 🚀"}
      </Button>

      <p className="text-center text-sm text-gray-300 mt-4">
        Nuevo en la plataforma? <Link href="/Onboarding/register" className="text-[#6B64F2] hover:underline">Regístrate</Link>
      </p>
      <p className="text-center text-sm text-gray-300 mt-2">
        Olvidaste tu contraseña? <Link href="/Onboarding/Forgot" className="text-[#6B64F2] hover:underline">Recuperar</Link>
      </p>
    </form>
  );
}