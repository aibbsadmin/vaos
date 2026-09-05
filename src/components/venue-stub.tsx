import Link from "next/link";

export function VenueStub({ title, note }: { title: string; note: string }) {
  return (
    <div className="grid min-h-dvh place-items-center p-8 text-center">
      <div className="max-w-md">
        <h1 className="t-display-lg text-neutral-950">{title}</h1>
        <p className="mt-3 t-body-lg text-[var(--text-secondary)]">{note}</p>
        <Link href="/venue/dashboard" className="mt-6 inline-block t-label-lg text-esmeralda-600 hover:underline">
          ← Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
