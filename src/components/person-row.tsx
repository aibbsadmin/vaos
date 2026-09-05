"use client";

/* PersonRow — una sola fila por persona.
   Layout: [Avatar] [Nombre] [Estado en color] [ícono de estado]
   Reemplaza al PersonChip de dos líneas, cuyo borde izquierdo redondeado
   parecía un paréntesis uniendo filas.
   Expandible: revela la hora de confirmación o el comentario de quien no confirmó. */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ParticipantStatus } from "@/data/mock-data";

const STATUS = {
  confirmed: { accent: "#27AE60", icon: "✓", tone: "text-esmeralda-400" },
  pending:   { accent: "#F39C12", icon: "⏳", tone: "text-ambar-400" },
  rejected:  { accent: "#E74C3C", icon: "✗", tone: "text-rojo-500" },
  organizer: { accent: "#F8C471", icon: "★", tone: "text-ambar-400" },
} as const;

export function PersonRow({
  name,
  status,
  answer,
  detail,
  comment,
  isMe,
  className,
}: {
  name: string;
  status: ParticipantStatus;
  /** Texto de estado en color: "Viernes", "Sin responder", "Solo el martes". */
  answer: string;
  /** Hora de confirmación, visible al expandir. */
  detail?: string;
  /** Comentario de quien no confirmó, visible al expandir. */
  comment?: string;
  isMe?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const s = STATUS[status];
  const expandable = Boolean(detail || comment);

  return (
    <div
      className={cn("overflow-hidden rounded-md bg-[var(--bg-surface)]", className)}
      style={{ borderLeft: `3px solid ${s.accent}` }}
    >
      <button
        type="button"
        disabled={!expandable}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={expandable ? open : undefined}
        className="flex h-11 w-full items-center gap-2.5 px-3 text-left disabled:cursor-default"
      >
        <Avatar name={name} size="sm" />
        <span className="t-heading-sm truncate text-[var(--text-primary)]">{name}</span>
        {isMe && <span className="t-label-sm shrink-0 text-[var(--text-secondary)]">· tú</span>}
        <span className="min-w-0 flex-1" />
        <span className={cn("t-body-sm shrink-0 truncate", s.tone)}>{answer}</span>
        <span className={cn("shrink-0 t-body-sm", s.tone)}>{s.icon}</span>
        {expandable && (
          <ChevronDown
            size={14}
            className={cn(
              "shrink-0 text-[var(--text-secondary)] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        )}
      </button>

      {expandable && open && (
        <div className="border-t border-[var(--border-subtle)] px-3 py-2.5 pl-[42px] animate-rise">
          {detail && <p className="t-body-sm text-[var(--text-secondary)]">{detail}</p>}
          {comment && (
            <p className="mt-1 t-body-sm italic text-[var(--text-primary)]">«{comment}»</p>
          )}
        </div>
      )}
    </div>
  );
}
