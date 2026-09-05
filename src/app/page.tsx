import Link from "next/link";
import { Smartphone, MessageCircle, Store, ArrowRight } from "lucide-react";

/* Landing / selector de rol — doc 07, Tarea 0.5.
   Fondo bosque-800, texto crema-200, "Amigos" en Fraunces 40px,
   cards con borde bosque-600 → esmeralda-500 en hover. */

const ROLES = [
  {
    href: "/app/home",
    Icon: Smartphone,
    emoji: "📱",
    title: "App móvil",
    who: "Soy Carlos,",
    role: "el organizador",
    detail: "Convoco al grupo, veo la votación en vivo, reservo y cierro la cuenta.",
    tag: "6 pantallas",
  },
  {
    href: "/whatsapp/chat",
    Icon: MessageCircle,
    emoji: "💬",
    title: "WhatsApp Business",
    who: "Soy Pedro,",
    role: "recibo una invitación",
    detail: "Confirmo, pre-pido y pago sin descargar nada. Todo dentro de WhatsApp.",
    tag: "Flujo completo",
  },
  {
    href: "/venue/dashboard",
    Icon: Store,
    emoji: "🏪",
    title: "La Palomilla",
    who: "Soy el local,",
    role: "panel del negocio",
    detail: "Veo las reservas del día y los pre-pedidos antes de que llegue el grupo.",
    tag: "Escritorio",
  },
];

export default function Landing() {
  return (
    <main className="min-h-dvh bg-bosque-800 px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-bosque-600 bg-bosque-700 px-3.5 py-1.5 t-label-sm uppercase text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-esmeralda-400 animate-pulse-ring" />
          Demo interactiva · Lima &amp; Bogotá
        </span>

        <h1 className="mt-6 t-display-xl text-crema-200">Amigos</h1>
        <p className="mt-2 max-w-md t-body-lg text-[var(--text-secondary)]">
          La app que organiza tu vida social. Del «¿nos juntamos?» al pago final, sin fricción.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {ROLES.map(({ href, Icon, emoji, title, who, role, detail, tag }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-lg border border-bosque-600 bg-bosque-700 p-5 transition-all duration-200 hover:border-esmeralda-500 hover:bg-bosque-700/80"
            >
              <div className="flex items-start justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-md bg-bosque-800 text-lg transition-colors group-hover:bg-esmeralda-500/15"
                  aria-hidden
                >
                  {emoji}
                </span>
                <Icon size={17} className="mt-1 text-[var(--text-secondary)] transition-colors group-hover:text-esmeralda-400" />
              </div>

              <h2 className="mt-4 t-heading-lg text-crema-200">{title}</h2>
              <p className="mt-1 t-body-md text-[var(--text-secondary)]">
                {who}
                <br />
                <span className="text-esmeralda-400">{role}</span>
              </p>
              <p className="mt-3 flex-1 t-body-sm text-[var(--text-secondary)]">{detail}</p>

              <div className="mt-5 flex items-center justify-between border-t border-bosque-600 pt-3">
                <span className="t-label-sm uppercase text-[var(--text-secondary)]">{tag}</span>
                <ArrowRight
                  size={16}
                  className="text-esmeralda-400 transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 flex items-start gap-2 t-body-sm text-[var(--text-secondary)]">
          <span aria-hidden>💡</span>
          Las tres vistas siguen el mismo almuerzo: viernes 26, 12:30, La Palomilla (Miraflores),
          cuatro personas y una cuenta de S/ 196.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 t-body-sm text-[var(--text-secondary)]">
          <Link href="/app/ai-chat" className="hover:text-esmeralda-400">Chat con el agente IA →</Link>
          <Link href="/venue/orders" className="hover:text-esmeralda-400">Cola de pedidos del local →</Link>
          <Link href="/tokens" className="hover:text-esmeralda-400">Sistema de diseño →</Link>
        </div>
      </div>
    </main>
  );
}
