"use client";

import React, { useState } from "react";
import NewsCard from "@/presentation/components/NewsCard";

export default function NewsSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleModalOpen = (modal: string) => {
    setActiveModal(modal);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 className="font-['suez-one'] text-5xl font-bold text-white mb-4">
        Noticia Y Novedades
      </h2>
      <p className="font-['orbitron'] text-lg text-gray-300 mb-20">
        Mantente al dia con lo ultimo de la ciberseguridad, actualizaciones de nuestra plataforma <br />
        y articulos de nuestros expertos
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NewsCard
          title={"Vulnerabilidad Critica Descubierta en Servidor popular"}
          description={"Una nueva vulnerabilidad remota de código ha sido identificada aprende a protegerte"}
          category={"Ciberseguridad"}
          onClick={() => handleModalOpen("news-1")}
        />
        <NewsCard
          title={"Nuevas Actualizaciones de termux y Nuevos laboratorios de ctf"}
          description={"Nuevas actualizaciones de termux y nuevos ctf que esperas para unirte"}
          category={"Plataforma"}
          onClick={() => handleModalOpen("news-2")}
        />
        <NewsCard
          title={"El arte del Phishing: mas alla del correo electronico"}
          description={"Aprende cómo el phishing evoluciona y cómo protegerte de estas amenazas avanzadas"}
          category={"Articulo"}
          onClick={() => handleModalOpen("news-3")}
        />
      </div>
    </section>
  );
}