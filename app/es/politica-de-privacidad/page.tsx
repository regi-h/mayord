import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { privacyPolicy } from "@/lib/legal/privacy"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidad",
  description:
    "Cómo Mayo RD Tire Shop en Edgewater, MD recopila, usa y protege su información personal, y cómo ejercer sus derechos de privacidad.",
  path: "/es/politica-de-privacidad",
  locale: "es",
})

export default function PoliticaDePrivacidadPage() {
  return <LegalPage doc={privacyPolicy.es} locale="es" />
}
