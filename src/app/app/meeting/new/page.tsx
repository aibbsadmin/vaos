"use client";

/* P1.2 — Nueva propuesta de reunión. doc 08, §6 Pantalla 02. */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus, Sparkles, Star, Search } from "lucide-react";
import { ScreenHeader } from "@/components/app-nav";
import { Avatar, Button, SectionLabel } from "@/components/ui";
import { participants, venues } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const ACTIVITIES = ["Almuerzo", "Cena", "After office", "Deporte", "Evento especial"];

const DATES = [
  { id: "d1", label: "Viernes 26", hint: "sugerido", time: "12:30" },
  { id: "d2", label: "Martes 30", hint: "alternativa", time: "13:00" },
];

const VENUE_OPTIONS = [
  { id: "v1", icon: "star" as const, name: "La Palomilla", note: "el de siempre", price: "S/ 35–55" },
  { id: "v2", icon: "star" as const, name: "El Bodegón", note: "hace 3 meses", price: "S/ 45–75" },
  { id: "ai", icon: "ai" as const, name: "Sorpréndeme", note: "sugerencia IA", price: "El agente elige" },
];

export default function NewMeetingScreen() {
  const router = useRouter();
  const [activity, setActivity] = useState("Almuerzo");
  const [dates, setDates] = useState<string[]>(["d1", "d2"]);
  const [venue, setVenue] = useState("v1");
  const [invited, setInvited] = useState<string[]>(["u2", "u3", "u4", "u5"]);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  return (
    <>
      <ScreenHeader title="Nueva reunión" back="/app/home" close="/app/home" />

      <div className="min-h-0 flex-1 space-y-7 overflow-y-auto no-scrollbar px-5 pb-32">
        {/* Tipo de actividad */}
        <section>
          <SectionLabel className="mb-2.5">¿Qué quieres hacer?</SectionLabel>
          <div className="-mx-5 flex gap-2 overflow-x-auto no-scrollbar px-5">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                onClick={() => setActivity(a)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 t-label-lg transition-all",
                  activity === a
                    ? "bg-esmeralda-500 text-white"
                    : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]",
                )}
              >
                {activity === a && "✓ "}
                {a}
              </button>
            ))}
          </div>
        </section>

        {/* Fechas — selección múltiple: son las opciones que el grupo votará */}
        <section>
          <SectionLabel className="mb-2.5">¿Cuándo?</SectionLabel>
          <p className="mb-3 t-body-sm text-[var(--text-secondary)]">
            Elige una o varias — el grupo vota entre las que propongas.
          </p>
          <div className="flex gap-2">
            {DATES.map((d) => {
              const on = dates.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => toggle(dates, setDates, d.id)}
                  className={cn(
                    "flex-1 rounded-md border px-3 py-3 text-left transition-all",
                    on
                      ? "border-esmeralda-500 bg-esmeralda-500/10"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)]",
                  )}
                >
                  <div className={cn("t-heading-sm", on ? "text-esmeralda-400" : "text-[var(--text-primary)]")}>
                    {d.label}
                  </div>
                  <div className="mt-0.5 t-body-sm text-[var(--text-secondary)]">
                    {d.time} · {d.hint}
                  </div>
                </button>
              );
            })}
            <button className="grid w-[52px] shrink-0 place-items-center rounded-md border border-dashed border-[var(--border-default)] text-[var(--text-secondary)] transition-colors hover:border-esmeralda-500 hover:text-esmeralda-400">
              <Plus size={20} />
            </button>
          </div>
        </section>

        {/* Lugar */}
        <section>
          <SectionLabel className="mb-2.5">¿Dónde?</SectionLabel>
          <div className="overflow-hidden rounded-md border border-[var(--border-subtle)]">
            {VENUE_OPTIONS.map((v, i) => {
              const on = venue === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setVenue(v.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3.5 py-3.5 text-left transition-colors",
                    i > 0 && "border-t border-[var(--border-subtle)]",
                    on ? "bg-esmeralda-500/10" : "bg-[var(--bg-surface)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                      on ? "border-esmeralda-500" : "border-[var(--border-default)]",
                    )}
                  >
                    {on && <span className="h-2.5 w-2.5 rounded-full bg-esmeralda-500" />}
                  </span>
                  {v.icon === "ai" ? (
                    <Sparkles size={15} className="shrink-0 text-esmeralda-400" />
                  ) : (
                    <Star size={15} className="shrink-0 fill-ambar-400 stroke-ambar-400" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className={cn("t-heading-sm", v.icon === "ai" ? "text-esmeralda-400" : "text-[var(--text-primary)]")}>
                      {v.name}
                    </div>
                    <div className="t-body-sm text-[var(--text-secondary)]">{v.note}</div>
                  </div>
                  <span className="shrink-0 t-body-sm text-[var(--text-secondary)]">{v.price}</span>
                </button>
              );
            })}
            <button className="flex w-full items-center gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-3.5 text-left text-[var(--text-secondary)] transition-colors hover:text-esmeralda-400">
              <Search size={15} className="ml-[26px] shrink-0" />
              <span className="t-body-md">Buscar otro lugar</span>
            </button>
          </div>
          <p className="mt-2 t-body-sm text-[var(--text-secondary)]">
            {venues.find((v) => v.id === venue)?.address ??
              "El agente concierge propondrá un lugar nuevo según la ocasión y el presupuesto del grupo."}
          </p>
        </section>

        {/* Invitados */}
        <section>
          <SectionLabel className="mb-2.5">¿Quiénes van?</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {participants
              .filter((p) => !p.isMe)
              .map((p) => {
                const on = invited.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(invited, setInvited, p.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 transition-all",
                      on
                        ? "border-esmeralda-500 bg-esmeralda-500/10"
                        : "border-[var(--border-subtle)] bg-[var(--bg-surface)] opacity-60",
                    )}
                  >
                    <Avatar name={p.name} size="sm" />
                    <span className={cn("t-label-lg", on ? "text-esmeralda-400" : "text-[var(--text-primary)]")}>
                      {on && "✓ "}
                      {p.name}
                    </span>
                  </button>
                );
              })}
            <button className="flex items-center gap-1.5 rounded-full border border-dashed border-esmeralda-500/40 px-3.5 py-2 t-label-lg text-esmeralda-400/80 transition-colors hover:border-esmeralda-500 hover:text-esmeralda-400">
              <Plus size={14} /> Agregar
            </button>
          </div>
          <p className="mt-2.5 t-body-sm text-[var(--text-secondary)]">
            Pre-seleccionados: los del último {activity.toLowerCase()} del círculo.
          </p>
        </section>
      </div>

      {/* CTA fijo al bottom */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 px-5 pb-[46px] pt-4 backdrop-blur">
        <Button size="lg" full onClick={() => router.push("/app/meeting/voting")}>
          Enviar propuesta a {invited.length} personas <ArrowRight size={17} />
        </Button>
      </div>
    </>
  );
}
