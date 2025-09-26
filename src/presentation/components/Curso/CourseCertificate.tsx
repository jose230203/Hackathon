import React from "react";
import Image from "next/image";

const CourseCertificate: React.FC = () => (
  <div className="flex flex-col items-start gap-2">
    <span className="bg-[#0BFFB7]/10 text-[#0BFFB7] px-4 py-1 rounded-full font-semibold">Certificado digital</span>
    <p className="text-white/80 text-sm">¡Comparte tus logros con un certificado!<br />Cuando termines el curso tendrás acceso al certificado digital para compartirlo con tu familia, amigos, empleadores y la comunidad.</p>
    <div className="relative w-64 h-40 mt-2">
      <Image src="/Academia.png" alt="Certificado" fill className="object-cover rounded-lg" priority />
    </div>
  </div>
);

export default CourseCertificate;
