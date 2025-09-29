import Button from "@/presentation/components/Button";

export default function StartNowSection() {
  
  return (
    <section className="bg-[#241A49] rounded-lg max-w-7xl mx-auto px-6 pt-40 text-center mt-4">
      <h2 className="font-['suez-one'] text-5xl font-bold text-white mb-6">
        ¿Listo para el desafío?
      </h2>
      <p className="font-['orbitron'] text-lg text-gray-300 mb-10">
        Mantente al día con lo último de la ciberseguridad, actualizaciones de nuestra plataforma <br />
        y artículos de nuestros expertos.
      </p>
      <Button variant="primary" className="mx-auto"

      >
        Empieza ya 🚀
      </Button>
    </section>
  );
}