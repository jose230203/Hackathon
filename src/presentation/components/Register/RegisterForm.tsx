"use client";


import React, { useState } from 'react';
import Button from '@/presentation/components/Button';
import Link from 'next/link';
import { registerUser } from '@/infrastructure/api/authService';

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (contrasena !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await registerUser({ nombre, correo, contrasena });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={onSubmit} className="bg-[#A855F7]/10 rounded-lg p-8 shadow-lg w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="Tu nombre de usuario"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email o Número de teléfono
        </label>
        <input
          type="email"
          id="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
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
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="********"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="confirm-password">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 rounded bg-[#1A0B2E] text-white border border-[#6B64F2] focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="********"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-[#6B64F2]" />
          <span className="ml-2 text-sm">Acepto los términos y condiciones</span>
        </label>
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      {success && <p className="text-green-400 text-sm mb-3">Registro exitoso</p>}
      <Button variant="primary" className="w-full text-center" >
        {loading ? "Registrando…" : "Registrarse 🚀"}
      </Button>

      <p className="text-center text-sm text-gray-300 mt-4">
        ¿Ya tienes una cuenta? <Link href="/Onboarding/login" className="text-[#6B64F2] hover:underline">Inicia Sesión</Link>
      </p>
    </form>
  );
}