"use client";


import React, { useState } from 'react';
import Button from '@/presentation/components/Button';
import Link from 'next/link';
import { registerUser } from '@/infrastructure/api/authService';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }
    if (contrasena !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await registerUser({ nombre, correo, contrasena });
      setSuccess(true);
      // Redirigir a Login inmediatamente tras registro exitoso
      router.push('/Onboarding/login');
    } catch (err) {
      const e = err as Error;
      setError(e.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
    <form onSubmit={onSubmit} className="bg-[#A855F7]/10 rounded-lg p-8 shadow-lg w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="username">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 rounded-xl bg-[#1A0B2E] text-white border border-white/20 focus:outline-none focus:border-[#6B64F2] focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="Tu nombre de usuario"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email 
        </label>
        <input
          type="email"
          id="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 rounded-xl bg-[#1A0B2E] text-white border border-white/20 focus:outline-none focus:border-[#6B64F2] focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full p-2 rounded-xl bg-[#1A0B2E] text-white border border-white/20 focus:outline-none focus:border-[#6B64F2] focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="********"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="confirm-password">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 rounded-xl bg-[#1A0B2E] text-white border border-white/20 focus:outline-none focus:border-[#6B64F2] focus:ring-2 focus:ring-[#6B64F2]"
          placeholder="********"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center select-none">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => {
              if (!e.target.checked) {
                setAcceptedTerms(false);
                return;
              }
              // En lugar de aceptar directamente, abrimos la modal
              setShowTermsModal(true);
            }}
            className="form-checkbox text-[#6B64F2]"
          />
          <span className="ml-2 text-sm">
            Acepto los
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="ml-1 text-[#6B64F2] underline hover:opacity-80"
            >
              términos y condiciones
            </button>
          </span>
        </label>
      </div>

      {error && (
        <p className="text-red-300 text-sm mb-3 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
          {error}
        </p>
      )}
      {success && <p className="text-green-400 text-sm mb-3">Registro exitoso</p>}
      <Button variant="primary" className="w-full text-center" >
        {loading ? "Registrando…" : "Registrarse 🚀"}
      </Button>

      <p className="text-center text-sm text-gray-300 mt-4">
        ¿Ya tienes una cuenta? <Link href="/Onboarding/login" className="text-[#6B64F2] hover:underline">Inicia Sesión</Link>
      </p>
  </form>
  {showTermsModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-[#0F0B1A] border border-white/20 rounded-lg w-full max-w-2xl shadow-xl">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">Términos y Condiciones</h3>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-gray-200">
            <p>
              Bienvenido a nuestra plataforma educativa. Al crear una cuenta, aceptas estos términos. Si no estás de acuerdo, no debes usar el servicio.
            </p>
            <h4 className="font-semibold text-white">1. Cuenta y seguridad</h4>
            <p>
              Eres responsable de la exactitud de tu información y de mantener segura tu contraseña. Notifícanos cualquier uso no autorizado.
            </p>
            <h4 className="font-semibold text-white">2. Uso aceptable</h4>
            <p>
              No debes intentar vulnerar la seguridad del servicio, interferir con otros usuarios ni usar la plataforma para fines ilícitos.
            </p>
            <h4 className="font-semibold text-white">3. Contenido</h4>
            <p>
              El contenido educativo se ofrece &quot;tal cual&quot; para fines formativos. No garantizamos la disponibilidad ininterrumpida del servicio.
            </p>
            <h4 className="font-semibold text-white">4. Privacidad</h4>
            <p>
              Tratamos tus datos conforme a nuestra política de privacidad. Sólo solicitamos datos necesarios para operar el servicio.
            </p>
            <h4 className="font-semibold text-white">5. Pagos (si aplican)</h4>
            <p>
              Algunos cursos o funciones pueden ser de pago. Se informará el precio, impuestos y condiciones antes de contratar.
            </p>
            <h4 className="font-semibold text-white">6. Suspensión</h4>
            <p>
              Podemos suspender cuentas que incumplan estos términos o representen riesgo para la plataforma o terceros.
            </p>
            <h4 className="font-semibold text-white">7. Cambios</h4>
            <p>
              Podemos actualizar estos términos. Si el cambio es relevante, te lo notificaremos por medios razonables.
            </p>
          </div>
          <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowTermsModal(false);
                setAcceptedTerms(false);
              }}
              className="px-4 py-2 rounded bg-[#1A0B2E] text-gray-200 hover:bg-[#241A49]"
            >
              No acepto
            </button>
            <button
              type="button"
              onClick={() => {
                setAcceptedTerms(true);
                setShowTermsModal(false);
              }}
              className="px-4 py-2 rounded bg-[#6B64F2] text-white hover:opacity-90"
            >
              Acepto
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}