"use client";

/* WhatsApp Flows — doc 08, §7 (WA-02, WA-03) y doc 06, §4.2.
   Modal slide-up sobre el chat, 85% de la altura del viewport. */
import { useState } from "react";
import { X, Check, Plus, Minus } from "lucide-react";
import { WA } from "@/components/whatsapp-frame";
import { venueMenu, usualOrder } from "@/data/mock-data";
import { cn, soles } from "@/lib/utils";

function FlowSheet({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/45"
      />
      <div
        className="relative flex max-h-[85%] flex-col overflow-hidden rounded-t-xl bg-white animate-sheet-up"
        style={{ color: "#111B21" }}
      >
        <header className="flex shrink-0 items-start gap-3 border-b border-black/8 px-5 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="t-heading-md">{title}</h2>
            <p className="mt-0.5 t-body-sm" style={{ color: "#667781" }}>
              {subtitle}
            </p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{ color: "#667781" }}>
            <X size={22} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 py-5">{children}</div>

        <footer className="shrink-0 border-t border-black/8 px-5 pb-6 pt-4">
          {footer}
          <p className="mt-3 text-center t-label-sm" style={{ color: "#8696A0" }}>
            Gestionado por Amigos App
          </p>
        </footer>
      </div>
    </div>
  );
}

function FlowCTA({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-full py-3.5 t-heading-sm text-white transition-opacity disabled:opacity-40"
      style={{ background: WA.flowBtn }}
    >
      {children}
    </button>
  );
}

/* --------------------- WA-02 · Confirmación de asistencia --------------------- */
const DATE_OPTIONS = [
  { id: "d1", label: "Viernes 26 · 12:30", hint: "3 ya confirmaron" },
  { id: "d2", label: "Martes 30 · 13:00", hint: "1 persona" },
  { id: "no", label: "Ninguna de estas", hint: "" },
];

export function FlowConfirm({ onClose, onDone }: { onClose: () => void; onDone: (date: string, note: string) => void }) {
  const [pick, setPick] = useState<string | null>("d1");
  const [note, setNote] = useState("");

  return (
    <FlowSheet
      title="🍽️ Confirmar asistencia"
      subtitle="Almuerzo con Carlos y el equipo"
      onClose={onClose}
      footer={
        <FlowCTA
          disabled={!pick}
          onClick={() => onDone(DATE_OPTIONS.find((d) => d.id === pick)?.label ?? "", note)}
        >
          Confirmar →
        </FlowCTA>
      }
    >
      <p className="t-heading-sm">¿Cuándo puedes?</p>
      <div className="mt-3 space-y-2">
        {DATE_OPTIONS.map((d) => {
          const on = pick === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setPick(d.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-colors",
                on ? "border-[#25D366] bg-[#E7F8EE]" : "border-black/12",
              )}
            >
              <span
                className={cn(
                  "grid h-[21px] w-[21px] shrink-0 place-items-center rounded-full border-2",
                  on ? "border-[#25D366]" : "border-black/25",
                )}
              >
                {on && <span className="h-[11px] w-[11px] rounded-full" style={{ background: WA.flowBtn }} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block t-body-lg">{d.label}</span>
                {d.hint && (
                  <span className="block t-body-sm" style={{ color: "#667781" }}>
                    {d.hint}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {pick !== "no" && (
        <div className="mt-6 animate-rise">
          <p className="t-heading-sm">¿Alguna nota?</p>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Opcional — el grupo lo verá"
            className="mt-3 w-full rounded-lg border border-black/15 px-4 py-3 t-body-lg outline-none focus:border-[#25D366]"
          />
          <button
            onClick={() => setNote("Llego 15 minutos tarde")}
            className="mt-2 t-body-sm underline"
            style={{ color: "#667781" }}
          >
            Llego 15 minutos tarde
          </button>
        </div>
      )}
    </FlowSheet>
  );
}

/* ------------------------- WA-03 · Pre-pedido (carta) ------------------------- */
const SHORT_MENU = venueMenu.sections
  .flatMap((s) => s.items)
  .filter((i) => i.popular || i.isUsual || i.shared)
  .slice(0, 8);

export function FlowMenu({ onClose, onDone }: { onClose: () => void; onDone: (total: number, items: string[]) => void }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const total = SHORT_MENU.reduce((s, i) => s + i.price * (qty[i.id] ?? 0), 0);
  const chosen = SHORT_MENU.filter((i) => qty[i.id]).map((i) => i.name);
  const usualOn = usualOrder.items.every((i) => (qty[i.id] ?? 0) > 0);

  return (
    <FlowSheet
      title="🍴 Tu pedido · La Palomilla"
      subtitle="Viernes 26 · 12:30"
      onClose={onClose}
      footer={
        <>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="t-body-md" style={{ color: "#667781" }}>
              Tu pedido
            </span>
            <span className="t-heading-md tabular-nums">{soles(total)}</span>
          </div>
          <FlowCTA disabled={total === 0} onClick={() => onDone(total, chosen)}>
            Confirmar →
          </FlowCTA>
        </>
      }
    >
      {/* Banner "Lo de siempre" */}
      <div className="rounded-lg border border-[#25D366]/45 bg-[#E8F5E9] p-4">
        <p className="t-label-sm uppercase" style={{ color: "#1E8449" }}>
          Lo de siempre
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <span className="t-heading-sm">{usualOrder.items.map((i) => i.name).join(" + ")}</span>
          <span className="shrink-0 t-heading-sm tabular-nums">{soles(usualOrder.total)}</span>
        </div>
        <button
          onClick={() => setQty(usualOn ? {} : Object.fromEntries(usualOrder.items.map((i) => [i.id, 1])))}
          className={cn(
            "mt-3.5 flex w-full items-center justify-center gap-2 rounded-full py-3 t-heading-sm transition-opacity",
            usualOn ? "border border-[#25D366] text-[#1E8449]" : "text-white",
          )}
          style={usualOn ? undefined : { background: WA.flowBtn }}
        >
          {usualOn ? (
            <>
              <Check size={17} /> Pedido habitual confirmado
            </>
          ) : (
            "Confirmar pedido habitual →"
          )}
        </button>
      </div>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-black/10" />
        <span className="t-body-sm" style={{ color: "#8696A0" }}>
          O elige de la carta
        </span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <div className="divide-y divide-black/8">
        {SHORT_MENU.map((it) => {
          const q = qty[it.id] ?? 0;
          return (
            <div key={it.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="t-body-lg">{it.name}</span>
                  {it.popular && (
                    <span
                      className="rounded-full px-1.5 py-px t-label-sm"
                      style={{ background: "#E8F5E9", color: "#1E8449" }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <div className="t-body-sm tabular-nums" style={{ color: "#667781" }}>
                  {soles(it.price)}
                  {it.shared && " · para compartir"}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {q > 0 && (
                  <>
                    <button
                      aria-label={`Quitar ${it.name}`}
                      onClick={() => setQty((s) => { const n = { ...s }; if (n[it.id] > 1) n[it.id]--; else delete n[it.id]; return n; })}
                      className="grid h-8 w-8 place-items-center rounded-full border border-black/15"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-4 text-center t-heading-sm tabular-nums">{q}</span>
                  </>
                )}
                <button
                  aria-label={`Agregar ${it.name}`}
                  onClick={() => setQty((s) => ({ ...s, [it.id]: (s[it.id] ?? 0) + 1 }))}
                  className="grid h-8 w-8 place-items-center rounded-full text-white"
                  style={{ background: WA.flowBtn }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </FlowSheet>
  );
}

/* ---------------------------- WA-04 · Pago con Yape --------------------------- */
export function FlowPayment({ onClose, onDone, amount }: { onClose: () => void; onDone: () => void; amount: number }) {
  const [done, setDone] = useState(false);

  return (
    <FlowSheet
      title="🟣 Pagar con Yape"
      subtitle={`Tu parte del almuerzo · ${soles(amount)}`}
      onClose={onClose}
      footer={
        done ? (
          <FlowCTA onClick={onDone}>Volver al chat →</FlowCTA>
        ) : (
          <FlowCTA onClick={() => setDone(true)}>Pagar {soles(amount)} →</FlowCTA>
        )
      }
    >
      {done ? (
        <div className="py-8 text-center animate-rise">
          <div
            className="mx-auto grid h-16 w-16 place-items-center rounded-full animate-pulse-ring"
            style={{ background: WA.flowBtn }}
          >
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>
          <p className="mt-4 t-display-md">¡Pago enviado!</p>
          <p className="mt-1 t-body-md" style={{ color: "#667781" }}>
            {soles(amount)} a La Palomilla
          </p>
          <p className="mt-3 t-mono-sm" style={{ color: "#8696A0" }}>
            OP YP-4471-2098 · 26/09 13:58
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-black/12 p-4">
            {[
              ["Lomo saltado", 38],
              ["Agua mineral", 5],
              ["Vino compartido (1/4)", 15],
            ].map(([l, v]) => (
              <div key={l as string} className="flex justify-between py-1.5 t-body-lg">
                <span>{l}</span>
                <span className="tabular-nums">{soles(v as number)}</span>
              </div>
            ))}
            <div className="mt-2 flex items-baseline justify-between border-t border-black/10 pt-3">
              <span className="t-label-sm uppercase" style={{ color: "#667781" }}>
                Total
              </span>
              <span className="t-display-md tabular-nums">{soles(amount)}</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg p-4" style={{ background: "#F5F0E8" }}>
            <p className="t-body-md">
              Se abrirá Yape con el monto ya cargado. Al confirmar, el organizador y el local
              lo ven al instante.
            </p>
          </div>
        </>
      )}
    </FlowSheet>
  );
}
