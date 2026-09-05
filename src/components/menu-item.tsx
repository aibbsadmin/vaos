"use client";

/* MenuItem — doc 08, §6 Pantalla 05.
   Foto cuadrada 72px + nombre + descripción + precio + botón [+] circular. */
import { Plus, Minus } from "lucide-react";
import { cn, soles } from "@/lib/utils";
import { Badge } from "@/components/ui";
import type { MenuItem as Item } from "@/data/mock-data";

/** Miniatura del plato — gradiente derivado del id, sin assets externos. */
function Thumb({ id }: { id: string }) {
  const n = id.charCodeAt(id.length - 1);
  // Placeholder de foto: tonos cálidos de la paleta (ámbar, rojo, crema) —
  // los verdes del sistema se funden con el fondo bosque y leen como card vacía.
  const hues = [
    ["#F39C12", "#8A4B0A"], ["#E74C3C", "#7A1F16"], ["#D68910", "#5E3506"],
    ["#F8C471", "#A9701A"], ["#E74C3C", "#8A3A12"], ["#F5F0E8", "#B08D5A"],
  ];
  const [a, b] = hues[n % hues.length];
  return (
    <div
      className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md"
      style={{ background: `linear-gradient(140deg, ${a}, ${b})` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35) 0, transparent 45%)" }}
      />
    </div>
  );
}

export function MenuItemRow({
  item,
  qty,
  onAdd,
  onRemove,
}: {
  item: Item;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Thumb id={item.id} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="t-heading-sm text-[var(--text-primary)]">{item.name}</span>
          {item.popular && <Badge type="success">Popular</Badge>}
          {item.shared && <Badge type="info">Para compartir</Badge>}
        </div>
        {item.description && (
          <p className="mt-0.5 t-body-sm text-[var(--text-secondary)]">{item.description}</p>
        )}
        {item.allergen && (
          <span className="mt-1.5 inline-block">
            <Badge type="pending">⚠ {item.allergen}</Badge>
          </span>
        )}
        <div className="mt-1.5 t-label-lg text-[var(--text-primary)]">{soles(item.price)}</div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {qty > 0 && (
          <>
            <button
              onClick={onRemove}
              aria-label={`Quitar ${item.name}`}
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--border-default)] text-[var(--text-primary)] transition-colors hover:bg-bosque-600"
            >
              <Minus size={15} />
            </button>
            <span className="w-4 text-center t-heading-sm tabular-nums text-[var(--text-primary)]">{qty}</span>
          </>
        )}
        <button
          onClick={onAdd}
          aria-label={`Agregar ${item.name}`}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full bg-esmeralda-500 text-white transition-all",
            "hover:bg-esmeralda-600 active:scale-95",
          )}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
