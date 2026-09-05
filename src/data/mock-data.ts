/* ============================================================
   Amigos App — Datos de la demo
   Fuente: doc 07_CLAUDE_CODE_INSTRUCTIONS.md, Tarea 0.4
   Toda la demo se alimenta de aquí: debe ser coherente de
   principio a fin (mismo almuerzo, mismas personas, mismos montos).
   ============================================================ */

export type ParticipantStatus = "confirmed" | "pending" | "rejected" | "organizer";

export interface Circle {
  id: string;
  name: string;
  emoji: string;
  members: string[];
  lastMeeting: number;
  usualVenue: string;
  meetingType: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  district: string;
  type: string;
  priceRange: string;
  rating: number;
  visits: number;
  address?: string;
  hours?: string;
  note?: string;
}

export interface Participant {
  id: string;
  name: string;
  initials: string;
  status: ParticipantStatus;
  date: string | null;
  payment: "Yape" | "Nequi" | "Plin" | "Tarjeta" | "Efectivo";
  usual?: string;
  reason?: string;
  isMe?: boolean;
  arrived?: boolean;
  dietary?: string;
}

// ---------------------------------------------------------------
// CÍRCULOS
// ---------------------------------------------------------------
export const circles: Circle[] = [
  {
    id: "c1",
    name: "Amigos del trabajo",
    emoji: "💼",
    members: ["Carlos", "Ana", "Pedro", "María", "Luis"],
    lastMeeting: 18,
    usualVenue: "La Palomilla",
    meetingType: "Almuerzo",
  },
  {
    id: "c2",
    name: "Gym squad",
    emoji: "💪",
    members: ["Rodrigo", "Valeria", "Sebastián"],
    lastMeeting: 7,
    usualVenue: "La Lucha",
    meetingType: "Desayuno post-gym",
  },
  {
    id: "c3",
    name: "U de Lima promo",
    emoji: "🎓",
    members: ["Daniela", "Joaquín", "Camila", "Andrés", "+3"],
    lastMeeting: 45,
    usualVenue: "Central",
    meetingType: "Cena",
  },
];

// ---------------------------------------------------------------
// LUGARES (Lima y Bogotá)
// ---------------------------------------------------------------
export const venues: Venue[] = [
  {
    id: "v1",
    name: "La Palomilla",
    city: "Lima",
    district: "Miraflores",
    type: "Criolla",
    priceRange: "S/ 35–55",
    rating: 4.3,
    visits: 12,
    address: "Jr. Ancash 149, Miraflores",
    hours: "Abierto · cierra a las 17:00",
    note: "Mesa del fondo, junto a la ventana",
  },
  {
    id: "v2",
    name: "El Bodegón",
    city: "Lima",
    district: "Miraflores",
    type: "Peruana contemporánea",
    priceRange: "S/ 45–75",
    rating: 4.6,
    visits: 3,
    address: "Av. Alcanfores 290, Miraflores",
    hours: "Abierto · cierra a las 23:00",
  },
  {
    id: "v3",
    name: "Salvo Patria",
    city: "Bogotá",
    district: "Chapinero",
    type: "Colombiana moderna",
    priceRange: "COP 45,000–80,000",
    rating: 4.5,
    visits: 5,
    address: "Calle 54A #4-13, Chapinero",
    hours: "Abierto · cierra a las 22:00",
  },
];

// ---------------------------------------------------------------
// PARTICIPANTES
// ---------------------------------------------------------------
export const participants: Participant[] = [
  {
    id: "u1", name: "Carlos", initials: "C", status: "confirmed",
    date: "viernes", payment: "Yape", usual: "Lomo saltado + Agua mineral",
    isMe: true, arrived: true,
  },
  {
    id: "u2", name: "Ana", initials: "A", status: "confirmed",
    date: "viernes", payment: "Nequi", usual: "Menú del día + Chicha morada",
    arrived: true, dietary: "Sin gluten",
  },
  {
    id: "u3", name: "Pedro", initials: "P", status: "pending",
    date: null, payment: "Plin", usual: "Ceviche mixto", arrived: false,
  },
  {
    id: "u4", name: "María", initials: "M", status: "rejected",
    date: null, payment: "Yape", reason: "Solo puede el martes",
  },
  {
    id: "u5", name: "Luis", initials: "L", status: "organizer",
    date: "viernes", payment: "Tarjeta", usual: "Ají de gallina + Agua mineral",
    arrived: false,
  },
];

// Los 4 que finalmente van al almuerzo (María queda fuera: solo podía el martes)
export const attendees: Participant[] = participants.filter((p) => p.id !== "u4");

export const me: Participant = participants[0];

// ---------------------------------------------------------------
// REUNIÓN ACTIVA
// ---------------------------------------------------------------
export const activeMeeting = {
  id: "mtg_demo_001",
  title: "Almuerzo de trabajo",
  circle: "Amigos del trabajo",
  date: "Viernes 26 de septiembre",
  dateShort: "Viernes 26",
  time: "12:30",
  venue: venues[0],
  participants,
  status: "confirmed" as const,
  reservation: { confirmed: true, table: "Interior, zona tranquila", pax: 4 },
  reminders: ["Jueves 25 · 19:00 (víspera)", "Viernes 26 · 10:30 (2h antes)"],
  account: {
    total: 196.0,
    split: {
      Carlos: { items: ["Lomo saltado", "Agua mineral", "1/4 Vino tinto"], subtotal: 58.0 },
      Ana:    { items: ["Menú del día", "Chicha morada", "1/4 Vino tinto"], subtotal: 45.0 },
      Pedro:  { items: ["Ceviche mixto", "Inka Cola", "Postre", "1/4 Vino"], subtotal: 52.0 },
      Luis:   { items: ["Ají de gallina", "Agua mineral", "1/4 Vino tinto"], subtotal: 41.0 },
    } as Record<string, { items: string[]; subtotal: number }>,
    shared: [{ item: "Vino tinto Tabernero", price: 60.0, split: 4 }],
    paid: ["Ana", "Luis"],
    pending: ["Carlos", "Pedro"],
  },
};

// Desglose línea a línea de mi cuenta (pantalla P1.6)
export const myBill = [
  { label: "Lomo saltado", amount: 38.0 },
  { label: "Agua mineral", amount: 5.0 },
  { label: "Vino tinto Tabernero (1/4)", amount: 15.0 },
];
export const myTotal = myBill.reduce((s, l) => s + l.amount, 0);

// ---------------------------------------------------------------
// OPCIONES DE FECHA EN VOTACIÓN
// ---------------------------------------------------------------
export const dateOptions = [
  { id: "d1", label: "Viernes 26", time: "12:30", suggested: true, votes: ["Carlos", "Ana", "Luis"] },
  { id: "d2", label: "Martes 30", time: "13:00", suggested: false, votes: ["María"] },
];

// ---------------------------------------------------------------
// MENÚ DEL LOCAL
// ---------------------------------------------------------------
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  popular?: boolean;
  isUsual?: boolean;
  shared?: boolean;
  allergen?: string;
}

export const venueMenu: { venue_id: string; sections: { name: string; items: MenuItem[] }[] } = {
  venue_id: "v1",
  sections: [
    {
      name: "Entradas",
      items: [
        { id: "m1", name: "Causa limeña", description: "Papa amarilla, atún, palta", price: 22.0, popular: true },
        { id: "m2", name: "Ceviche clásico", description: "Corvina, limón, ají amarillo, choclo", price: 28.0, popular: true },
      ],
    },
    {
      name: "Platos de fondo",
      items: [
        { id: "m3", name: "Lomo saltado", description: "Lomo fino, papas fritas, arroz", price: 38.0, popular: true, isUsual: true },
        { id: "m4", name: "Ají de gallina", description: "Pechuga deshilachada, pan, nueces, arroz", price: 32.0, allergen: "Contiene gluten" },
        { id: "m5", name: "Menú del día", description: "Entrada + plato + bebida + postre", price: 28.0, popular: true },
      ],
    },
    {
      name: "Bebidas",
      items: [
        { id: "m6", name: "Agua mineral", price: 5.0, isUsual: true },
        { id: "m7", name: "Chicha morada", price: 8.0 },
        { id: "m8", name: "Inka Cola", price: 6.0 },
        { id: "m9", name: "Vino tinto Tabernero", description: "Por botella — para compartir", price: 60.0, shared: true },
      ],
    },
    {
      name: "Postres",
      items: [
        { id: "m10", name: "Arroz con leche", price: 12.0 },
        { id: "m11", name: "Postre del día", price: 14.0 },
      ],
    },
  ],
};

// "Lo de siempre" de Carlos en La Palomilla
export const usualOrder = {
  items: [
    { id: "m3", name: "Lomo saltado", price: 38.0 },
    { id: "m6", name: "Agua mineral", price: 5.0 },
  ],
  total: 43.0,
  venue: "La Palomilla",
};

// ---------------------------------------------------------------
// MÉTODOS DE PAGO (Perú + Colombia — doc 00 §9)
// ---------------------------------------------------------------
export const paymentMethods = [
  { id: "yape",     name: "Yape",     emoji: "🟣", market: "Perú",     brand: "#742284" },
  { id: "plin",     name: "Plin",     emoji: "🔵", market: "Perú",     brand: "#00A0DF" },
  { id: "nequi",    name: "Nequi",    emoji: "💜", market: "Colombia", brand: "#200020" },
  { id: "tarjeta",  name: "Tarjeta",  emoji: "💳", market: "Ambos",    brand: "#2C2C2C" },
  { id: "efectivo", name: "Efectivo", emoji: "💵", market: "Ambos",    brand: "#1E8449" },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];

// Estado de pagos del grupo (pantalla P1.6)
export const groupPayments = [
  { name: "Ana",    status: "paid" as const,    method: "Nequi",    amount: 45.0, ref: "NQ-8842-1193" },
  { name: "Luis",   status: "paid" as const,    method: "Efectivo", amount: 41.0, ref: "—" },
  { name: "Carlos", status: "pending" as const, method: "Yape",     amount: 58.0, ref: "—", isMe: true },
  { name: "Pedro",  status: "pending" as const, method: "Plin",     amount: 52.0, ref: "—" },
];

// ---------------------------------------------------------------
// MENSAJES DEL AGENTE IA (pantallas P1.3 y P4.1)
// ---------------------------------------------------------------
export const agentThread = [
  { id: "a1", from: "agent" as const, time: "10:04",
    text: "He enviado la propuesta al grupo. Aquí iré actualizando las respuestas.", panel: "votes" as const },
  { id: "a2", from: "system" as const, time: "10:07", text: "✅ Ana confirmó — Viernes" },
  { id: "a3", from: "system" as const, time: "10:15", text: "✅ Luis confirmó — Viernes" },
  { id: "a4", from: "user" as const, time: "10:22",
    text: "el viernes no puedo, ¿pueden el martes?", author: "María" },
  { id: "a5", from: "agent" as const, time: "10:23",
    text: "3 de 4 confirman el viernes. María propone el martes y Pedro aún no responde. ¿Confirmamos el viernes sin María, o esperamos?",
    actions: ["Confirmar viernes (3)", "Esperar a María", "Cambiar fecha"] },
];

export const aiChatThread = [
  { id: "q1", from: "agent" as const, time: "09:12",
    text: "Buenos días, Carlos. Hace 18 días que los amigos del trabajo no se juntan, y los viernes son su día habitual. ¿Los convoco para este viernes en La Palomilla?",
    actions: ["Sí, envía la propuesta", "Elegir otro día o lugar", "No esta semana"] },
  { id: "q2", from: "agent" as const, time: "09:14",
    text: "Han ido 3 veces seguidas a La Palomilla. Si quieren algo nuevo, El Bodegón encaja con el presupuesto del grupo y está a 6 cuadras.",
    venue: "v2" as const },
  { id: "q3", from: "agent" as const, time: "09:15",
    text: "Ojo: el cumpleaños de Ana es el 3 de octubre. ¿Preparo algo para esa semana?" },
];

export const quickPrompts = [
  "¿Dónde vamos el viernes?",
  "Convoca al grupo",
  "¿Quién no ha pagado?",
  "Sorpréndeme con un lugar",
];

// ---------------------------------------------------------------
// PANEL DEL LOCAL — B2B (doc 08 §8)
// ---------------------------------------------------------------
export const venueDashboard = {
  venueName: "La Palomilla",
  date: "Viernes 26 de septiembre",
  kpis: [
    { label: "Reservas hoy", value: "8", delta: "+2 vs. viernes pasado" },
    { label: "Grupos confirmados", value: "6", delta: "75% de confirmación" },
    { label: "Pre-pedidos recibidos", value: "24", delta: "ítems en cocina" },
    { label: "Ticket promedio", value: "S/ 52.00", delta: "+S/ 6 vs. mes anterior" },
  ],
  reservations: [
    { hour: "12:00", group: "Familia Rojas",       pax: 6, table: "M1", status: "confirmed" as const },
    { hour: "12:30", group: "Amigos del trabajo",  pax: 4, table: "M4", status: "arriving" as const, highlight: true },
    { hour: "13:00", group: "Estudio Vera & Co.",  pax: 8, table: "M7", status: "confirmed" as const },
    { hour: "13:30", group: "Gym squad",           pax: 3, table: "M2", status: "pending" as const },
    { hour: "14:00", group: "Carla + 1",           pax: 2, table: "M3", status: "confirmed" as const },
    { hour: "19:30", group: "U de Lima promo",     pax: 7, table: "M7", status: "confirmed" as const },
    { hour: "20:00", group: "Cumpleaños Valeria",  pax: 5, table: "M5", status: "pending" as const },
    { hour: "20:30", group: "Los del barrio",      pax: 4, table: "M6", status: "confirmed" as const },
  ],
  nextGroup: {
    name: "Amigos del trabajo",
    pax: 4,
    time: "12:30",
    arrived: 2,
    items: [
      { qty: 1, name: "Lomo saltado" },
      { qty: 1, name: "Menú del día" },
      { qty: 1, name: "Ceviche mixto" },
      { qty: 1, name: "Ají de gallina" },
      { qty: 2, name: "Agua mineral" },
      { qty: 1, name: "Chicha morada" },
      { qty: 1, name: "Vino tinto Tabernero" },
    ],
    alert: "Ana tiene alergia al gluten — confirmar el ají de gallina con cocina.",
  },
};

export const venueOrders = {
  nuevos: [
    { table: "M4", group: "Amigos del trabajo", minutes: 2,  color: "#27AE60",
      items: [{ qty: 1, name: "Lomo saltado" }, { qty: 1, name: "Agua mineral" }] },
    { table: "M2", group: "Gym squad", minutes: 4, color: "#F39C12",
      items: [{ qty: 2, name: "Causa limeña" }, { qty: 3, name: "Chicha morada" }] },
  ],
  preparacion: [
    { table: "M1", group: "Familia Rojas", minutes: 12, color: "#2ECC71",
      items: [{ qty: 3, name: "Ceviche clásico" }, { qty: 2, name: "Menú del día" }, { qty: 1, name: "Inka Cola" }] },
    { table: "M7", group: "Estudio Vera & Co.", minutes: 7, color: "#1E8449",
      items: [{ qty: 4, name: "Menú del día" }, { qty: 2, name: "Ají de gallina" }] },
  ],
  listos: [
    { table: "M3", group: "Carla + 1", minutes: 1, color: "#3A6640",
      items: [{ qty: 1, name: "Causa limeña" }, { qty: 1, name: "Arroz con leche" }] },
  ],
  alert: "Mesa M4 — Ana tiene alergia al gluten. Confirmar con cocina antes de servir.",
};

// ---------------------------------------------------------------
// POST SUGERIDO POR LA IA (pantalla de cierre)
// ---------------------------------------------------------------
export const suggestedPost = {
  caption: "Viernes de lomo saltado con los mejores 🍽️ La Palomilla nunca falla.",
  alt: "18 días sin vernos y volvimos a la mesa de siempre. Miraflores, 12:30, los cuatro.",
  credit: "Generado por Amigos · toca para editar",
};
