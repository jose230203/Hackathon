import React from 'react';
import RegisterForm from '@/presentation/components/Register/RegisterForm';
import Image from 'next/image';

export default function RegisterView() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      {/* Imagen */}
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Únete a Esto</h1>
        <p className="text-lg text-gray-300 mb-8">Explora un universo de desafíos con nosotros.</p>
        <Image src="/RegisterBallena.png" alt="Ballena" width={600} height={600} className="object-contain" />
        <h2 className="text-2xl font-semibold mt-8">¡Comienza tu viaje!</h2>
        <p className="text-gray-300">Descubre nuevos horizontes y alcanza las estrellas</p>
      </div>

      {/* Formulario */}
      <div className="flex items-center justify-center p-6 w-full max-w-lg ml-20">
        <RegisterForm  />
      </div>
    </section>
  );
}