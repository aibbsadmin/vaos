"use client";

/* P1.1 — Inicio / Feed de círculos. doc 08, §6 Pantalla 01. */
import Link from "next/link";
import { Bell, ChevronRight, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarStack, SectionLabel } from "@/components/ui";
import { ListSection } from "@/components/list-section";
import { TabBar } from "@/components/app-nav";
import { circles } from "@/data/mock-data";

const upcomingMeetings = [
  {
    id: "m1",
    href: "/app/meeting/voting",
    badge: "En votación",
    tone: "voting" as const,
    title: "Almuerzo del viernes",
    subtitle: "La Palomilla · 3 de 4 confirmaron",
    people: ["Carlos", "Ana", "Luis"],
    when: "Viernes 26 · 12:30",
  },
  {
    id: "m2",
    href: "/app/meeting/confirmed",
    badge: "Confirmada",
    tone: "confirmed" as const,
    title: "Desayuno post-gym",
    subtitle: "La Lucha · 3 de 3 confirmaron",
    people: ["Rodrigo", "Valeria", "Sebastián"],
    when: "Sábado 27 · 09:00",
  },
];
import { cn } from "@/lib/utils";

export default function HomeScreen() {
  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        {/* Header 60px */}
        <header className="flex h-[60px] items-center justify-between">
          <h1 className="t-heading-lg text-[var(--text-primary)]">Buenos días, Carlos</h1>
          <div className="flex items-center gap-3">
            <button aria-label="Notificaciones" className="relative text-[var(--text-secondary)]">
              <Bell size={21} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ambar-500 ring-2 ring-[var(--bg-primary)]" />
            </button>
            <Avatar name="Carlos" size="lg" online />
          </div>
        </header>

        {/* Notificación proactiva del agente IA — doc 01, §4 Pantalla 2.1 */}
        <div className="mt-3 rounded-lg border border-ambar-400/35 bg-bosque-700 p-4 shadow-md animate-rise">
          <div className="flex items-start gap-2.5">
            <Avatar name="Amigos" type="ai-agent" size="sm" className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="t-label-sm mb-1.5 uppercase text-ambar-400">Tu agente de reuniones</div>
              <p className="t-body-lg text-[var(--text-primary)]">
                Hace <span className="text-ambar-400">18 días</span> que los amigos del trabajo no se
                juntan, y los viernes son su día habitual.
              </p>
              <Link
                href="/app/meeting/new"
                className="mt-3 inline-flex items-center gap-1 t-label-lg text-esmeralda-400 transition-colors hover:text-esmeralda-500"
              >
                Convocarlos ahora <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <ListSection
          className="mt-7"
          label="Mis círculos"
          sheetTitle="Mis círculos"
          gap="gap-3"
          items={circles.map((c) => {
            const stale = c.lastMeeting > 14;
            return (
              <Link
                key={c.id}
                href="/app/meeting/new"
                className="flex items-center gap-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-esmeralda-500/60"
              >
                <span className="text-[32px] leading-none" aria-hidden>{c.emoji}</span>

                <div className="min-w-0 flex-1">
                  <div className="t-heading-sm text-[var(--text-primary)]">{c.name}</div>
                  <div className={cn("mt-0.5 t-body-sm", stale ? "text-ambar-400" : "text-[var(--text-secondary)]")}>
                    Hace {c.lastMeeting} días · {c.meetingType}
                  </div>

                  <div className="mt-2.5 flex items-center gap-2.5">
                    <AvatarStack names={c.members.filter((m) => !m.startsWith("+"))} max={3} />
                    <span className="inline-flex items-center gap-1 rounded-full bg-bosque-800 px-2 py-1 t-label-sm text-[var(--text-secondary)]">
                      <MapPin size={11} className="text-esmeralda-400" />
                      {c.usualVenue}
                    </span>
                  </div>
                </div>

                <ChevronRight size={18} className="shrink-0 text-[var(--text-secondary)]" />
              </Link>
            );
          })}
        />

        <SectionLabel className="mb-2.5 mt-7">Próximas reuniones</SectionLabel>
        <div className="-mx-5 flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
          {upcomingMeetings.map((m) => (
            <Link
              key={m.id}
              href={m.href}
              className="flex w-[268px] shrink-0 flex-col rounded-lg border border-esmeralda-500/40 bg-esmeralda-500/8 p-4 transition-colors hover:bg-esmeralda-500/12"
            >
              <span
                className={cn(
                  "self-start rounded-full px-2 py-1 t-label-sm uppercase",
                  m.tone === "voting"
                    ? "bg-ambar-100 text-ambar-600"
                    : "bg-esmeralda-100 text-esmeralda-600",
                )}
              >
                {m.badge}
              </span>
              <div className="mt-2.5 t-display-md text-[var(--text-primary)]">{m.title}</div>
              <div className="mt-1 t-body-sm text-[var(--text-secondary)]">{m.subtitle}</div>
              <div className="mt-3 flex items-center gap-2 border-t border-esmeralda-500/20 pt-3">
                <AvatarStack names={m.people} max={4} ring="#1F3A28" />
                <span className="t-body-sm text-[var(--text-secondary)]">{m.when}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAB 52px — doc 08 Pantalla 01 */}
      <Link
        href="/app/meeting/new"
        aria-label="Nueva reunión"
        className="absolute bottom-[104px] right-5 z-30 grid h-[52px] w-[52px] place-items-center rounded-full bg-esmeralda-500 text-white shadow-float transition-all hover:bg-esmeralda-600 active:scale-95"
      >
        <Plus size={24} />
      </Link>

      <TabBar />
    </>
  );
}
