import React from "react";
import AcademiaHeader from "../../components/Academia/AcademiaHeader";
import CursosGrid from "../../components/Academia/CursosGrid";
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
    <NavBarLogued usuario={usuarioDemo} />
    <div className="grid grid-cols-12 gap-4 mx-1">
      <div className="col-span-12">
        <AcademiaHeader />
      </div>
      <div className="col-span-8">
        <CursosGrid />
      </div>
      <div className="col-span-4">
        <ChatCard />
      </div>
    </div>
  </div>
);

export default AcademiaView;
