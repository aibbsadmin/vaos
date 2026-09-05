"use client";

/* Chrome del teléfono — viewport 390×844 (iPhone 14 Pro), doc 08 §6.
   Safe area: status bar 54px arriba, home indicator 34px abajo. */
import * as React from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
  bare = false,
  statusBarTint = "light",
}: {
  children: React.ReactNode;
  className?: string;
  /** Sin marco físico — para embeber la pantalla a pantalla completa en móvil real. */
  bare?: boolean;
  statusBarTint?: "light" | "dark";
}) {
  const screen = (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}>
      <StatusBar tint={statusBarTint} />
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      <HomeIndicator tint={statusBarTint} />
    </div>
  );

  if (bare) return <div className="h-dvh w-full">{screen}</div>;

  return (
    <div className="grid min-h-dvh place-items-center bg-bosque-900 p-6">
      <div
        className="relative shrink-0 rounded-[46px] bg-neutral-950 p-[10px] shadow-float ring-1 ring-white/10"
        style={{ width: 390 + 20, height: 844 + 20 }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[36px]">{screen}</div>
      </div>
    </div>
  );
}

/** Barra de estado iOS de 54px con Dynamic Island. */
export function StatusBar({ tint = "light" }: { tint?: "light" | "dark" }) {
  const fg = tint === "light" ? "text-[var(--text-primary)]" : "text-white";
  return (
    <div className={cn("relative z-30 flex h-[54px] shrink-0 items-center justify-between px-7 pt-2", fg)}>
      <span className="t-label-lg tabular-nums">12:24</span>
      <div className="absolute left-1/2 top-[10px] h-[30px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex items-center gap-1.5">
        {/* señal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          <rect x="0" y="7.5" width="3" height="3.5" rx="1" />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="1" />
          <rect x="9" y="3" width="3" height="8" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
          <path d="M8 10.6 5.9 8.4a3 3 0 0 1 4.2 0L8 10.6ZM3.8 6.3a6 6 0 0 1 8.4 0l-1.4 1.4a4 4 0 0 0-5.6 0L3.8 6.3ZM1.6 4.1a9 9 0 0 1 12.8 0L13 5.5a7 7 0 0 0-10 0L1.6 4.1Z" />
        </svg>
        {/* batería */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
          <path d="M23 4v4a2.1 2.1 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

/** Home indicator de 34px. */
export function HomeIndicator({ tint = "light" }: { tint?: "light" | "dark" }) {
  return (
    <div className="relative z-30 grid h-[34px] shrink-0 place-items-center">
      <div className={cn("h-[5px] w-[134px] rounded-full", tint === "light" ? "bg-crema-200/40" : "bg-black/25")} />
    </div>
  );
}
