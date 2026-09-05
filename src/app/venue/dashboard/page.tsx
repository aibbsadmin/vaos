/* P3.1 — Dashboard del día. doc 08, §8 B2B-01. */
import { AlertTriangle, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui";
import { venueDashboard } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const STATUS = {
  confirmed: { bg: "bg-esmeralda-100", bar: "#27AE60", text: "text-esmeralda-600", label: "Confirmado" },
  arriving:  { bg: "bg-ambar-100",     bar: "#F39C12", text: "text-ambar-600",     label: "Llegando" },
  pending:   { bg: "bg-neutral-100",   bar: "#9E9E9E", text: "text-neutral-600",   label: "Pendiente" },
} as const;

export default function VenueDashboard() {
  const d = venueDashboard;

  return (
    <div className="p-5 lg:p-8">
      <header className="mb-7 flex items-end justify-between">
        <div>
          <h1 className="t-display-lg text-neutral-950">Dashboard</h1>
          <p className="mt-1 t-body-md text-[var(--text-secondary)]">{d.date}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-esmeralda-500 animate-pulse-ring" />
          <span className="t-label-lg text-neutral-950">En vivo</span>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4 [&>*]:min-w-0">
        {d.kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-[var(--border-subtle)] bg-white p-5">
            <div className="t-label-sm uppercase text-[var(--text-secondary)]">{k.label}</div>
            <div className="mt-2 t-display-lg text-neutral-950">{k.value}</div>
            <div className="mt-1 t-body-sm text-[var(--text-secondary)]">{k.delta}</div>
          </div>
        ))}
      </section>

      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Timeline de reservas */}
        <section className="min-w-0 rounded-lg border border-[var(--border-subtle)] bg-white p-5 lg:p-6">
          <h2 className="t-heading-lg text-neutral-950">Reservas del día</h2>
          <p className="mt-0.5 t-body-sm text-[var(--text-secondary)]">12:00 – 21:00 · 8 grupos</p>

          <div className="mt-5 space-y-2.5">
            {d.reservations.map((r) => {
              const s = STATUS[r.status];
              return (
                <div
                  key={r.hour + r.group}
                  className={cn(
                    "flex items-center gap-3 rounded-md border p-3.5 sm:gap-4",
                    r.highlight ? "border-esmeralda-500 bg-esmeralda-50" : "border-[var(--border-subtle)]",
                  )}
                >
                  <span className="w-12 shrink-0 t-heading-sm tabular-nums text-neutral-950 sm:w-14">
                    {r.hour}
                  </span>
                  <span className="h-9 w-1 shrink-0 rounded-full" style={{ background: s.bar }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate t-heading-sm text-neutral-950">{r.group}</div>
                    <div className="truncate t-body-sm text-[var(--text-secondary)]">
                      Mesa {r.table} · {r.pax} personas
                    </div>
                  </div>
                  {r.highlight && (
                    <span className="hidden sm:inline-flex">
                      <Badge type="pending">Ya llegaron 2 de 4</Badge>
                    </span>
                  )}
                  <span className={cn("shrink-0 t-label-lg", s.text)}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pre-pedidos del próximo grupo */}
        <aside className="min-w-0 space-y-4">
          <section className="rounded-lg border border-esmeralda-500/40 bg-white p-5">
            <div className="t-label-sm uppercase text-esmeralda-600">Próximo grupo</div>
            <h3 className="mt-1.5 t-display-md text-neutral-950">{d.nextGroup.name}</h3>
            <div className="mt-1 flex items-center gap-3 t-body-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {d.nextGroup.time}
              </span>
              <span className="flex items-center gap-1">
                <Users size={13} /> {d.nextGroup.pax} personas
              </span>
            </div>
            <div className="mt-3">
              <Badge type="pending">
                Ya llegaron {d.nextGroup.arrived} de {d.nextGroup.pax}
              </Badge>
            </div>

            <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
              <div className="t-label-sm uppercase text-[var(--text-secondary)]">
                Pre-pedido recibido
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {d.nextGroup.items.map((i) => (
                  <li key={i.name} className="flex justify-between t-body-md text-neutral-950">
                    <span>{i.name}</span>
                    <span className="tabular-nums text-[var(--text-secondary)]">×{i.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="flex items-start gap-2.5 rounded-lg border border-ambar-500/50 bg-ambar-100 p-4">
            <AlertTriangle size={17} className="mt-0.5 shrink-0 text-ambar-600" />
            <p className="t-body-md text-neutral-800">{d.nextGroup.alert}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
