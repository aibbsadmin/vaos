"use client";

/* ListSection — patrón global de listas.
   Con más de 4 ítems muestra los primeros 3 y un link "ver todos (N)…"
   que abre un bottom sheet con la lista completa y scroll. */
import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SectionLabel } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ListSection({
  label,
  items,
  sheetTitle,
  preview = 3,
  threshold = 4,
  gap = "gap-2",
  right,
  className,
}: {
  label?: string;
  items: ReactNode[];
  sheetTitle?: string;
  /** Cuántos se ven cuando la lista se recorta. */
  preview?: number;
  /** A partir de cuántos ítems se recorta. */
  threshold?: number;
  gap?: string;
  right?: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const overflows = items.length > threshold;
  const shown = overflows ? items.slice(0, preview) : items;

  return (
    <section className={className}>
      {(label || right) && (
        <div className="mb-2.5 flex items-baseline justify-between gap-2">
          {label && <SectionLabel>{label}</SectionLabel>}
          {right}
        </div>
      )}

      <div className={cn("flex flex-col", gap)}>{shown}</div>

      {overflows && (
        <button
          onClick={() => setOpen(true)}
          className="mt-2.5 t-label-lg text-esmeralda-400 transition-colors hover:text-esmeralda-500"
        >
          Ver todos ({items.length})…
        </button>
      )}

      {open && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[var(--bg-overlay)]"
          />
          <div className="relative flex max-h-[78%] flex-col overflow-hidden rounded-t-lg border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-float animate-sheet-up">
            <header className="flex shrink-0 items-center gap-3 px-5 pb-3 pt-4">
              <h2 className="t-heading-md flex-1 text-[var(--text-primary)]">
                {sheetTitle ?? label ?? "Lista"}
                <span className="ml-2 t-body-sm text-[var(--text-secondary)]">
                  {items.length}
                </span>
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
              >
                <X size={18} />
              </button>
            </header>
            <div
              className={cn(
                "flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar px-5 pb-8",
                gap,
              )}
            >
              {items}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
