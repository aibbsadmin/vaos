import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display — serif variable con eje óptico (doc 08, §1)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

// Body / UI (doc 08, §2.3)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// mono/sm — números de operación y referencias de pago (doc 08, §2.3)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amigos — La app que organiza tu vida social",
  description:
    "Demo interactiva de Amigos App: del «¿nos juntamos?» al pago final. App móvil, WhatsApp Business y panel del local.",
};

export const viewport: Viewport = {
  themeColor: "#1A2B1E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bosque-900">{children}</body>
    </html>
  );
}
