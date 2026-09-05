/* P3.2 — Cola de pedidos activos en tiempo real. doc 08, §8 B2B-02. */
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { venueOrders } from "@/data/mock-data";
import { cn } from "@/lib/utils";

type Order = (typeof venueOrders.nuevos)[number];

const COLUMNS: { key: keyof typeof venueOrders; title: string; tone: string }[] = [
  { key: "nuevos", title: "Nuevos", tone: "#27AE60" },
  { key: "preparacion", title: "En preparación", tone: "#F39C12" },
  { key: "listos", title: "Listos", tone: "#1E8449" },
];

function OrderCard({ o, next }: { o: Order; next: string }) {
  const late = o.minutes > 10;
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-white p-4">
      <div className="flex items-center gap-2.5">
        <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: o.color }} />
        <div className="min-w-0 flex-1">
          <div className="t-heading-sm text-neutral-950">Mesa {o.table}</div>
          <div className="truncate t-body-sm text-[var(--text-secondary)]">{o.group}</div>
        </div>
        <Badge type={late ? "pending" : "neutral"}>{o.minutes} min</Badge>
      </div>

      <ul className="mt-3.5 space-y-1.5 border-t border-[var(--border-subtle)] pt-3.5">
        {o.items.map((i) => (
          <li key={i.name} className="flex gap-2.5 t-body-md text-neutral-950">
            <span className="t-heading-sm tabular-nums text-esmeralda-600">{i.qty}×</span>
            <span>{i.name}</span>
          </li>
        ))}
      </ul>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-[var(--border-default)] py-2.5 t-label-lg text-neutral-950 transition-colors hover:bg-neutral-100">
        {next} <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default function VenueOrders() {
  return (
    <div className="p-5 lg:p-8">
      <header className="mb-6">
        <h1 className="t-display-lg text-neutral-950">Pedidos activos</h1>
        <p className="mt-1 t-body-md text-[var(--text-secondary)]">
          Actualización en tiempo real desde las mesas
        </p>
      </header>

      {/* Alerta de pedido especial */}
      <div className="mb-7 flex items-start gap-3 rounded-lg border border-rojo-500/45 bg-rojo-100 p-4">
        <AlertTriangle size={19} className="mt-0.5 shrink-0 text-rojo-500" />
        <p className="t-body-lg text-neutral-800">
          <strong>{venueOrders.alert}</strong>
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {COLUMNS.map(({ key, title, tone }, ci) => {
          const list = venueOrders[key] as Order[];
          return (
            <section key={key}>
              <div className="mb-3.5 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tone }} />
                <h2 className="t-heading-md text-neutral-950">{title}</h2>
                <span className={cn("t-body-sm text-[var(--text-secondary)]")}>{list.length}</span>
              </div>
              <div className="space-y-3">
                {list.map((o) => (
                  <OrderCard
                    key={o.table}
                    o={o}
                    next={ci === 0 ? "A preparación" : ci === 1 ? "Marcar listo" : "Entregado"}
                  />
                ))}
                {list.length === 0 && (
                  <div className="rounded-lg border border-dashed border-[var(--border-subtle)] p-6 text-center t-body-sm text-[var(--text-secondary)]">
                    Sin pedidos
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
