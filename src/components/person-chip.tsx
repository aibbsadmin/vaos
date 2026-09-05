/* PersonChip — doc 08, §5.
   Avatar(sm) + nombre + estado. Borde izquierdo de 3px según estado. */
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ParticipantStatus } from "@/data/mock-data";

const STATUS = {
  confirmed: { border: "#27AE60", icon: "✅", label: "Confirmado", tone: "text-esmeralda-400" },
  pending:   { border: "#F39C12", icon: "⏳", label: "Sin responder", tone: "text-ambar-400" },
  rejected:  { border: "#E74C3C", icon: "❌", label: "No puede", tone: "text-rojo-500" },
  organizer: { border: "#F8C471", icon: "★",  label: "Organizador", tone: "text-ambar-400" },
} as const;

export function PersonChip({
  name,
  status,
  detail,
  right,
  isMe,
  className,
}: {
  name: string;
  status: ParticipantStatus;
  detail?: string;
  right?: React.ReactNode;
  isMe?: boolean;
  className?: string;
}) {
  const s = STATUS[status];
  return (
    <div
      className={cn(
        "flex h-[52px] items-center gap-2 rounded-md bg-[var(--bg-surface)] px-3 py-2",
        className,
      )}
      style={{ borderLeft: `3px solid ${s.border}` }}
    >
      <Avatar name={name} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="t-heading-sm truncate text-[var(--text-primary)]">{name}</span>
          {isMe && <span className="t-label-sm text-[var(--text-secondary)]">· tú</span>}
        </div>
        <div className={cn("t-body-sm truncate", detail ? "text-[var(--text-secondary)]" : s.tone)}>
          {detail ?? s.label}
        </div>
      </div>
      <span className={cn("t-body-sm shrink-0", s.tone)}>{right ?? s.icon}</span>
    </div>
  );
}
