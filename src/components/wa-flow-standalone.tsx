"use client";

/* Entrada directa a un WhatsApp Flow, sobre el fondo del chat.
   Las rutas /whatsapp/flow-* existen para presentar cada Flow por separado;
   el recorrido real vive en /whatsapp/chat. */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WhatsAppHeader, WhatsAppComposer } from "@/components/whatsapp-frame";
import { FlowConfirm, FlowMenu, FlowPayment } from "@/components/wa-flows";

export function WAFlowStandalone({ flow }: { flow: "confirm" | "menu" | "pay" }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const back = () => router.push("/whatsapp/chat");

  return (
    <>
      <WhatsAppHeader />
      <div className="wa-pattern min-h-0 flex-1" />
      <WhatsAppComposer />
      {open && flow === "confirm" && <FlowConfirm onClose={() => { setOpen(false); back(); }} onDone={back} />}
      {open && flow === "menu" && <FlowMenu onClose={() => { setOpen(false); back(); }} onDone={back} />}
      {open && flow === "pay" && (
        <FlowPayment amount={58} onClose={() => { setOpen(false); back(); }} onDone={back} />
      )}
    </>
  );
}
