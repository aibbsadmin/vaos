/* VotePanel — panel de votos embebido en la burbuja del agente (doc 08, §6 Pantalla 03). */
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Participant } from "@/data/mock-data";

const ROW = {
  confirmed: { icon: "✅", text: "Viernes", tone: "text-esmeralda-400" },
  organizer: { icon: "✅", text: "Viernes", tone: "text-esmeralda-400" },
  pending:   { icon: "⏳", text: "Sin responder", tone: "text-ambar-400" },
  rejected:  { icon: "❌", text: "Solo el martes", tone: "text-rojo-500" },
} as const;

export function VotePanel({ people }: { people: Participant[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--border-subtle)] bg-bosque-800">
      {people.map((p, i) => {
        const r = ROW[p.status];
        return (
          <div
            key={p.id}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5",
              i > 0 && "border-t border-[var(--border-subtle)]",
            )}
          >
            <Avatar name={p.name} size="sm" />
            <span className="t-heading-sm flex-1 text-[var(--text-primary)]">
              {p.name}
              {p.status === "organizer" && (
                <span className="ml-1.5 t-label-sm text-ambar-400">★ organizador</span>
              )}
            </span>
            <span className={cn("t-body-sm", r.tone)}>{r.text}</span>
            <span className="t-body-sm">{r.icon}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Barra de progreso de la reunión — doc 01, §9. */
export function MeetingProgress({
  stages,
  current,
}: {
  stages: { id: string; label: string }[];
  current: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {stages.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.id} className="flex min-w-0 flex-1 items-center gap-1">
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "h-[3px] rounded-full",
                  done ? "bg-esmeralda-500" : active ? "bg-ambar-500" : "bg-bosque-600",
                )}
              />
              <div
                className={cn(
                  "mt-1.5 truncate t-label-sm",
                  done ? "text-esmeralda-400" : active ? "text-ambar-400" : "text-[var(--text-secondary)]",
                )}
              >
                {s.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
