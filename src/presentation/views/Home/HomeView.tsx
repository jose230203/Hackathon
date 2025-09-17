import FeaturedSection from "@/presentation/components/Home/FeaturedSection";
import { Usuario } from "@/domain/entities/user";
import NavBarLogued from "@/presentation/components/Home/NavBarLogued";

const usuario: Usuario = {
  id: "123",
  nombre: "John Doe",
  correo: "john.doe@example.com",
  avatar: "/itachi.png",
  contrasena: "password123",
  estado: true,
  fechaRegistro: new Date(),
};

export default function HomeView() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-[#0F0B1A] via-[#1A0B2E] to-[#2D1B69] text-white relative">
      {/* Navbar para usuarios logueados */}
      <header className="  pb-4">
        <NavBarLogued usuario={usuario} />
      </header>

      {/* Texto principal */}
      <div className="mb-12 relative">
        <h1 className="font-['suez-one'] text-5xl font-black mb-4">
          Bienvenido {usuario.nombre}
        </h1>
        <p className="font-['suez-one'] font-black text-2xl text-gray-300">
          Accede al multiverso de Nicode y desarróllate como profesional de la
          ciberseguridad.
        </p>
        <button className="absolute top-10 right-10 bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] text-white py-2 px-4 rounded-lg hover:opacity-90">
          inicio &rarr;
        </button>
      </div>

      {/* Featured Section */}
      <FeaturedSection />
    </section>
  );
}