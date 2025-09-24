import React from "react";
import NavBarLogued from "../../components/Home/NavBarLogued";
import CourseDetailHeader from "../../components/Curso/CourseDetailHeader";
import CourseClassList from "../../components/Curso/CourseClassList";
import CourseCertificate from "../../components/Curso/CourseCertificate";
import CourseActions from "../../components/Curso/CourseActions";
import ChatCard from "../../components/Academia/ChatCard";
import ProgressCard from "../../components/Academia/ProgressCard";

const usuarioDemo = {
  id: "1",
  nombre: "Carlos",
  correo: "carlos@email.com",
  avatar: "/itachi.png",
  contrasena: "",
  estado: true,
  fechaRegistro: new Date(),
};

const clasesDemo = [
  { titulo: "Introducción al curso", duracion: "03:00 minutos", imgSrc: "/Hazagey.jpg" },
  { titulo: "¿Qué es Nmap?", duracion: "04:10 minutos", imgSrc: "/Academia.png" },
  { titulo: "Instalación y primeros pasos", duracion: "06:00 minutos", imgSrc: "/Academia.png" },
  { titulo: "Escaneo de hosts", duracion: "05:30 minutos", imgSrc: "/Academia.png" },
  { titulo: "Detección de servicios y versiones", duracion: "07:15 minutos", imgSrc: "/Academia.png" },
  { titulo: "Escaneo de puertos", duracion: "05:50 minutos", imgSrc: "/Academia.png" },
  { titulo: "Ejemplos prácticos de auditoría", duracion: "08:20 minutos", imgSrc: "/Academia.png" },
];

const CursoDetailView: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-l from-[#2D1B69] via-[#1A0B2E] to-[#0F0B1A]">
   <NavBarLogued usuario={usuarioDemo} />
    <div className="max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1">
          <CourseDetailHeader
            titulo="Introducción a Nmap"
            nivel="Nivel Básico"
            clases={10}
            horasContenido={3}
            horasPractica={5}
            descripcion="Aprende a utilizar Nmap para escanear redes, identificar hosts, servicios y vulnerabilidades. Este módulo te guiará desde los conceptos básicos hasta ejemplos prácticos de uso en auditoría de seguridad. Ideal para quienes inician en ciberseguridad."
          />
          <h3 className="text-xl font-bold text-white mb-2 mt-6">Clases del curso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseClassList clases={clasesDemo.slice(0,3)} />
            <CourseClassList clases={clasesDemo.slice(3,6)} />
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <CourseCertificate />
            <CourseActions />
          </div>
        </div>
        <div className="w-full md:w-96 flex flex-col gap-4">
          <ProgressCard />
          <div className="sticky top-24">
            <ChatCard />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CursoDetailView;
