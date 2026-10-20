import type { Locale } from "@/lib/i18n"

export const LEGAL_LAST_UPDATED = { en: "October 19, 2026", es: "19 de octubre de 2026" }

export const legalRoutes: Record<Locale, { privacy: string; cookies: string; terms: string }> = {
  en: {
    privacy: "/privacy-policy",
    cookies: "/cookie-policy",
    terms: "/terms-of-service",
  },
  es: {
    privacy: "/es/politica-de-privacidad",
    cookies: "/es/politica-de-cookies",
    terms: "/es/terminos-de-servicio",
  },
}

export interface LegalTable {
  headers: string[]
  rows: string[][]
}

export interface LegalSection {
  id: string
  heading: string
  paragraphs?: string[]
  list?: string[]
  table?: LegalTable
  showCookieSettings?: boolean
}

export interface LegalDocument {
  label: string
  title: string
  intro: string
  sections: LegalSection[]
}
