/* Panel del local — modo claro (doc 08, §8). Desktop 1440×900, con nav
   superior en móvil para que el panel siga siendo navegable desde el teléfono. */
import { VenueSidebar, VenueTopBar } from "@/components/venue-sidebar";

export default function VenueLayout({ children }: LayoutProps<"/venue">) {
  return (
    <div className="light-mode flex min-h-dvh bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <VenueSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <VenueTopBar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
