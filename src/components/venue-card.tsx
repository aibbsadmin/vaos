/* VenueCard — doc 08, §5. Versión compacta (carrusel) y expandida (selección). */
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Venue } from "@/data/mock-data";
import { Badge } from "@/components/ui";

/** Foto del lugar: gradiente + textura generados, sin assets externos. */
function VenuePhoto({ venue, className }: { venue: Venue; className?: string }) {
  const tint =
    venue.id === "v1" ? ["#2F5233", "#1A2B1E"] :
    venue.id === "v2" ? ["#3A6640", "#243D28"] :
                        ["#1E8449", "#0D1A10"];
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(150deg, ${tint[0]}, ${tint[1]})` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 30%, rgba(243,156,18,0.5) 0, transparent 42%), radial-gradient(circle at 78% 72%, rgba(46,204,113,0.35) 0, transparent 46%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
      <span className="absolute bottom-2 left-3 t-label-sm uppercase text-crema-200/80">
        {venue.city}
      </span>
    </div>
  );
}

export function VenueCard({ venue, compact }: { venue: Venue; compact?: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]",
        compact ? "w-[240px] shrink-0" : "w-full",
      )}
    >
      <VenuePhoto venue={venue} className={compact ? "h-[110px]" : "h-[160px]"} />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="t-display-md truncate text-[var(--text-primary)]">{venue.name}</h3>
            <p className="t-body-sm text-[var(--text-secondary)]">
              {venue.type} · {venue.district}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 t-label-lg text-ambar-400">
            <Star size={13} className="fill-ambar-400 stroke-ambar-400" />
            {venue.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="t-label-lg text-[var(--text-primary)]">{venue.priceRange}</span>
          <span className="t-body-sm text-[var(--text-secondary)]">{venue.visits} visitas</span>
        </div>
        {!compact && (
          <>
            <p className="flex items-center gap-1.5 t-body-sm text-[var(--text-secondary)]">
              <MapPin size={13} /> {venue.address}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge type="success">{venue.hours?.split("·")[0]?.trim()}</Badge>
              {venue.visits >= 10 && <Badge type="pending">❤️ Favorito</Badge>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
