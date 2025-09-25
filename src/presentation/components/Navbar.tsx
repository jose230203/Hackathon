"use client";

import { useState } from "react";
import Button from "@/presentation/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/presentation/hooks/AuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Planes", href: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#0F0B1A] text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo + Marca */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/Logo.svg" alt="Academia Suid" width={32} height={32} className="w-8 h-8" />
        <div className="text-xl font-bold">
          <span>Academia</span>
          <span className="text-[#6B64F2]">Suid</span>
        </div>
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="font-['Suez One'] flex items-center gap-8 text-white font-bold">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hover:text-purple-400 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón para Desktop */}
        <Button
          variant="primary"
          onClick={() => {
            if (user) router.push("/home");
            else router.push("/Onboarding/login");
          }}
        >
          Empieza ya
        </Button>
      </div>

      {/* Botón de Hamburguesa para Mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white focus:outline-none z-50"
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      

      {/* Menú para Mobile */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-md transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ul className="flex flex-col items-center gap-6 text-white text-2xl font-semibold mb-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={toggleMenu}
                  className="hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            onClick={() => {
              toggleMenu();
              if (user) router.push("/home");
              else router.push("/Onboarding/login");
            }}
          >
            Empieza ya
          </Button>
        </div>
      </div>
    </nav>
  );
}