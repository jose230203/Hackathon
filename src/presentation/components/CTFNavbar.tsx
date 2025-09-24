import React from "react";

const CTFNavbar: React.FC = () => {
  return (
    <nav className="bg-[#0F0B1A] text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">CTF Challenges</div>

      {/* Links */}
      <div className="flex space-x-4">
        <a href="/ctf/dashboard" className="hover:text-gray-400">Dashboard</a>
        <a href="/ctf/challenges" className="hover:text-gray-400">Challenges</a>
        <a href="/ctf/leaderboard" className="hover:text-gray-400">Leaderboard</a>
        <a href="/ctf/profile" className="hover:text-gray-400">Profile</a>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar CTF..."
          className="p-2 rounded bg-[#1A0B2E] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6B64F2]"
        />
        <button className="bg-[#6B64F2] px-4 py-2 rounded text-white hover:brightness-125">
          Buscar
        </button>
      </div>

      {/* Dropdown Filters */}
      <div className="flex space-x-4">
        <select className="bg-[#1A0B2E] text-white p-2 rounded border border-gray-600">
          <option>Category</option>
          <option>Web</option>
          <option>Crypto</option>
          <option>Forensics</option>
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
    </nav>
  );
};

export default CTFNavbar;