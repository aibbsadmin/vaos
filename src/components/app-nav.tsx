"use client";

/* Tab bar inferior (82px) y header de pantalla — doc 01 §2, doc 08 §6 Pantalla 01. */
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, CalendarDays, MapPin, User, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/app/home", label: "Inicio", Icon: Home },
  { href: "/app/circles", label: "Círculos", Icon: Users },
  { href: "/app/meeting/confirmed", label: "Reuniones", Icon: CalendarDays },
  { href: "/app/places", label: "Lugares", Icon: MapPin },
  { href: "/app/profile", label: "Perfil", Icon: User },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="z-20 flex h-[82px] shrink-0 items-start justify-around border-t border-[var(--border-subtle)] bg-bosque-900/95 px-2 pt-3 backdrop-blur">
      {TABS.map(({ href, label, Icon }) => {
        const active = path === href || (href === "/app/meeting/confirmed" && path.startsWith("/app/meeting"));
        return (
          <Link
            key={href}
            href={href}
            className="flex w-[68px] flex-col items-center gap-1.5 rounded-md py-1 transition-colors"
          >
            <Icon size={21} className={active ? "text-esmeralda-400" : "text-[var(--text-secondary)]"} strokeWidth={active ? 2.3 : 1.8} />
            <span className={cn("t-label-sm", active ? "text-esmeralda-400" : "text-[var(--text-secondary)]")}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  back = "/app/home",
  close,
  right,
}: {
  title: string;
  subtitle?: React.ReactNode;
  back?: string | false;
  close?: string;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="z-20 flex shrink-0 items-center gap-3 px-5 pb-3 pt-1">
      {back !== false && (
        <button
          onClick={() => (typeof back === "string" ? router.push(back) : router.back())}
          aria-label="Volver"
          className="-ml-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-bosque-700"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="t-heading-md truncate text-[var(--text-primary)]">{title}</h1>
        {subtitle && <div className="t-body-sm truncate">{subtitle}</div>}
      </div>
      {right}
      {close && (
        <Link
          href={close}
          aria-label="Cerrar"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-bosque-700"
        >
          <X size={20} />
        </Link>
      )}
    </header>
  );
}
