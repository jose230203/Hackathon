import Button from "../../components/Button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-20 px-6">
      {/* Texto */}
      <div className="space-y-6 max-w-lg">
        <h1 className="font-['suez-one'] text-5xl font-bold text-white leading-tight">
          Hackea. Aprende. <br />
          Domina.
        </h1>

        <p className="font-['orbitron'] text-lg text-gray-300">
          Sumérgete en el universo del hacking ético. Resuelve retos CTF,
          practica en laboratorios virtuales y domina la ciberseguridad mientras
          exploras galaxias digitales llenas de desafíos.
        </p>

        <Button variant="primary">
          empieza ya 🚀
        </Button>
      </div>

      {/* Imagen */}
      <div className="relative max-w-md  mb-5 ml-30">
        <Image
          src="/Terminal.png"
          alt="Terminal mostrando comandos de hacking"
          width={500}
          height={300}
          className="object-contain rounded-lg shadow-lg border-4 border-purple-900 shadow-purple-500/30"
        />
      </div>
    </section>
  );
}