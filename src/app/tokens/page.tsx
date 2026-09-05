// Página de verificación del sistema de diseño (doc 08, §4 "Tokens & Foundations").
const ramps = [
  { name: "Bosque", swatches: [["900", "#0D1A10"], ["800", "#1A2B1E"], ["700", "#243D28"], ["600", "#2F5233"], ["500", "#3A6640"]] },
  { name: "Esmeralda", swatches: [["600", "#1E8449"], ["500", "#27AE60"], ["400", "#2ECC71"], ["100", "#D5F5E3"], ["050", "#EAFAF1"]] },
  { name: "Ámbar", swatches: [["600", "#D68910"], ["500", "#F39C12"], ["400", "#F8C471"], ["100", "#FEF9E7"]] },
  { name: "Neutral", swatches: [["950", "#0A0A0A"], ["800", "#2C2C2C"], ["600", "#5A5A5A"], ["400", "#9E9E9E"], ["200", "#E0E0E0"], ["100", "#F0F0F0"], ["050", "#F8F8F8"]] },
  { name: "Crema", swatches: [["200", "#F5F0E8"], ["100", "#FAF7F2"]] },
  { name: "Rojo", swatches: [["500", "#E74C3C"], ["100", "#FDEDEC"]] },
  { name: "WhatsApp", swatches: [["header", "#128C7E"], ["chat", "#ECE5DD"], ["out", "#DCF8C6"], ["btn", "#25D366"], ["check", "#4FC3F7"]] },
];

const type = [
  ["display/xl", "t-display-xl", "La Palomilla"],
  ["display/lg", "t-display-lg", "Reunión confirmada"],
  ["display/md", "t-display-md", "Almuerzo del viernes"],
  ["heading/lg", "t-heading-lg", "Buenos días, Carlos"],
  ["heading/md", "t-heading-md", "Amigos del trabajo"],
  ["heading/sm", "t-heading-sm", "Carlos Mendoza"],
  ["body/lg", "t-body-lg", "He enviado la propuesta al grupo. Aquí van las respuestas."],
  ["body/md", "t-body-md", "Criolla · Jr. Ancash 149 · Miraflores"],
  ["body/sm", "t-body-sm", "Hace 18 días · 12 visitas"],
  ["label/lg", "t-label-lg", "CONFIRMAR ASISTENCIA"],
  ["label/sm", "t-label-sm", "ALMUERZO · CONFIRMADO"],
  ["mono/sm", "t-mono-sm", "OP 8842-1193-0027"],
];

export default function TokensPage() {
  return (
    <main className="min-h-screen bg-bosque-800 text-crema-200 p-10 space-y-12">
      <div>
        <h1 className="t-display-lg">Amigos — Tokens &amp; Foundations</h1>
        <p className="t-body-md text-neutral-400 mt-1">doc 08 §2 · verificación del sistema de diseño</p>
      </div>

      <section className="space-y-6">
        <h2 className="t-label-sm text-neutral-400 uppercase">Paleta</h2>
        <div className="flex flex-wrap gap-8">
          {ramps.map((r) => (
            <div key={r.name}>
              <div className="t-heading-sm mb-3">{r.name}</div>
              <div className="space-y-2">
                {r.swatches.map(([k, hex]) => (
                  <div key={k} className="flex items-center gap-3">
                    <div className="h-12 w-20 rounded-sm border border-bosque-600" style={{ background: hex }} />
                    <div>
                      <div className="t-label-lg">{k}</div>
                      <div className="t-mono-sm text-neutral-400">{hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="t-label-sm text-neutral-400 uppercase">Tipografía</h2>
        {type.map(([label, cls, sample]) => (
          <div key={label} className="flex items-baseline gap-6 border-b border-bosque-600 pb-4">
            <div className="t-label-sm text-neutral-400 w-24 shrink-0">{label}</div>
            <div className={cls}>{sample}</div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="t-label-sm text-neutral-400 uppercase">Radios y sombras</h2>
        <div className="flex gap-4">
          <div className="h-24 w-24 bg-bosque-700 border border-bosque-600 rounded-sm grid place-items-center t-label-lg">sm 6</div>
          <div className="h-24 w-24 bg-bosque-700 border border-bosque-600 rounded-md grid place-items-center t-label-lg">md 12</div>
          <div className="h-24 w-24 bg-bosque-700 border border-bosque-600 rounded-lg grid place-items-center t-label-lg">lg 16</div>
          <div className="h-24 w-24 bg-bosque-700 border border-bosque-600 rounded-xl grid place-items-center t-label-lg">xl 24</div>
          <div className="h-24 w-24 bg-esmeralda-500 rounded-full grid place-items-center t-label-lg text-white">full</div>
        </div>
        <div className="flex gap-4 pb-6">
          <div className="h-24 w-24 bg-crema-200 text-neutral-950 rounded-md shadow-sm grid place-items-center t-label-lg">sm</div>
          <div className="h-24 w-24 bg-crema-200 text-neutral-950 rounded-md shadow-md grid place-items-center t-label-lg">md</div>
          <div className="h-24 w-24 bg-crema-200 text-neutral-950 rounded-md shadow-lg grid place-items-center t-label-lg">lg</div>
          <div className="h-24 w-24 bg-crema-200 text-neutral-950 rounded-md shadow-float grid place-items-center t-label-lg">float</div>
        </div>
      </section>

    </main>
  );
}
