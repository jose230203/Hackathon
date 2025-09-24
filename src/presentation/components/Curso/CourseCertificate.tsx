import React from "react";

const CourseCertificate: React.FC = () => (
  <div className="flex flex-col items-start gap-2">
    <span className="bg-[#0BFFB7]/10 text-[#0BFFB7] px-4 py-1 rounded-full font-semibold">Certificado digital</span>
    <p className="text-white/80 text-sm">¡Comparte tus logros con un certificado!<br />Cuando termines el curso tendrás acceso al certificado digital para compartirlo con tu familia, amigos, empleadores y la comunidad.</p>
    <img src="/Academia.png" alt="Certificado" className="w-64 rounded-lg mt-2" />
  </div>
);

export default CourseCertificate;
