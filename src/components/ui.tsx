/* Primitivos del sistema de diseño — doc 08, §5 "Componentes base". */
import * as React from "react";
import { cn, avatarColor } from "@/lib/utils";

/* ---------------------------------- Avatar --------------------------------- */
const AVATAR_SIZE = { sm: 24, md: 32, lg: 40, xl: 56 } as const;

export function Avatar({
  name,
  size = "md",
  type = "initials",
  online,
  className,
}: {
  name: string;
  size?: keyof typeof AVATAR_SIZE;
  type?: "initials" | "ai-agent";
  online?: boolean;
  className?: string;
}) {
  const px = AVATAR_SIZE[size];
  const isAgent = type === "ai-agent";
  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: px, height: px }}>
      <span
        className={cn(
          "grid h-full w-full place-items-center rounded-full text-white",
          size === "sm" || size === "md" ? "t-label-sm" : "t-heading-sm",
        )}
        style={{ background: isAgent ? "#27AE60" : avatarColor(name) }}
      >
        {isAgent ? (
          <svg width={px * 0.5} height={px * 0.5} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
          </svg>
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </span>
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-[var(--bg-primary)] bg-esmeralda-400"
          style={{ width: 8, height: 8 }}
        />
      )}
    </span>
  );
}

/** Avatares apilados — usado en CircleRow y en el hero de reunión confirmada.
    `ring` debe coincidir con el fondo sobre el que se apoya el stack. */
export function AvatarStack({
  names,
  size = "sm",
  max = 4,
  ring = "var(--bg-surface)",
}: {
  names: string[];
  size?: keyof typeof AVATAR_SIZE;
  max?: number;
  ring?: string;
}) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  const px = AVATAR_SIZE[size];
  const overlap = -Math.round(px / 4);
  return (
    <span className="flex items-center">
      {shown.map((n, i) => (
        <span
          key={n + i}
          className="rounded-full"
          style={{ marginLeft: i ? overlap : 0, boxShadow: `0 0 0 2px ${ring}` }}
        >
          <Avatar name={n} size={size} />
        </span>
      ))}
      {rest > 0 && (
        <span
          className="grid place-items-center rounded-full bg-bosque-600 t-label-sm text-neutral-400"
          style={{ width: px, height: px, marginLeft: overlap, boxShadow: `0 0 0 2px ${ring}` }}
        >
          +{rest}
        </span>
      )}
    </span>
  );
}

/* ---------------------------------- Badge ---------------------------------- */
const BADGE_STYLES = {
  success: { background: "#D5F5E3", color: "#1E8449" },
  pending: { background: "#FEF9E7", color: "#D68910" },
  error:   { background: "#FDEDEC", color: "#E74C3C" },
  info:    { background: "#2F5233", color: "#F5F0E8" },
  neutral: { background: "#F0F0F0", color: "#5A5A5A" },
} as const;

export function Badge({
  children,
  type = "neutral",
  size = "sm",
  className,
}: {
  children: React.ReactNode;
  type?: keyof typeof BADGE_STYLES;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full",
        size === "sm" ? "h-5 px-2 t-label-sm" : "h-6 px-3 t-label-lg",
        className,
      )}
      style={BADGE_STYLES[type]}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- Button --------------------------------- */
const BTN_SIZE = { sm: "h-9 px-4 t-label-lg", md: "h-11 px-5 t-label-lg", lg: "h-13 px-6 t-label-lg" } as const;

export function Button({
  children,
  variant = "primary",
  size = "md",
  full,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: keyof typeof BTN_SIZE;
  full?: boolean;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-150",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
        BTN_SIZE[size],
        full && "w-full",
        variant === "primary" && "bg-esmeralda-500 text-white hover:bg-esmeralda-600",
        variant === "secondary" &&
          "border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
        variant === "ghost" && "bg-transparent text-esmeralda-400 hover:bg-bosque-700",
        variant === "destructive" && "bg-rojo-500 text-white hover:brightness-90",
        className,
      )}
      style={size === "lg" ? { height: 52 } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------------- Card ----------------------------------- */
export function Card({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Label de sección — label/sm en text/secondary, tal como pide el doc 08. */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("t-label-sm uppercase text-[var(--text-secondary)]", className)}>{children}</div>;
}
