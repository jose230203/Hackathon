"use client";

import { useState } from "react";
import Button from "@/presentation/components/Button";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Planes", href: "#" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
        {/* Logo con SVG */}
        <Link href="/" className=" flex items-center gap-2 text-white z-50">
          <Image src="/Logo.svg" alt="SuidAcademy" width={28} height={28} />
          <span className="text-xl font-bold">SuidAcademy</span>
        </Link>

        {/* Links para Desktop */}
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
          <Button variant="primary">Empieza ya</Button>
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
      </nav>

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
          <Button variant="primary" onClick={toggleMenu}>
            Empieza ya
          </Button>
        </div>
      </div>
    </header>
  );
}