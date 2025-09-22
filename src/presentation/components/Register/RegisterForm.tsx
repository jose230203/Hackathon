"use client";


import React from 'react';
import Button from '@/presentation/components/Button';
import Link from 'next/link';

export default function RegisterForm() {
    const handleRegister = () => {
    
    alert('¡Has presionado el botón de registro! 🚀');
  };



  return (
    <form className="bg-[#A855F7]/10 rounded-lg p-8 shadow-lg w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
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

<Button variant="primary" className="w-full text-center" onClick={handleRegister}>
        Registrarse 🚀
      </Button>

      <p className="text-center text-sm text-gray-300 mt-4">
        ¿Ya tienes una cuenta? <Link href="/Onboarding/login" className="text-[#6B64F2] hover:underline">Inicia Sesión</Link>
      </p>
    </form>
  );
}