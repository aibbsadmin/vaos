"use client";

/* Cierre / Resumen post-reunión. doc 08, §6 Pantalla 08.
   Celebración minimal: confetti geométrico en SVG, sin animación. */
import Link from "next/link";
import { Plus, Copy, Camera, MessageCircle, ArrowRight } from "lucide-react";
import { ScreenHeader, TabBar } from "@/components/app-nav";
import { Button, SectionLabel } from "@/components/ui";
import { activeMeeting, suggestedPost, attendees } from "@/data/mock-data";
import { soles } from "@/lib/utils";

/** Confetti: 4 formas geométricas sueltas, no animado (doc 08). */
function Confetti() {
  return (
    <svg viewBox="0 0 320 90" className="h-[90px] w-full" aria-hidden>
      <rect x="42" y="18" width="13" height="13" rx="2" fill="#F39C12" transform="rotate(24 48 24)" />
      <circle cx="112" cy="14" r="6" fill="#2ECC71" />
      <path d="M196 10l7 12h-14z" fill="#E74C3C" />
      <rect x="256" y="26" width="10" height="20" rx="3" fill="#27AE60" transform="rotate(-18 261 36)" />
      <circle cx="286" cy="12" r="4" fill="#F8C471" />
      <rect x="150" y="46" width="8" height="8" rx="1.5" fill="#F5F0E8" transform="rotate(35 154 50)" />
    </svg>
  );
}

/** Miniatura del álbum — placeholder cálido, sin assets externos. */
function PhotoThumb({ i }: { i: number }) {
  const tones = [
    ["#F39C12", "#7A4A08"], ["#E74C3C", "#7A1F16"],
    ["#D68910", "#5E3506"], ["#F8C471", "#A9701A"],
  ];
  const [a, b] = tones[i % tones.length];
  return (
    <div
      className="h-20 w-20 shrink-0 rounded-md"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    />
  );
}

export default function RecapScreen() {
  const paidAll = attendees.length;

  return (
    <>
      <ScreenHeader title="Resumen" back="/app/meeting/account" />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        {/* Hero de celebración */}
        <section className="text-center animate-rise">
          <Confetti />
          <h1 className="t-display-md text-[var(--text-primary)]">¡Reunión completada!</h1>
          <p className="mt-1 t-body-md text-[var(--text-secondary)]">
            Almuerzo en {activeMeeting.venue.name} · {activeMeeting.dateShort}
          </p>
        </section>

        {/* Resumen de pagos */}
        <div className="mt-6 flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div>
            <div className="t-label-sm uppercase text-[var(--text-secondary)]">Total de la mesa</div>
            <div className="mt-1 t-display-md tabular-nums text-[var(--text-primary)]">
              {soles(activeMeeting.account.total)}
            </div>
          </div>
          <span className="t-heading-sm text-esmeralda-400">
            {paidAll} de {paidAll} pagaron ✅
          </span>
        </div>

        {/* Fotos */}
        <SectionLabel className="mb-2.5 mt-7">Fotos de la reunión</SectionLabel>
        <div className="-mx-5 flex gap-2.5 overflow-x-auto no-scrollbar px-5">
          <button className="grid h-20 w-20 shrink-0 place-items-center rounded-md border border-dashed border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-esmeralda-500 hover:text-esmeralda-400">
            <Plus size={22} />
          </button>
          {[0, 1, 2, 3].map((i) => (
            <PhotoThumb key={i} i={i} />
          ))}
        </div>

        {/* Post sugerido por la IA */}
        <SectionLabel className="mb-2.5 mt-7">Post sugerido</SectionLabel>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <p className="t-body-lg text-[var(--text-primary)]">{suggestedPost.caption}</p>
          <p className="mt-2.5 t-body-sm text-[var(--text-secondary)]">{suggestedPost.credit}</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-default)] py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-bosque-600">
              <Copy size={14} /> Copiar
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-default)] py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-bosque-600">
              <Camera size={14} /> IG
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-default)] py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-bosque-600">
              <MessageCircle size={14} /> WA
            </button>
          </div>
        </div>

        <Link href="/app/meeting/new" className="mt-6 block">
          <Button size="lg" full>
            Proponer la próxima reunión <ArrowRight size={17} />
          </Button>
        </Link>
      </div>

      <TabBar />
    </>
  );
}
