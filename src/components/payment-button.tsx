"use client";

/* Selector de método de pago — Yape / Plin / Nequi / Tarjeta / Efectivo.
   doc 08, §6 Pantalla 07. Yape y Nequi deben verse prominentes (doc 07, calidad). */
import { cn } from "@/lib/utils";
import { paymentMethods, type PaymentMethodId } from "@/data/mock-data";

export function PaymentSelector({
  value,
  onChange,
}: {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {paymentMethods.map((m) => {
        const active = value === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1.5 rounded-md border px-4 py-3 transition-all",
              active
                ? "border-esmeralda-500 bg-esmeralda-500/12"
                : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-default)]",
            )}
          >
            <span className="text-lg leading-none">{m.emoji}</span>
            <span
              className={cn("t-label-lg", active ? "text-esmeralda-400" : "text-[var(--text-primary)]")}
            >
              {m.name}
            </span>
            <span className="t-label-sm text-[var(--text-secondary)]">{m.market}</span>
          </button>
        );
      })}
    </div>
  );
}

/** QR de Yape — patrón determinista, 160×160 (doc 08, Pantalla 07). */
export function PaymentQR({ label }: { label: string }) {
  const N = 21;
  const cells: boolean[] = [];
  let seed = 7919;
  for (let i = 0; i < N * N; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    cells.push((seed >> 16) % 100 < 46);
  }
  // Marcadores de posición en las 3 esquinas
  const inFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-lg border-2 border-esmeralda-500 bg-white p-3">
        <svg width="160" height="160" viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" role="img" aria-label={label}>
          <rect width={N} height={N} fill="#fff" />
          {cells.map((on, i) => {
            const r = Math.floor(i / N);
            const c = i % N;
            if (inFinder(r, c) || !on) return null;
            return <rect key={i} x={c} y={r} width="1" height="1" fill="#0A0A0A" />;
          })}
          {[[0, 0], [0, N - 7], [N - 7, 0]].map(([r, c], i) => (
            <g key={i} fill="#0A0A0A">
              <rect x={c} y={r} width="7" height="7" />
              <rect x={c + 1} y={r + 1} width="5" height="5" fill="#fff" />
              <rect x={c + 2} y={r + 2} width="3" height="3" />
            </g>
          ))}
        </svg>
      </div>
      <p className="t-body-sm text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}
