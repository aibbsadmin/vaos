"use client";

/* Chrome de WhatsApp — doc 08, §7 y doc 07, Tarea 0.7.
   Colores exactos, no modificar:
     header #128C7E · chat #ECE5DD · burbuja out #DCF8C6 · in #FFFFFF
     doble check #4FC3F7 · botón de flow #25D366
   El azul de los botones de respuesta (#00A5F4) es el de WhatsApp real; el doc
   no lo define, y sin él los botones no se ven como los nativos. */
import * as React from "react";
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Camera, Mic, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

export const WA = {
  headerBg: "#128C7E",
  chatBg: "#ECE5DD",
  bubbleOut: "#DCF8C6",
  bubbleIn: "#FFFFFF",
  checkDouble: "#4FC3F7",
  flowBtn: "#25D366",
  btnText: "#00A5F4",
  meta: "rgba(0,0,0,0.45)",
} as const;

export function WhatsAppHeader() {
  return (
    <header className="z-30 flex shrink-0 items-center gap-3 px-3 py-2" style={{ background: WA.headerBg }}>
      <ArrowLeft size={22} className="shrink-0 text-white" />
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-esmeralda-500">
        <span className="t-heading-sm text-white">A</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate t-heading-sm text-white">Amigos App</span>
          <span
            className="rounded-sm px-1 py-px"
            style={{ background: "rgba(255,255,255,0.22)", fontSize: 9, lineHeight: "12px", color: "#fff" }}
          >
            EMPRESA
          </span>
        </div>
        <div className="t-body-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
          en línea
        </div>
      </div>
      <Video size={20} className="shrink-0 text-white" />
      <Phone size={18} className="shrink-0 text-white" />
      <MoreVertical size={19} className="shrink-0 text-white" />
    </header>
  );
}

/** Barra de composición inferior de WhatsApp. */
export function WhatsAppComposer() {
  return (
    <div className="z-30 flex shrink-0 items-center gap-2 px-2 py-2" style={{ background: WA.chatBg }}>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-sm">
        <Smile size={21} style={{ color: "#8696A0" }} />
        <span className="min-w-0 flex-1 t-body-md" style={{ color: "#8696A0" }}>
          Mensaje
        </span>
        <Plus size={20} style={{ color: "#8696A0" }} />
        <Camera size={20} style={{ color: "#8696A0" }} />
      </div>
      <button
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
        style={{ background: WA.flowBtn }}
        aria-label="Grabar audio"
      >
        <Mic size={20} />
      </button>
    </div>
  );
}

/** Doble check azul de "leído". */
export function DoubleCheck() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-label="Leído">
      <path d="M1 5.6 3.9 8.5 9.6 1.4" stroke={WA.checkDouble} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.8 5.6 8.7 8.5 14.4 1.4" stroke={WA.checkDouble} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Burbuja de chat con cola, idéntica a WhatsApp. */
export function Bubble({
  side,
  children,
  time,
  read,
  className,
  noPad,
}: {
  side: "in" | "out";
  children: React.ReactNode;
  time: string;
  read?: boolean;
  className?: string;
  noPad?: boolean;
}) {
  const out = side === "out";
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[85%] shadow-sm",
          out ? "wa-tail-out mr-2" : "wa-tail-in ml-2",
          noPad ? "p-1" : "px-2.5 pb-1.5 pt-1.5",
          className,
        )}
        style={{
          background: out ? WA.bubbleOut : WA.bubbleIn,
          borderRadius: out ? "7.5px 0 7.5px 7.5px" : "0 7.5px 7.5px 7.5px",
        }}
      >
        <div className={cn(noPad && "px-1.5 pt-1")}>{children}</div>
        <div className={cn("flex items-center justify-end gap-1", noPad ? "px-1.5 pb-1 pt-0.5" : "pt-0.5")}>
          <span style={{ fontSize: 11, lineHeight: "13px", color: WA.meta }}>{time}</span>
          {out && (read ? <DoubleCheck /> : null)}
        </div>
      </div>
    </div>
  );
}

/** Botón interactivo de WhatsApp Business, adosado bajo la burbuja. */
export function WAReplyButton({
  children,
  onClick,
  icon,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-[7.5px] bg-white py-2.5 shadow-sm transition-opacity",
        disabled ? "opacity-55" : "active:opacity-70",
      )}
      style={{ color: WA.btnText, fontSize: 15, fontWeight: 500 }}
    >
      {icon}
      {children}
    </button>
  );
}

/** Separador de fecha del chat. */
export function WADateChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center py-1">
      <span
        className="rounded-md px-3 py-1 shadow-sm"
        style={{ background: "#E1F2FB", color: "#54656F", fontSize: 12.5, lineHeight: "17px" }}
      >
        {children}
      </span>
    </div>
  );
}
