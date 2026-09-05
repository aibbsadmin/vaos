"use client";

/* P2.1–P2.4 · Tarea 0.7 — Secuencia completa de WhatsApp, clickeable.
   Todo con useState, sin backend. doc 08 §7 (WA-01 a WA-04) y doc 07 Tarea 0.7.

   Secuencia:
     1 invitación + 3 botones → 2 Flow de confirmación → 3 confirmación en chat
     → 4 recordatorio 2h antes + carta → 5 Flow de pre-pedido → 6 mensaje de cobro
     → 7 Flow de pago Yape → 8 pago exitoso                                        */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, X, CalendarDays, CreditCard, UtensilsCrossed, RotateCcw } from "lucide-react";
import {
  WA, WhatsAppHeader, WhatsAppComposer, Bubble, WAReplyButton, WADateChip,
} from "@/components/whatsapp-frame";
import { FlowConfirm, FlowMenu, FlowPayment } from "@/components/wa-flows";
import { soles } from "@/lib/utils";

type Step =
  | "invite" | "confirmed" | "reminder" | "ordered" | "billed" | "paid";

const ORDER: Step[] = ["invite", "confirmed", "reminder", "ordered", "billed", "paid"];
const at = (s: Step, min: Step) => ORDER.indexOf(s) >= ORDER.indexOf(min);

/** Imagen del restaurante dentro de la burbuja — 260×140, radius/md. */
function VenueImage() {
  return (
    <div
      className="relative h-[140px] w-full overflow-hidden rounded-md"
      style={{ background: "linear-gradient(150deg, #2F5233, #14210F)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24% 26%, rgba(243,156,18,0.55) 0, transparent 44%), radial-gradient(circle at 76% 74%, rgba(46,204,113,0.4) 0, transparent 48%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/65 to-transparent" />
      <div className="absolute bottom-3 left-3.5">
        <div className="t-display-md text-crema-200">La Palomilla</div>
        <div className="t-body-sm text-crema-200/75">Criolla · Miraflores</div>
      </div>
    </div>
  );
}

export default function WhatsAppChat() {
  const [step, setStep] = useState<Step>("invite");
  const [flow, setFlow] = useState<null | "confirm" | "menu" | "pay">(null);
  const [note, setNote] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const MY_TOTAL = 58;

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [step, flow]);

  return (
    <>
      <WhatsAppHeader />

      <div ref={scroller} className="wa-pattern min-h-0 flex-1 space-y-2 overflow-y-auto no-scrollbar px-2 py-3">
        <WADateChip>HOY</WADateChip>

        {/* 1 — Invitación con imagen del restaurante */}
        <Bubble side="in" time="10:04" noPad className="w-[280px]">
          <VenueImage />
          <div className="mt-1.5 space-y-1.5" style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
            <p>
              🍽️ <strong>Almuerzo del viernes</strong>
            </p>
            <p>
              Carlos te invita a <strong>La Palomilla</strong> el viernes 26 a las 12:30.
              <br />
              Ana y Luis ya confirmaron. ¿Puedes ir?
            </p>
          </div>
        </Bubble>

        {/* Botones interactivos bajo la burbuja */}
        {step === "invite" && (
          <div className="ml-2 w-[280px] space-y-[3px] animate-rise">
            <WAReplyButton icon={<Check size={17} />} onClick={() => setFlow("confirm")}>
              Voy al almuerzo
            </WAReplyButton>
            <WAReplyButton icon={<X size={17} />} disabled>
              No puedo ir
            </WAReplyButton>
            <WAReplyButton icon={<CalendarDays size={16} />} disabled>
              Proponer otro día
            </WAReplyButton>
          </div>
        )}

        {/* 2 → 3 — Confirmación */}
        {at(step, "confirmed") && (
          <>
            <Bubble side="out" time="10:06" read>
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                ✅ Voy al almuerzo{note && ` — ${note}`}
              </span>
            </Bubble>

            <Bubble side="in" time="10:06">
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                ¡Perfecto! Reserva confirmada para 4 en La Palomilla 🎉
                <br />
                Te recuerdo el viernes a las 10:30.
              </span>
            </Bubble>
          </>
        )}

        {/* 4 — Recordatorio 2h antes con la carta */}
        {at(step, "confirmed") && (
          <>
            <WADateChip>VIERNES 26</WADateChip>
            <Bubble side="in" time="10:30">
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                ⏰ El almuerzo es en 2 horas.
                <br />
                ¿Adelantas tu pedido? La cocina lo prepara para cuando llegues.
              </span>
            </Bubble>
          </>
        )}

        {step === "confirmed" && (
          <div className="ml-2 w-[280px] space-y-[3px] animate-rise">
            <WAReplyButton icon={<UtensilsCrossed size={16} />} onClick={() => setFlow("menu")}>
              Ver la carta y pre-pedir
            </WAReplyButton>
            <WAReplyButton disabled>Pido cuando llegue</WAReplyButton>
          </div>
        )}

        {/* 5 → 6 — Pre-pedido confirmado */}
        {at(step, "ordered") && (
          <>
            <Bubble side="out" time="10:33" read>
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                Pedido confirmado · {soles(orderTotal)}
              </span>
            </Bubble>
            <Bubble side="in" time="10:33">
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                Anotado 👌 La Palomilla ya tiene tu pedido.
                <br />
                Mesa interior, zona tranquila. Nos vemos a las 12:30.
              </span>
            </Bubble>
          </>
        )}

        {/* 6 — Mensaje de cobro tipo "order details" (WA-04) */}
        {at(step, "billed") && (
          <>
            <WADateChip>13:52</WADateChip>
            <Bubble side="in" time="13:52" noPad className="w-[280px]">
              <div
                className="rounded-md border border-black/10"
                style={{ background: "#F7F8FA", color: "#111B21" }}
              >
                <div className="border-b border-black/8 px-3.5 py-2.5">
                  <span className="t-heading-sm">💳 Tu parte del almuerzo</span>
                </div>
                <div className="px-3.5 py-2.5">
                  {[["Lomo saltado", 38], ["Agua mineral", 5], ["Vino compartido", 15]].map(([l, v]) => (
                    <div key={l as string} className="flex justify-between py-1" style={{ fontSize: 14.5 }}>
                      <span>{l}</span>
                      <span className="tabular-nums">{soles(v as number)}</span>
                    </div>
                  ))}
                  <div className="mt-1.5 flex justify-between border-t border-black/10 pt-2.5">
                    <span className="t-heading-sm">TOTAL</span>
                    <span className="t-heading-md tabular-nums">{soles(MY_TOTAL)}</span>
                  </div>
                </div>
              </div>
            </Bubble>
          </>
        )}

        {step === "billed" && (
          <div className="ml-2 w-[280px] space-y-[3px] animate-rise">
            <WAReplyButton onClick={() => setFlow("pay")}>🟣 Pagar con Yape</WAReplyButton>
            <WAReplyButton icon={<CreditCard size={16} />} disabled>
              Otras opciones
            </WAReplyButton>
          </div>
        )}

        {/* 8 — Pago exitoso */}
        {at(step, "paid") && (
          <>
            <Bubble side="out" time="13:58" read>
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                Pagado {soles(MY_TOTAL)} por Yape ✅
              </span>
            </Bubble>
            <Bubble side="in" time="13:58">
              <span style={{ color: "#111B21", fontSize: 15, lineHeight: "20px" }}>
                Recibido 🎉 Ya son 3 de 4 pagados.
                <br />
                Te guardé el comprobante <strong>OP YP-4471-2098</strong>.
                <br />
                <br />
                ¿Quieres la carta completa y pedir desde tu mesa la próxima vez?
              </span>
            </Bubble>
            <div className="ml-2 w-[280px] space-y-[3px] animate-rise">
              <Link href="/app/home" className="block">
                <WAReplyButton>Descargar Amigos App</WAReplyButton>
              </Link>
              <WAReplyButton icon={<RotateCcw size={15} />} onClick={() => { setStep("invite"); setNote(""); }}>
                Reiniciar la demo
              </WAReplyButton>
            </div>
          </>
        )}
      </div>

      <WhatsAppComposer />

      {/* Flows — modales slide-up sobre el chat */}
      {flow === "confirm" && (
        <FlowConfirm
          onClose={() => setFlow(null)}
          onDone={(_, n) => {
            setNote(n);
            setStep("confirmed");
            setFlow(null);
          }}
        />
      )}
      {flow === "menu" && (
        <FlowMenu
          onClose={() => setFlow(null)}
          onDone={(total) => {
            setOrderTotal(total);
            setStep("ordered");
            setFlow(null);
            setTimeout(() => setStep("billed"), 900);
          }}
        />
      )}
      {flow === "pay" && (
        <FlowPayment
          amount={MY_TOTAL}
          onClose={() => setFlow(null)}
          onDone={() => {
            setStep("paid");
            setFlow(null);
          }}
        />
      )}
    </>
  );
}
