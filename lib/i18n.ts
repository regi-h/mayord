import type { NavLink } from "@/lib/data"

export type Locale = "en" | "es"

/**
 * Canonical EN → ES route pairs. Used to build the language switcher and
 * hreflang alternates. Only pages that have a real Spanish translation are
 * listed here — pages without a Spanish counterpart fall back to the
 * Spanish or English homepage.
 */
export const ROUTE_PAIRS: [string, string][] = [
  ["/", "/es"],
  ["/tires", "/es/llantas"],
  ["/services", "/es/servicios"],
  ["/about", "/es/nosotros"],
  ["/blog", "/es/blog"],
  ["/contact", "/es/contacto"],
  ["/thank-you", "/es/gracias"],
  ["/used-tires-edgewater-md", "/es/llantas-usadas-edgewater-md"],
  ["/flat-tire-repair-edgewater-md", "/es/reparacion-de-llantas-edgewater-md"],
  ["/mobile-tire-service-edgewater-md", "/es/servicio-movil-de-llantas-edgewater-md"],
  ["/tpms-service-edgewater-md", "/es/sensores-tpms-edgewater-md"],
  ["/privacy-policy", "/es/politica-de-privacidad"],
  ["/cookie-policy", "/es/politica-de-cookies"],
  ["/terms-of-service", "/es/terminos-de-servicio"],
]

const EN_TO_ES = new Map(ROUTE_PAIRS)
const ES_TO_EN = new Map(ROUTE_PAIRS.map(([en, es]) => [es, en]))

/** Given the current pathname, return the equivalent page in the other language. */
export function getAlternatePath(pathname: string): string {
  if (pathname.startsWith("/es")) {
    return ES_TO_EN.get(pathname) ?? "/"
  }
  return EN_TO_ES.get(pathname) ?? "/es"
}

/** Build the { "en-US": ..., "es-US": ... } alternates map for a page's metadata. */
export function localeAlternates(enPath: string) {
  const esPath = EN_TO_ES.get(enPath)
  if (!esPath) return undefined
  return { "en-US": enPath, "es-US": esPath, "x-default": enPath }
}

export function esLocaleAlternates(esPath: string) {
  const enPath = ES_TO_EN.get(esPath)
  if (!enPath) return undefined
  return { "en-US": enPath, "es-US": esPath, "x-default": enPath }
}

export const esNavLinks: NavLink[] = [
  { href: "/es", label: "INICIO" },
  { href: "/es/llantas", label: "LLANTAS" },
  {
    href: "/es/servicios",
    label: "SERVICIOS",
    submenu: [
      { href: "/es/servicios", label: "Todos los Servicios" },
      {
        href: "/es/servicio-movil-de-llantas-edgewater-md",
        label: "Servicio Móvil de Llantas",
      },
    ],
  },
  { href: "/es/nosotros", label: "NOSOTROS" },
  { href: "/es/blog", label: "BLOG" },
  { href: "/es/contacto", label: "CONTÁCTENOS" },
]
