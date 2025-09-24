import React from 'react';
import ChallengeGrid from '@/presentation/components/ChallengeGrid';
import CTFNavbar from '@/presentation/components/CTFNavbar';

export default function CTFView() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      {/* Navbar */}
      <CTFNavbar />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Desafíos CTF</h1>
        <ChallengeGrid />
      </div>
    </section>
  );
}