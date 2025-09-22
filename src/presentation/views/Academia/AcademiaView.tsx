import React from "react";
import AcademiaHeader from "../../components/Academia/AcademiaHeader";
import CursosGrid from "../../components/Academia/CursosGrid";
import ProgressCard from "../../components/Academia/ProgressCard";
import ChatCard from "../../components/Academia/ChatCard";
import NavBarLogued from "../../components/Home/NavBarLogued";

const usuarioDemo = {
  id: "1",
  nombre: "Carlos",
  correo: "carlos@email.com",
  avatar: "/itachi.png",
  contrasena: "",
  estado: true,
  fechaRegistro: new Date(),
};

const AcademiaView: React.FC = () => (
  <div className="min-h-screen p-8 bg-gradient-to-l from-[#2D1B69] via-[#1A0B2E] to-[#0F0B1A]">
    <div className="max-w-7xl mx-auto">
      <NavBarLogued usuario={usuarioDemo} />
      <AcademiaHeader />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <CursosGrid />
        </div>
        <div className="w-full md:w-[400px] flex flex-col justify-center">
          <ChatCard />
        </div>
      </div>
    </div>
  </div>
);

export default AcademiaView;
