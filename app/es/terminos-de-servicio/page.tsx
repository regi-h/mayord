import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { termsOfService } from "@/lib/legal/terms"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Términos de Servicio",
  description:
    "Términos que aplican al sitio web de Mayo RD Tire Shop, cotizaciones, llantas usadas y servicio móvil de llantas en Edgewater, MD.",
  path: "/es/terminos-de-servicio",
  locale: "es",
})

export default function TerminosDeServicioPage() {
  return <LegalPage doc={termsOfService.es} locale="es" />
}
