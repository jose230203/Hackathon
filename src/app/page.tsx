import React from 'react';
import './globals.css';
import CoursePage from './Academy/AcadmyModule/page';
import RegisterPage from './Onboarding/register/page';
import ModuleExamen from './Academy/AcademyExam/Page';
import ForgotPasswordPage from './Onboarding/Forgot/Page';


export default function Home() {
  return (
    <main className="grid grid-cols-12 w-full min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white">
      <div className="col-span-12">
        <RegisterPage />
      </div>
    </main>
  );
}