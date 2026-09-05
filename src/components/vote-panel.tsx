"use client";

/* VotePanel — panel de votos embebido en la burbuja del agente (doc 08, §6 Pantalla 03). */
import { cn } from "@/lib/utils";
import { PersonRow } from "@/components/person-row";
import { ListSection } from "@/components/list-section";
import type { Participant } from "@/data/mock-data";

/* Panel de votos: una fila por persona, colapsable, con el patrón global
   de "ver todos" cuando la lista supera 4 personas. */
const ANSWER: Record<string, { answer: string; detail?: string; comment?: string }> = {
  confirmed: { answer: "Viernes", detail: "Confirmó el jueves 25 · 18:42" },
  organizer: { answer: "Viernes", detail: "Organizador · propuso el jueves 25 · 09:10" },
  pending:   { answer: "Sin responder", detail: "Invitado el jueves 25 · 09:12" },
  rejected:  { answer: "Solo el martes", comment: "el viernes no puedo, ¿pueden el martes?" },
};

export function VotePanel({ people }: { people: Participant[] }) {
  const rows = people.map((p) => {
    const a = ANSWER[p.status];
    return (
      <PersonRow
        key={p.id}
        name={p.name}
        status={p.status}
        answer={a.answer}
        detail={a.detail}
        comment={a.comment}
        isMe={p.isMe}
        className="bg-bosque-800"
      />
    );
  });

  return <ListSection items={rows} sheetTitle="Respuestas del grupo" preview={3} threshold={4} />;
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
