import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { cookiePolicy } from "@/lib/legal/cookies"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Política de Cookies",
  description:
    "Las cookies que Mayo RD Tire Shop usa en este sitio, para qué sirven y cómo cambiar sus preferencias en cualquier momento.",
  path: "/es/politica-de-cookies",
  locale: "es",
})

export default function PoliticaDeCookiesPage() {
  return <LegalPage doc={cookiePolicy.es} locale="es" />
}
