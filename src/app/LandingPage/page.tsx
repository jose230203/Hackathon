import React from 'react';
import HeroSection from '@/presentation/views/Landing/HeroSection';
import Navbar from '@/presentation/components/Navbar';
import Footer from '@/presentation/components/Footer';
import LearningPathSection from '@/presentation/views/Landing/LearningPathSection';
import NewsSection from '@/presentation/views/Landing/NewsSection';
import StartNowSection from '@/presentation/views/Landing/StartNowSection';

export default function Landing() {
  return (
    <main className="grid grid-cols-12 w-full min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      <div className="col-span-12">
        <Navbar />
      </div>      
      <div className="py-20 col-span-12">
        <HeroSection />
        <LearningPathSection />
        <NewsSection />
        <StartNowSection />
      </div>
      <div className="col-span-12">
        <Footer />
      </div>
    </main>
  );
}