/* Wrapper de WhatsApp — status bar teal (#128C7E), cuerpo con el fondo del chat. */
import { PhoneFrame } from "@/components/phone-frame";

export default function WhatsAppLayout({ children }: LayoutProps<"/whatsapp">) {
  return (
    <PhoneFrame statusBarTint="dark" statusBarBg="#128C7E" className="bg-[#ECE5DD]">
      {children}
    </PhoneFrame>
  );
}
