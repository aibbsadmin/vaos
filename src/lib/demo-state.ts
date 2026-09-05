"use client";

import { create } from "zustand";

/** Estado global de la demo. Sin backend — todo vive en memoria (doc 07, Tarea 0.7). */

export type MeetingStage = "propuesta" | "votacion" | "confirmado" | "prepedido" | "en-el-lugar" | "cerrado";

export const STAGES: { id: MeetingStage; label: string }[] = [
  { id: "propuesta", label: "Propuesta" },
  { id: "votacion", label: "Votación" },
  { id: "confirmado", label: "Confirmado" },
  { id: "prepedido", label: "Pre-pedido" },
  { id: "en-el-lugar", label: "En el lugar" },
  { id: "cerrado", label: "Cerrado" },
];

interface DemoState {
  /** Etapa alcanzada en el flujo de la reunión. */
  stage: MeetingStage;
  setStage: (s: MeetingStage) => void;

  /** Ítems del pre-pedido: id de MenuItem → cantidad. */
  order: Record<string, number>;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  setOrder: (o: Record<string, number>) => void;
  clearOrder: () => void;

  /** Pago propio confirmado en la pantalla de cuenta. */
  paid: boolean;
  paymentMethod: string | null;
  pay: (method: string) => void;
  resetPayment: () => void;
}

export const useDemo = create<DemoState>((set) => ({
  stage: "confirmado",
  setStage: (stage) => set({ stage }),

  order: {},
  addItem: (id) => set((s) => ({ order: { ...s.order, [id]: (s.order[id] ?? 0) + 1 } })),
  removeItem: (id) =>
    set((s) => {
      const next = { ...s.order };
      const q = (next[id] ?? 0) - 1;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return { order: next };
    }),
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: {} }),

  paid: false,
  paymentMethod: null,
  pay: (paymentMethod) => set({ paid: true, paymentMethod }),
  resetPayment: () => set({ paid: false, paymentMethod: null }),
}));
