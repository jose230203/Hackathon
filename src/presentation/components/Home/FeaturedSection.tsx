import React from 'react';

export default function FeaturedSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
      {/* Academia */}
      <div className="bg-[#241A49] rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Academia</h2>
        <p className="text-gray-300 mb-4">
          Explora nuestras plataformas de aprendizaje y cursos para convertirte en un experto en ciberseguridad.
        </p>
        <a
          href="/academia"
          className="bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] text-white py-2 px-4 rounded-lg hover:opacity-90 inline-block"
        >
          Ir a Academia →
        </a>
      </div>

      {/* CTF */}
      <div className="bg-[#241A49] rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">CTF</h2>
        <p className="text-gray-300 mb-4">
          Participa en retos de hacking y pon a prueba tus habilidades en ciberseguridad.
        </p>
        <a
          href="/ctf"
          className="bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] text-white py-2 px-4 rounded-lg hover:opacity-90 inline-block"
        >
          Ir a CTF →
        </a>
      </div>
    </div>
  );
}