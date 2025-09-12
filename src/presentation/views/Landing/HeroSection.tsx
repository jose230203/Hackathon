import Button from "../../components/Button";
import { Rocket } from "lucide-react"; 

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-white leading-tight">
          Explora Galaxias Virtuales. <br />
          Protege Sistemas. <br />
          Aprende Hackeando.
        </h1>

        <p className="text-gray-300 max-w-xl">
          Sumérgete en el universo del hacking ético. Resuelve retos CTF,
          practica en laboratorios virtuales y domina la ciberseguridad mientras
          exploras galaxias digitales llenas de desafíos.
        </p>

        <div className="flex gap-4">
          <Button variant="primary">
            Empieza ya <Rocket size={16} />
          </Button>
          <Button variant="secondary">Leer más</Button>
        </div>
      </div>
    </section>
  );
}
