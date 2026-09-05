# Amigos App — Demo visual (Fase 0)

Demo interactiva que simula la experiencia de Amigos App en tres canales:
app móvil del organizador, WhatsApp Business del invitado, y panel del local.

Referencias: `~/vaos/docs/` — el doc **08** es la ley del diseño, el doc **07** el plan de tareas.

## Correr

```bash
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Rutas

| Ruta | Pantalla | doc 08 |
|---|---|---|
| `/` | Landing · selector de rol | Tarea 0.5 |
| `/app/home` | P1.1 Inicio / feed de círculos | §6 Pantalla 01 |
| `/app/meeting/new` | P1.2 Nueva propuesta | §6 Pantalla 02 |
| `/app/meeting/voting` | **P1.3 Panel de votación** | §6 Pantalla 03 |
| `/app/meeting/confirmed` | P1.4 Reunión confirmada | §6 Pantalla 04 |
| `/app/meeting/menu` | P1.5 Pre-pedido / carta | §6 Pantalla 05 |
| `/app/meeting/checkin` | Check-in y pedido en mesa | §6 Pantalla 06 |
| `/app/meeting/account` | P1.6 Cuenta y pago | §6 Pantalla 07 |
| `/app/meeting/recap` | Cierre / resumen | §6 Pantalla 08 |
| `/app/ai-chat` | Chat con el agente IA | §6 Pantalla 09 |
| `/whatsapp/chat` | **P2.1–P2.4 · secuencia completa** | §7 WA-01…04 |
| `/whatsapp/flow-*` | Cada Flow por separado | §7 WA-02/03/04 |
| `/venue/dashboard` | P3.1 Dashboard del local | §8 B2B-01 |
| `/venue/orders` | P3.2 Cola de pedidos | §8 B2B-02 |
| `/tokens` | Verificación del sistema de diseño | §4 |

`/whatsapp/chat` es la secuencia de 8 pasos de la Tarea 0.7, clickeable de
principio a fin: invitación → Flow de confirmación → recordatorio → Flow de
pre-pedido → mensaje de cobro → Flow de pago → pago exitoso.

## Sistema de diseño

Todos los tokens del doc 08 §2 viven en `src/styles/tokens.css`, y se exponen
como utilidades de Tailwind desde el bloque `@theme` de `src/app/globals.css`.
La escala tipográfica está en clases `.t-display-xl`, `.t-heading-md`, etc.

Fuentes vía `next/font/google`: **Fraunces** (display, variable con eje óptico),
**Plus Jakarta Sans** (body/UI), **JetBrains Mono** (referencias de pago).

## Desvíos del doc 07, y por qué

1. **Tailwind v4 en lugar de v3.** El scaffolding actual de Next.js instala
   Tailwind 4, que no usa `tailwind.config.ts` sino `@theme` en CSS. Se
   implementaron los mismos tokens con la sintaxis v4; los nombres de utilidad
   (`bg-bosque-800`, `font-fraunces`, `rounded-xl`) son idénticos a los del doc.

2. **Sin shadcn/ui.** El doc 08 §5 da specs propias de Avatar, Badge, Button,
   PersonChip, VenueCard y AgentMessage que difieren de los defaults de shadcn,
   y su sistema de CSS vars compite con los tokens de Amigos. Los primitivos se
   construyeron directo contra el doc 08 (`src/components/ui.tsx`).

3. **Color extra en WhatsApp: `#00A5F4`.** Es el azul de los botones de
   respuesta de WhatsApp real. El doc 07 fija seis colores de WhatsApp y no
   incluye este; sin él los botones interactivos no se ven como los nativos,
   que es el criterio explícito del doc ("indistinguible del WA real").

4. **Paleta de avatares de 5 colores, no 6.** El sexto del doc era neutral-600
   (`#5A5A5A`), que junto a los vivos lee como "deshabilitado". Los cinco
   restantes son todos de la paleta.

5. **Placeholders de foto en tonos cálidos.** Las fotos de platos y lugares usan
   gradientes de ámbar/rojo/crema de la paleta. Con los verdes del sistema se
   funden con el fondo bosque y leen como card vacía.

6. **Ruta `~/vaos/amigos-demo/`**, no `~/amigos-app/amigos-demo/` como dice el
   doc 07 — según indicación directa.

## Pendiente

- **Tarea 0.8** — archivo Figma vía MCP (requiere el `planKey`).
- **Tarea 0.9** — deploy en Vercel.
