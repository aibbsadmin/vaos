"use client";

/* Sidebar de 240px fijo — doc 08, §8 B2B-01. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, ChefHat, Users, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/venue/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/venue/reservations", label: "Reservas", Icon: CalendarCheck },
  { href: "/venue/orders", label: "Pedidos", Icon: ChefHat },
  { href: "/venue/crm", label: "CRM", Icon: Users },
  { href: "/venue/menu", label: "Carta", Icon: BookOpen },
  { href: "/venue/analytics", label: "Analítica", Icon: BarChart3 },
];

export function VenueSidebar() {
  const path = usePathname();
  return (
    <aside className="sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col border-r border-[var(--border-subtle)] bg-white p-4 lg:flex">
      <Link href="/" className="mb-1 flex items-center gap-2.5 px-2 py-2">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-bosque-800 t-heading-sm text-crema-200">
          A
        </span>
        <span className="t-display-md text-neutral-950">Amigos</span>
      </Link>
      <div className="mb-5 px-2">
        <div className="t-heading-sm text-neutral-950">La Palomilla</div>
        <div className="t-body-sm text-[var(--text-secondary)]">Miraflores · Plan Pro Local</div>
      </div>

      <nav className="space-y-1">
        {NAV.map(({ href, label, Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 t-label-lg transition-colors",
                active
                  ? "bg-esmeralda-100 text-esmeralda-600"
                  : "text-[var(--text-secondary)] hover:bg-neutral-100",
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-md border border-[var(--border-subtle)] p-3">
        <div className="t-label-sm uppercase text-[var(--text-secondary)]">Hoy</div>
        <div className="mt-1 t-heading-md text-neutral-950">8 reservas · 26 cubiertos</div>
      </div>
    </aside>
  );
}

/** Navegación superior para móvil — el sidebar se oculta bajo lg. */
export function VenueTopBar() {
  const path = usePathname();
  return (
    <div className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-white lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-bosque-800 t-label-lg text-crema-200">
            A
          </span>
          <span className="t-heading-sm text-neutral-950">La Palomilla</span>
        </Link>
        <span className="t-body-sm text-[var(--text-secondary)]">Plan Pro Local</span>
      </div>
      <nav className="flex gap-4 overflow-x-auto no-scrollbar px-4">
        {NAV.map(({ href, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "shrink-0 border-b-2 pb-2.5 t-label-lg transition-colors",
                active ? "border-esmeralda-500 text-esmeralda-600" : "border-transparent text-[var(--text-secondary)]",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
