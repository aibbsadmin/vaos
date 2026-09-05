"use client";

/* Check-in y pedido en mesa. doc 08, §6 Pantalla 06. */
import Link from "next/link";
import { MapPin, Clock, Plus } from "lucide-react";
import { ScreenHeader } from "@/components/app-nav";
import { Avatar, Button, SectionLabel } from "@/components/ui";
import { ListSection } from "@/components/list-section";
import { MeetingProgress } from "@/components/vote-panel";
import { attendees, activeMeeting, myBill, myTotal } from "@/data/mock-data";
import { soles } from "@/lib/utils";

const STAGES = [
  { id: "propuesta", label: "Propuesta" },
  { id: "votacion", label: "Votación" },
  { id: "confirmado", label: "Confirmado" },
  { id: "lugar", label: "En el lugar" },
  { id: "pagando", label: "Pagando" },
];

export default function CheckinScreen() {
  const paidCount = 0;

  return (
    <>
      <ScreenHeader
        title="En La Palomilla"
        subtitle={<span className="text-esmeralda-400">Check-in hecho · 12:34</span>}
        back="/app/meeting/confirmed"
      />

      <div className="shrink-0 px-5 pb-4">
        <MeetingProgress stages={STAGES} current={3} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar border-t border-[var(--border-subtle)] px-5 py-5">
        {/* Estado del grupo */}
        <ListSection
          label="Quién ha llegado"
          sheetTitle="Quién ha llegado"
          items={attendees.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 rounded-md bg-[var(--bg-surface)] px-3 py-2.5"
              style={{ borderLeft: `3px solid ${p.arrived ? "#27AE60" : "#F39C12"}` }}
            >
              <Avatar name={p.name} size="sm" />
              <span className="t-heading-sm flex-1 text-[var(--text-primary)]">
                {p.name}
                {p.isMe && <span className="ml-1.5 t-label-sm text-[var(--text-secondary)]">· tú</span>}
              </span>
              {p.arrived ? (
                <span className="flex items-center gap-1 t-body-sm text-esmeralda-400">
                  <MapPin size={13} /> Ya llegó
                </span>
              ) : (
                <span className="flex items-center gap-1 t-body-sm text-ambar-400">
                  <Clock size={13} /> En camino
                </span>
              )}
            </div>
          ))}
        />

        {/* Tu pedido confirmado */}
        <SectionLabel className="mb-2.5 mt-7">Tu pedido confirmado</SectionLabel>
        <div
          className="rounded-lg border p-4"
          style={{ background: "rgba(213,245,227,0.10)", borderColor: "rgba(39,174,96,0.45)" }}
        >
          {myBill.map((l) => (
            <div key={l.label} className="flex justify-between py-1.5 t-body-md text-[var(--text-primary)]">
              <span>{l.label}</span>
              <span className="tabular-nums">{soles(l.amount)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-esmeralda-500/30 pt-3">
            <span className="t-heading-sm text-[var(--text-primary)]">Tu subtotal</span>
            <span className="t-heading-md tabular-nums text-esmeralda-400">{soles(myTotal)}</span>
          </div>
        </div>

        <Link href="/app/meeting/menu" className="mt-3 block">
          <Button variant="secondary" full>
            <Plus size={16} /> Agregar algo más
          </Button>
        </Link>

        {/* Cuenta total de la mesa */}
        <SectionLabel className="mb-2.5 mt-7">Cuenta de la mesa</SectionLabel>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div className="flex items-baseline justify-between">
            <span className="t-body-md text-[var(--text-secondary)]">Total mesa</span>
            <span className="t-display-md tabular-nums text-[var(--text-primary)]">
              {soles(activeMeeting.account.total)}
            </span>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between t-body-sm text-[var(--text-secondary)]">
              <span>Pagado</span>
              <span>{paidCount} de {attendees.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bosque-800">
              <div
                className="h-full rounded-full bg-esmeralda-500 transition-all"
                style={{ width: `${(paidCount / attendees.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border-subtle)] px-5 pb-[46px] pt-3.5">
        <Link href="/app/meeting/account">
          <Button size="lg" full>Pedir la cuenta</Button>
        </Link>
      </div>
    </>
  );
}
