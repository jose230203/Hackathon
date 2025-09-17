import Link from "next/link";
import { Facebook, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-gray-300">
        {/* Logo / descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Suid<span className="text-purple-500">Academy</span>
          </h2>
          <p className="text-sm max-w-xs">
            Plataforma de retos CTF, laboratorios virtuales y aprendizaje de hacking ético en un entorno seguro.
          </p>
        </div>
        
        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-purple-400 font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-400 text-lg">Soporte</Link></li>
            <li><Link href="#" className="hover:text-purple-400 text-lg">Términos</Link></li>
            <li><Link href="#" className="hover:text-purple-400 text-lg">Privacidad</Link></li>
          </ul>
        </div>

        {/* Navegación rápida */}
        <div>
          <h3 className="text-purple-400 font-semibold mb-4">Recursos</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-400 text-lg">Inicio</Link></li>
            <li><Link href="#" className="hover:text-purple-400 text-lg">Planes</Link></li>
            <li><Link href="#" className="hover:text-purple-400 text-lg">FAQ</Link></li>
            <li><Link href="#" className="hover:text-purple-400 text-lg">Blog</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-end">
          <h3 className="text-purple-400 font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-2">
            <Link href="#"><Facebook className="w-6 h-6 hover:text-purple-400" /></Link>
            <Link href="#"><Twitter className="w-6 h-6 hover:text-purple-400" /></Link>
            <Link href="#"><Github className="w-6 h-6 hover:text-purple-400" /></Link>
            <Link href="#"><Instagram className="w-6 h-6 hover:text-purple-400" /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm border-t border-white/10 py-6">
        © {new Date().getFullYear()} SuidAcademy. Todos los derechos reservados.
      </div>
    </footer>
  );
}