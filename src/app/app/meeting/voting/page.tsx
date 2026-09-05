"use client";

/* P1.3 — Chat del agente / Panel de votación (organizador).
   doc 08, §6 Pantalla 03 — "ESTA ES LA PANTALLA CENTRAL". */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Paperclip, MoreHorizontal } from "lucide-react";
import { ScreenHeader } from "@/components/app-nav";
import { AgentMessage, PersonMessage, SystemNote } from "@/components/ai-message";
import { VotePanel, MeetingProgress } from "@/components/vote-panel";
import { participants } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: "propuesta", label: "Propuesta" },
  { id: "votacion", label: "Votación" },
  { id: "confirmado", label: "Confirmado" },
];

export default function VotingScreen() {
  const router = useRouter();
  const [resolved, setResolved] = useState(false);
  const thread = useRef<HTMLDivElement>(null);

  // El mensaje más reciente es la acción pendiente: abrir el hilo abajo.
  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: "smooth" });
  }, [resolved]);

  return (
    <>
      <ScreenHeader
        title="Almuerzo del viernes"
        subtitle={
          resolved ? (
            <span className="text-esmeralda-400">4 invitados · confirmado</span>
          ) : (
            <span className="text-ambar-400">4 invitados · en progreso</span>
          )
        }
        back="/app/home"
        right={
          <button aria-label="Más opciones" className="text-[var(--text-secondary)]">
            <MoreHorizontal size={20} />
          </button>
        }
      />

      {/* Barra de progreso de la reunión — doc 01, §9 */}
      <div className="shrink-0 px-5 pb-4">
        <MeetingProgress stages={STAGES} current={resolved ? 2 : 1} />
      </div>

      {/* Hilo */}
      <div ref={thread} className="min-h-0 flex-1 space-y-4 overflow-y-auto no-scrollbar border-t border-[var(--border-subtle)] px-5 py-5">
        <AgentMessage time="10:04" embed={<VotePanel people={participants} />}>
          He enviado la propuesta al grupo. Aquí van las respuestas:
        </AgentMessage>

        <SystemNote time="10:07">✅ Ana confirmó — Viernes</SystemNote>
        <SystemNote time="10:15">✅ Luis confirmó — Viernes</SystemNote>

        <PersonMessage author="María" time="10:22">
          el viernes no puedo, ¿pueden el martes?
        </PersonMessage>

        <AgentMessage time="10:23">
          3 de 4 confirman el viernes. María propone el martes y Pedro aún no responde.
          <br />
          <span className="text-esmeralda-400">¿Confirmamos el viernes sin María, o esperamos?</span>
        </AgentMessage>

        {/* ActionButtons — chips debajo de la burbuja, no dentro (doc 08 Pantalla 03) */}
        {!resolved ? (
          <div className="flex flex-wrap gap-2 pl-9 animate-rise">
            <button
              onClick={() => setResolved(true)}
              className="rounded-full bg-esmeralda-500 px-4 py-2.5 t-label-lg text-white transition-colors hover:bg-esmeralda-600"
            >
              Confirmar viernes (3)
            </button>
            <button className="rounded-full border border-[var(--border-default)] px-4 py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]">
              Esperar a María
            </button>
            <button className="rounded-full border border-[var(--border-default)] px-4 py-2.5 t-label-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]">
              Cambiar fecha
            </button>
          </div>
        ) : (
          <>
            <SystemNote time="10:24">✅ Confirmaste el viernes 26 · 12:30</SystemNote>
            <AgentMessage time="10:24">
              Listo. Reserva pedida a La Palomilla para 4 personas, mesa interior.
              Le avisé a María que quedó fuera esta vez y que la incluyo en la próxima.
              <br />
              <button
                onClick={() => router.push("/app/meeting/confirmed")}
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-esmeralda-500 px-4 py-2.5 t-label-lg text-white transition-colors hover:bg-esmeralda-600"
              >
                Ver la agenda confirmada →
              </button>
            </AgentMessage>
          </>
        )}
      </div>

      {/* Input al grupo */}
      <div className="shrink-0 border-t border-[var(--border-subtle)] px-5 pb-[46px] pt-3">
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2 pl-4 pr-2">
          <input
            placeholder="Escribe algo al grupo…"
            className={cn(
              "min-w-0 flex-1 bg-transparent t-body-md text-[var(--text-primary)] outline-none",
              "placeholder:text-[var(--text-secondary)]",
            )}
          />
          <button aria-label="Adjuntar" className="shrink-0 text-[var(--text-secondary)]">
            <Paperclip size={18} />
          </button>
          <button
            aria-label="Enviar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-esmeralda-500 text-white"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
