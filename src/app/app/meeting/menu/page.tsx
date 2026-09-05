"use client";

/* P1.5 — Pre-pedido / Carta del restaurante. doc 08, §6 Pantalla 05. */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { ScreenHeader } from "@/components/app-nav";
import { Button } from "@/components/ui";
import { MenuItemRow } from "@/components/menu-item";
import { venueMenu, usualOrder, activeMeeting } from "@/data/mock-data";
import { useDemo } from "@/lib/demo-state";
import { cn, soles } from "@/lib/utils";

const ALL_ITEMS = venueMenu.sections.flatMap((s) => s.items);

export default function MenuScreen() {
  const router = useRouter();
  const [section, setSection] = useState(venueMenu.sections[1].name); // "Platos de fondo"
  const { order, addItem, removeItem, setOrder, setStage } = useDemo();

  const total = useMemo(
    () =>
      Object.entries(order).reduce((sum, [id, q]) => {
        const it = ALL_ITEMS.find((i) => i.id === id);
        return sum + (it ? it.price * q : 0);
      }, 0),
    [order],
  );
  const count = Object.values(order).reduce((a, b) => a + b, 0);
  const usualConfirmed = usualOrder.items.every((i) => (order[i.id] ?? 0) > 0);

  const items = venueMenu.sections.find((s) => s.name === section)?.items ?? [];

  return (
    <>
      <ScreenHeader
        title={activeMeeting.venue.name}
        subtitle={
          <span className={count ? "text-esmeralda-400" : "text-[var(--text-secondary)]"}>
            Tu pedido: {soles(total)}
          </span>
        }
        back="/app/meeting/confirmed"
      />

      {/* Tabs de sección */}
      <div className="shrink-0 border-b border-[var(--border-subtle)]">
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-5">
          {venueMenu.sections.map((s) => (
            <button
              key={s.name}
              onClick={() => setSection(s.name)}
              className={cn(
                "shrink-0 border-b-2 pb-3 t-label-lg transition-colors",
                section === s.name
                  ? "border-esmeralda-500 text-esmeralda-400"
                  : "border-transparent text-[var(--text-secondary)]",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 pb-28">
        {/* Banner "Lo de siempre" — bg esmeralda-050 / borde esmeralda-200 */}
        <div
          className="mt-5 rounded-lg border p-4"
          style={{ background: "rgba(213,245,227,0.10)", borderColor: "rgba(39,174,96,0.45)" }}
        >
          <div className="t-label-sm uppercase text-esmeralda-400">Lo de siempre</div>
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <span className="t-heading-md text-[var(--text-primary)]">
              {usualOrder.items.map((i) => i.name).join(" + ")}
            </span>
            <span className="shrink-0 t-heading-md tabular-nums text-esmeralda-400">
              {soles(usualOrder.total)}
            </span>
          </div>
          <p className="mt-1 t-body-sm text-[var(--text-secondary)]">
            Tu pedido habitual en {usualOrder.venue} · 12 visitas
          </p>
          <Button
            full
            className="mt-3.5"
            variant={usualConfirmed ? "secondary" : "primary"}
            onClick={() =>
              setOrder(usualConfirmed ? {} : Object.fromEntries(usualOrder.items.map((i) => [i.id, 1])))
            }
          >
            {usualConfirmed ? (
              <>
                <Check size={16} /> Confirmado
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="t-label-sm uppercase text-[var(--text-secondary)]">O explora el menú</span>
          <span className="h-px flex-1 bg-[var(--border-subtle)]" />
        </div>

        <div className="divide-y divide-[var(--border-subtle)]">
          {items.map((it) => (
            <MenuItemRow
              key={it.id}
              item={it}
              qty={order[it.id] ?? 0}
              onAdd={() => addItem(it.id)}
              onRemove={() => removeItem(it.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer sticky */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 px-5 pb-[46px] pt-3.5 backdrop-blur">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="t-body-sm text-[var(--text-secondary)]">
            Tu pedido · {count} {count === 1 ? "ítem" : "ítems"}
          </span>
          <span className="t-heading-md text-[var(--text-primary)]">{soles(total)}</span>
        </div>
        <Button
          size="lg"
          full
          disabled={count === 0}
          onClick={() => {
            setStage("prepedido");
            router.push("/app/meeting/checkin");
          }}
        >
          Confirmar pedido
        </Button>
      </div>
    </>
  );
}
