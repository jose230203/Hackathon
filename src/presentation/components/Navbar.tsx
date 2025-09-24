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
    <nav className="bg-[#0F0B1A] text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">Hackathon</div>

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

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="p-2 rounded bg-[#1A0B2E] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
        />
        <button className="bg-[#6B64F2] px-4 py-2 rounded text-white hover:brightness-125">
          Buscar
        </button>
      </div>

      {/* Dropdown Filters */}
      <div className="flex space-x-4">
        <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
          <option>Event</option>
          <option>Hackathon</option>
          <option>CTF</option>
        </select>
        <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
          <option>Category</option>
          <option>Web</option>
          <option>Crypto</option>
        </select>
        <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
          <option>Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
          <option>Status</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
      </div>

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
    </nav>
  );
}