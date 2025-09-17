import React from 'react';
import { Curso } from '@/domain/entities/Curso';

const cursos: Curso[] = [
  {
    id: '1',
    nombre: 'Curso de Introducción a la Ciberseguridad',
    descripcion: 'Aprende los conceptos básicos de ciberseguridad.',
    avatar: '/path/to/course1.png',
    videoUrl: 'https://example.com/video1',
    academiaId: '1',
    dificultad: 'Novato',
    estado: true,
    fechaRegistro: new Date(),
  },
  {
    id: '2',
    nombre: 'Curso Avanzado de Hacking Ético',
    descripcion: 'Domina técnicas avanzadas de hacking ético.',
    avatar: '/path/to/course2.png',
    videoUrl: 'https://example.com/video2',
    academiaId: '2',
    dificultad: 'Avanzado',
    estado: true,
    fechaRegistro: new Date(),
  },
];

export default function GallerySection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
      {cursos.map((curso) => (
        <div key={curso.id} className="bg-[#241A49] rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{curso.nombre}</h2>
          <p className="text-gray-300 mb-4">{curso.descripcion}</p>
          <img src={curso.avatar} alt={curso.nombre} className="rounded-lg" />
        </div>
      ))}
    </div>
  );
}
