"use client";

/* P1.6 — Cuenta y pago. doc 08, §6 Pantalla 07.
   "La pantalla con mayor peso funcional. Layout denso pero ordenado." */
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ExternalLink } from "lucide-react";
import { ScreenHeader } from "@/components/app-nav";
import { Avatar, Badge, Button, SectionLabel } from "@/components/ui";
import { ListSection } from "@/components/list-section";
import { PaymentSelector, PaymentQR } from "@/components/payment-button";
import { activeMeeting, groupPayments, myBill, myTotal, type PaymentMethodId } from "@/data/mock-data";
import { useDemo } from "@/lib/demo-state";
import { cn, soles } from "@/lib/utils";

export default function AccountScreen() {
  const [method, setMethod] = useState<PaymentMethodId | null>("yape");
  const { paid, pay } = useDemo();

  const payments = groupPayments.map((p) =>
    p.isMe && paid ? { ...p, status: "paid" as const, ref: "YP-4471-2098" } : p,
  );
  const paidCount = payments.filter((p) => p.status === "paid").length;

  return (
    <>
      <ScreenHeader
        title="Cuenta · La Palomilla"
        back="/app/meeting/checkin"
        right={
          paid ? <Badge type="success">Pagado</Badge> : <Badge type="pending">Pendiente</Badge>
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
        {/* Tu consumo — la acción más importante */}
        <SectionLabel className="mb-2.5">Tu consumo</SectionLabel>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          {myBill.map((l) => (
            <div key={l.label} className="flex justify-between py-1.5 t-body-md text-[var(--text-primary)]">
              <span>{l.label}</span>
              <span className="tabular-nums">{soles(l.amount)}</span>
            </div>
          ))}
          <div className="mt-2.5 flex items-baseline justify-between border-t border-[var(--border-subtle)] pt-3.5">
            <span className="t-label-sm uppercase text-[var(--text-secondary)]">Total a pagar</span>
            <span className="t-display-md tabular-nums text-esmeralda-400">{soles(myTotal)}</span>
          </div>
        </div>

        {/* Estado de pagos del grupo */}
        <div className="mb-2.5 mt-7 flex items-baseline justify-between">
          <SectionLabel>Pagos del grupo</SectionLabel>
          <span className="t-body-sm text-[var(--text-secondary)]">
            {paidCount} de {payments.length} · {soles(activeMeeting.account.total)}
          </span>
        </div>
        <ListSection
          sheetTitle="Pagos del grupo"
          items={payments.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2.5 rounded-md bg-[var(--bg-surface)] px-3 py-2.5"
              style={{ borderLeft: `3px solid ${p.status === "paid" ? "#27AE60" : "#F39C12"}` }}
            >
              <Avatar name={p.name} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="t-heading-sm text-[var(--text-primary)]">
                  {p.name}
                  {p.isMe && <span className="ml-1.5 t-label-sm text-[var(--text-secondary)]">· tú</span>}
                </div>
                <div
                  className={cn(
                    "t-body-sm",
                    p.status === "paid" ? "text-esmeralda-400" : "text-ambar-400",
                  )}
                >
                  {p.status === "paid" ? `✅ Pagó por ${p.method}` : `⏳ Pendiente · ${p.method}`}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="t-label-lg tabular-nums text-[var(--text-primary)]">{soles(p.amount)}</div>
                {p.ref !== "—" && <div className="t-mono-sm text-[var(--text-secondary)]">{p.ref}</div>}
              </div>
            </div>
          ))}
        />

        {!paid ? (
          <>
            {/* Selector de método de pago */}
            <SectionLabel className="mb-2.5 mt-7">¿Cómo pagas?</SectionLabel>
            <div className="-mx-5 px-5">
              <PaymentSelector value={method} onChange={setMethod} />
            </div>

            {method === "yape" && (
              <div className="mt-5 flex flex-col items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 animate-rise">
                <PaymentQR label={`Escanea para pagar ${soles(myTotal)}`} />
                <button className="mt-4 flex items-center gap-1.5 t-label-lg text-esmeralda-400 hover:text-esmeralda-500">
                  Pagar en la app de Yape <ExternalLink size={14} />
                </button>
              </div>
            )}

            {method && method !== "yape" && (
              <div className="mt-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 animate-rise">
                <p className="t-body-md text-[var(--text-primary)]">
                  {method === "efectivo"
                    ? "Le avisas al organizador que pagaste en efectivo y él lo confirma desde su panel."
                    : `Te llevamos a ${method === "nequi" ? "Nequi" : method === "plin" ? "Plin" : "el checkout de tarjeta"} con el monto ya cargado.`}
                </p>
                <p className="mt-2 t-mono-sm text-[var(--text-secondary)]">
                  REF {activeMeeting.id.toUpperCase()} · {soles(myTotal)}
                </p>
              </div>
            )}
          </>
        ) : (
          <div
            className="mt-7 rounded-lg border p-5 text-center animate-rise"
            style={{ background: "rgba(213,245,227,0.10)", borderColor: "rgba(39,174,96,0.45)" }}
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-esmeralda-500">
              <Check size={24} className="text-white" strokeWidth={3} />
            </div>
            <div className="mt-3 t-display-md text-[var(--text-primary)]">Pago confirmado</div>
            <p className="mt-1 t-body-md text-[var(--text-secondary)]">
              {soles(myTotal)} por Yape · La Palomilla
            </p>
            <p className="mt-2 t-mono-sm text-[var(--text-secondary)]">OP YP-4471-2098</p>
            <Link
              href="/app/meeting/recap"
              className="mt-4 inline-flex items-center gap-1 t-label-lg text-esmeralda-400 hover:text-esmeralda-500"
            >
              Ver el resumen de la reunión <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {!paid && (
        <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 px-5 pb-[46px] pt-3.5 backdrop-blur">
          <Button size="lg" full disabled={!method} onClick={() => method && pay(method)}>
            Confirmar pago · {soles(myTotal)}
          </Button>
          <p className="mt-2.5 text-center t-body-sm text-[var(--text-secondary)]">
            O informa al organizador que pagaste en efectivo
          </p>
        </div>
      )}
    </>
  );
}
