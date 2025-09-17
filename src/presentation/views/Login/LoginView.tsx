import React from 'react';
import LoginForm from '@/presentation/components/Login/LoginForm';
import Image from 'next/image';

export default function LoginView() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      {/* Texto principal */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-l from-[#A604F2] via-[#763AF5] to-[#FFFFFF] text-transparent bg-clip-text">
          Se parte de Esto
        </h1>
        <p className="text-lg text-gray-300">Involúcrate y crea junto a nosotros un universo de desafíos.</p>
      </div>

      {/* Imagen y formulario */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <Image src="/Ballena.png" alt="Ballena" width={400} height={300} className="object-contain mb-4 md:mb-0 md:mr-20" />
        <LoginForm />
      </div>
    </section>
  );
}