import type { NextConfig } from "next";
import path from "path";

function buildTerminalTarget(): string | null {
  const raw = (process.env.NEXT_PUBLIC_TERMINAL_URL || "").trim();
  let base = raw;
  if (!base) return null;
  // Añadir protocolo si falta
  if (!/^https?:\/\//i.test(base)) base = `http://${base}`;
  // Si no tiene puerto, usar 8080
  const url = new URL(base);
  if (!url.port) url.port = "8080";
  return url.toString().replace(/\/$/, "");
}

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  turbopack: {
    // Ensure Turbopack treats this folder as the workspace root
    root: path.resolve(__dirname),
  },
  async rewrites() {
    const target = buildTerminalTarget();
    return target
      ? [
          {
            source: "/terminal/:path*",
            destination: `${target}/:path*`,
          },
        ]
      : [];
  },
  async headers() {
    return [
      {
        source: "/terminal/:path*",
        headers: [
          // Sugerencias de caché y seguridad básicas; no remueve cabeceras del origen remoto
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
