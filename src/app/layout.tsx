
import { CartProvider } from "./context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aroma Digital",
  description: "Gestión de productos",
   icons: {
    icon: '/Logo1.svg',
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
