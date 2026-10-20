"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import CookieConsent from "@/components/consent/cookie-consent"
import LegalLinksBar from "@/components/legal/legal-links"

/**
 * Landing pages built for standalone Google Ads campaigns. They keep the
 * global nav header and floating WhatsApp button (for site continuity and a
 * persistent contact option) but skip the full footer so the page stays
 * focused on the phone/WhatsApp call-to-action instead of navigating away.
 */
const NO_FOOTER_ROUTES = [
  "/used-tires-edgewater-md",
  "/flat-tire-repair-edgewater-md",
  "/mobile-tire-repair-edgewater-md",
  "/tpms-service-edgewater-md",
  "/tire-mounting-edgewater-md",
  "/tire-balancing-edgewater-md",
  "/tire-rotation-edgewater-md",
  "/rim-cleaning-edgewater-md",
  "/es/llantas-usadas-edgewater-md",
  "/es/reparacion-de-llantas-edgewater-md",
  "/es/sensores-tpms-edgewater-md",
  "/es/limpieza-de-rines-edgewater-md",
  "/es/balanceo-de-llantas-edgewater-md",
  "/es/montaje-de-llantas-edgewater-md",
  "/es/rotacion-de-llantas-edgewater-md",
  "/es/reparacion-movil-de-llantas-edgewater-md",
]

/** Routes that render their own fully standalone page with no site chrome at all. */
const BARE_ROUTES = ["/thank-you", "/es/gracias"]

export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isBare = BARE_ROUTES.includes(pathname)
  const hideFooter = NO_FOOTER_ROUTES.includes(pathname)
  const locale = pathname?.startsWith("/es") ? "es" : "en"

  if (isBare) {
    return (
      <>
        <main>{children}</main>
        <CookieConsent locale={locale} />
      </>
    )
  }

  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      {hideFooter ? <LegalLinksBar locale={locale} /> : <Footer locale={locale} />}
      <WhatsAppButton locale={locale} />
      <CookieConsent locale={locale} />
    </>
  )
}
