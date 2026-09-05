/* AgentMessage — doc 08, §5.
   Burbuja del agente: radius 4px arriba-izquierda, radius/lg en los otros
   tres vértices. Puede contener un componente embebido (VotePanel, VenueCard). */
import * as React from "react";
import { Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AgentMessage({
  children,
  time,
  embed,
  className,
}: {
  children: React.ReactNode;
  time?: string;
  embed?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <Avatar name="Amigos" type="ai-agent" size="sm" className="mt-1" />
      <div className="min-w-0 max-w-[86%]">
        <div
          className="bg-[var(--bg-surface)] px-4 py-3"
          style={{ borderRadius: "4px 16px 16px 16px" }}
        >
          <div className="t-body-lg text-[var(--text-primary)]">{children}</div>
          {embed && (
            <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">{embed}</div>
          )}
        </div>
        {time && <div className="mt-1 t-body-sm text-[var(--text-secondary)]">{time}</div>}
      </div>
    </div>
  );
}

/** Mensaje de una persona del grupo (alineado a la derecha). */
export function PersonMessage({ author, children, time }: { author: string; children: React.ReactNode; time?: string }) {
  return (
    <div className="flex items-start justify-end gap-2">
      <div className="min-w-0 max-w-[80%]">
        <div className="bg-bosque-600 px-4 py-3" style={{ borderRadius: "16px 4px 16px 16px" }}>
          <div className="t-label-sm mb-1 text-esmeralda-400">{author}</div>
          <div className="t-body-md text-[var(--text-primary)]">{children}</div>
        </div>
        {time && <div className="mt-1 text-right t-body-sm text-[var(--text-secondary)]">{time}</div>}
      </div>
      <Avatar name={author} size="sm" className="mt-1" />
    </div>
  );
}

/** Actualización silenciosa del sistema (doc 01, §8.1 "in-app silenciosa"). */
export function SystemNote({ children, time }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-0.5">
      <span className="rounded-full bg-bosque-700/70 px-3 py-1 t-body-sm text-[var(--text-secondary)]">
        {children}
        {time && <span className="ml-2 opacity-60">{time}</span>}
      </span>
    </div>
  );
}
