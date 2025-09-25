"use client";

import React from "react";
import { useAuth } from "@/presentation/hooks/AuthContext";

const CTFNavbar: React.FC = () => {
  const { user } = useAuth();
  const avatar = user?.avatar || "/itachi.png";
  return (
    <nav className="text-white flex items-center justify-between">
      {/* Logo and Text */}
      <div className="flex items-center justify-start w-1/3 ml-10 space-x-4">
        <img src="/Logo.svg" alt="Logo" className="h-16 w-16" />
      </div>

      {/* Links */}
      <div className="flex items-center justify-start ml-20 space-x-4 text-3xl w-1/3">
        <a href="/ctf/dashboard" className="hover:text-gray-400">
          Tablero
        </a>
        <a href="/ctf" className="hover:text-gray-400">
          Desafíos
        </a>
        <a href="/ctf/leaderboard" className="hover:text-gray-400">
          Clasificación
        </a>
        <a href="/ctf/profile" className="hover:text-gray-400">
          Perfil
        </a>
      </div>

      {/* User Icon */}
      <div className="flex items-center justify-end w-1/3 mr-10">
        <img src={avatar} alt="Avatar del usuario" className="h-16 w-16 rounded-full" />
      </div>
    </nav>
  );
};

export default CTFNavbar;