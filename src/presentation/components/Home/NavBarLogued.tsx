import React from 'react';
import { Usuario } from '@/domain/entities/user';

interface NavBarLoguedProps {
  usuario: Usuario;
}

export default function NavBarLogued({ usuario }: NavBarLoguedProps) {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-[#54188C] font-['Suez-One'] font-black text-2xl">
      {/* Logo de la página */}
      <div className="flex items-center">
        <img
          src="/Logo.svg" 
          alt="Logo de la página"
          width={60}
          height={50}
          className="mx-4"
        />
      </div>

      {/* Textos de la navbar, botón de notificaciones y foto de perfil */}
      <div className="flex items-center gap-8">
        <nav className="flex gap-8">
          <a href="/home" className="text-gray-300 hover:text-white">
            Inicio
          </a>
          <a href="/ctf" className="text-gray-300 hover:text-white">
            CTF
          </a>
          <a href="/academia" className="text-gray-300 hover:text-white">
            Academia
          </a>
          <a href="/mejora" className="text-green-400 hover:text-white">
            Mejora
          </a>
        </nav>
        <button className="bg-[#241A49] p-2 rounded-full hover:bg-[#6B64F2]">
          <img
            src="/Logo.svg"
            alt="Logo de la página"
            width={50}
            height={50}
            className="mr-4"
          />
        </div>

        {/* Textos de la navbar, botón de notificaciones y foto de perfil */}
        <div className="flex items-center gap-8 text-xl">
          <nav className="flex gap-8">
            <a href="/home" className="text-gray-300 hover:text-white">
              Inicio
            </a>
            <a href="/ctf" className="text-gray-300 hover:text-white">
              CTF
            </a>
            <a href="/academia" className="text-gray-300 hover:text-white">
              Academia
            </a>
            <a href="/mejora" className="text-green-400 hover:text-white">
              Mejora
            </a>
          </nav>
          <button className="bg-[#241A49] p-2 rounded-full hover:bg-[#6B64F2]">
            <img
              src="/Notification.svg"
              alt="Botón de notificaciones"
              width={20}
              height={20}
            />
          </button>
          <img
            src={usuario.avatar}
            alt={usuario.nombre}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </header>
    </div>
  );
}