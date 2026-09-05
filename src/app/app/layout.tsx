/* Wrapper de la app móvil: chrome del teléfono + modo oscuro (bg bosque-800). */
import { PhoneFrame } from "@/components/phone-frame";

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <PhoneFrame className="bg-[var(--bg-primary)]">
      {children}
    </PhoneFrame>
  );
}
