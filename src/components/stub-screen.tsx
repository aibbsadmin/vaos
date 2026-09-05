import Link from "next/link";
import { TabBar } from "@/components/app-nav";

/** Pantalla no incluida en la Fase 0 — evita 404 desde el tab bar. */
export function StubScreen({ title, note }: { title: string; note: string }) {
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col justify-center px-8 text-center">
        <h1 className="t-display-md text-[var(--text-primary)]">{title}</h1>
        <p className="mt-3 t-body-md text-[var(--text-secondary)]">{note}</p>
        <Link href="/app/home" className="mt-6 t-label-lg text-esmeralda-400 hover:text-esmeralda-500">
          ← Volver a Inicio
        </Link>
      </div>
      <TabBar />
    </>
  );
}
