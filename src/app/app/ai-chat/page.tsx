"use client";

/* Chat con el agente IA. doc 08, §6 Pantalla 09.
   Misma lógica que P1.3 pero sin el flujo de votación: el agente propone. */
import { useState } from "react";
import Link from "next/link";
import { Send, Sparkles } from "lucide-react";
import { ScreenHeader, TabBar } from "@/components/app-nav";
import { AgentMessage, PersonMessage } from "@/components/ai-message";
import { VenueCard } from "@/components/venue-card";
import { venues, quickPrompts } from "@/data/mock-data";

export default function AiChatScreen() {
  const [asked, setAsked] = useState<string | null>(null);

  return (
    <>
      <ScreenHeader
        title="🤖 Amigos"
        subtitle={<span className="text-[var(--text-secondary)]">Tu asistente social</span>}
        back="/app/home"
      />

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto no-scrollbar border-t border-[var(--border-subtle)] px-5 py-5">
        <AgentMessage time="09:12">
          Buenos días, Carlos. Hace 18 días que los amigos del trabajo no se juntan, y los
          viernes son su día habitual. ¿Los convoco para este viernes en La Palomilla?
        </AgentMessage>

        <div className="flex flex-wrap gap-2 pl-9">
          <Link
            href="/app/meeting/voting"
            className="rounded-full bg-esmeralda-500 px-4 py-2.5 t-label-lg text-white transition-colors hover:bg-esmeralda-600"
          >
            Sí, envía la propuesta
          </Link>
          <Link
            href="/app/meeting/new"
            className="rounded-full border border-[var(--border-default)] px-4 py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]"
          >
            Elegir otro día o lugar
          </Link>
        </div>

        {/* Sugerencia de lugar nuevo — VenueCard embebida en la burbuja */}
        <AgentMessage time="09:14" embed={<VenueCard venue={venues[1]} />}>
          Han ido 3 veces seguidas a La Palomilla. Si quieren algo nuevo, El Bodegón encaja con
          el presupuesto del grupo y está a 6 cuadras.
        </AgentMessage>

        <AgentMessage time="09:15">
          Ojo: el cumpleaños de Ana es el 3 de octubre. ¿Preparo algo para esa semana?
        </AgentMessage>

        {asked && (
          <>
            <PersonMessage author="Carlos" time="09:16">
              {asked}
            </PersonMessage>
            <AgentMessage time="09:16">
              {asked.includes("pagado")
                ? "Del almuerzo del viernes faltan Carlos y Pedro: S/ 58.00 y S/ 52.00. ¿Les mando un recordatorio amable?"
                : asked.includes("Convoca")
                  ? "Listo, preparé la invitación para los 4 del último almuerzo. Te la muestro antes de enviarla."
                  : "El viernes a las 12:30 en La Palomilla, Miraflores. Ana y Luis ya confirmaron; Pedro no ha respondido."}
            </AgentMessage>
          </>
        )}
      </div>

      {/* Sugerencias rápidas + input */}
      <div className="shrink-0 border-t border-[var(--border-subtle)] px-5 pb-3 pt-3">
        <div className="-mx-5 mb-3 flex gap-2 overflow-x-auto no-scrollbar px-5">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => setAsked(q)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 t-label-lg text-[var(--text-primary)] transition-colors hover:border-esmeralda-500"
            >
              <Sparkles size={12} className="text-esmeralda-400" />
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2 pl-4 pr-2">
          <input
            placeholder="Pregúntale a tu agente…"
            className="min-w-0 flex-1 bg-transparent t-body-md text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]"
          />
          <button aria-label="Enviar" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-esmeralda-500 text-white">
            <Send size={15} />
          </button>
        </div>
      </div>

      <TabBar />
    </>
  );
}
