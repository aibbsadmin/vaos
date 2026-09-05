"use client";

/* P1.4 — Reunión confirmada. doc 08, §6 Pantalla 04.
   "El momento de celebración. Un solo elemento llamativo": el nombre del lugar
   en Fraunces 40px es lo más grande de la pantalla; todo lo demás respira. */
import Link from "next/link";
import { Share2, CalendarDays, MapPin, Users, Bell, Check, Navigation } from "lucide-react";
import { ScreenHeader, TabBar } from "@/components/app-nav";
import { AvatarStack, Badge, SectionLabel } from "@/components/ui";
import { PersonChip } from "@/components/person-chip";
import { activeMeeting, attendees } from "@/data/mock-data";

export default function ConfirmedScreen() {
  const m = activeMeeting;
  const names = attendees.map((p) => p.name);

  return (
    <>
      <ScreenHeader
        title="Reuniones"
        back="/app/home"
        right={
          <button aria-label="Compartir" className="text-[var(--text-secondary)]">
            <Share2 size={19} />
          </button>
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        {/* HERO — el único elemento llamativo */}
        <section className="rounded-xl bg-bosque-700 p-6 animate-rise">
          <div className="flex items-center gap-2">
            <Check size={13} className="text-esmeralda-400" strokeWidth={3} />
            <span className="t-label-sm uppercase text-esmeralda-400" style={{ letterSpacing: "1.4px" }}>
              Almuerzo · Confirmado
            </span>
          </div>

          <h1 className="mt-3 t-display-xl text-[var(--text-primary)]">{m.venue.name}</h1>
          <p className="mt-1 t-body-md text-[var(--text-secondary)]">
            {m.venue.type} · {m.venue.district}
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            <CalendarDays size={18} className="shrink-0 text-esmeralda-400" />
            <span className="t-heading-md text-[var(--text-primary)]">
              {m.dateShort} · {m.time}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-bosque-600 pt-5">
            <AvatarStack names={names} size="md" ring="#243D28" />
            <span className="t-body-sm text-esmeralda-400">
              ✓ Reserva para {m.reservation.pax}
            </span>
          </div>
        </section>

        {/* Detalles */}
        <SectionLabel className="mb-2.5 mt-7">Detalles</SectionLabel>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <MapPin size={17} className="shrink-0 text-esmeralda-400" />
            <div className="min-w-0 flex-1">
              <div className="t-body-md text-[var(--text-primary)]">{m.venue.address}</div>
              <div className="t-body-sm text-[var(--text-secondary)]">{m.reservation.table}</div>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-default)] px-3 py-2 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-bosque-600">
              <Navigation size={13} /> Cómo llegar
            </button>
          </div>

          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users size={16} className="text-esmeralda-400" />
              <span className="t-heading-sm text-[var(--text-primary)]">Participantes</span>
              <Badge type="success" className="ml-auto">{attendees.length} confirmados</Badge>
            </div>
            <div className="space-y-2">
              {attendees.slice(0, 3).map((p) => (
                <PersonChip
                  key={p.id}
                  name={p.name}
                  status={p.status === "pending" ? "confirmed" : p.status}
                  detail={p.usual}
                  isMe={p.isMe}
                  className="bg-bosque-800"
                />
              ))}
            </div>
            <button className="mt-3 t-label-lg text-esmeralda-400 hover:text-esmeralda-500">
              Ver todos ({attendees.length}) →
            </button>
          </div>

          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <div className="flex items-start gap-3">
              <Bell size={16} className="mt-0.5 shrink-0 text-esmeralda-400" />
              <div className="min-w-0 flex-1">
                <div className="t-heading-sm text-[var(--text-primary)]">Recordatorios programados</div>
                <ul className="mt-1.5 space-y-1">
                  {m.reminders.map((r) => (
                    <li key={r} className="t-body-sm text-[var(--text-secondary)]">
                      · {r}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="mt-0.5 h-6 w-11 shrink-0 rounded-full bg-esmeralda-500 p-0.5">
                <span className="block h-5 w-5 translate-x-5 rounded-full bg-white transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* 3 acciones secundarias */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          <Link
            href="/app/meeting/checkin"
            className="rounded-md border border-[var(--border-default)] px-2 py-3 text-center t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]"
          >
            Ver carta
          </Link>
          <button className="rounded-md border border-[var(--border-default)] px-2 py-3 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]">
            Compartir
          </button>
          <button className="rounded-md border border-[var(--border-default)] px-2 py-3 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]">
            Transporte
          </button>
        </div>
      </div>

      <TabBar />
    </>
  );
}
