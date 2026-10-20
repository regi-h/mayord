import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { legalRoutes } from "@/lib/legal/types"
import CookieSettingsButton from "@/components/consent/cookie-settings-button"

export const legalLinkCopy = {
  en: { privacy: "Privacy Policy", cookies: "Cookie Policy", terms: "Terms of Service", settings: "Cookie Settings" },
  es: {
    privacy: "Política de Privacidad",
    cookies: "Política de Cookies",
    terms: "Términos de Servicio",
    settings: "Configuración de cookies",
  },
}

export function LegalLinkList({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = legalLinkCopy[locale]
  const routes = legalRoutes[locale]
  const linkClass = "hover:text-white transition-colors"

  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-brand-text-muted ${className}`}>
      <li>
        <Link href={routes.privacy} className={linkClass}>
          {t.privacy}
        </Link>
      </li>
      <li>
        <Link href={routes.cookies} className={linkClass}>
          {t.cookies}
        </Link>
      </li>
      <li>
        <Link href={routes.terms} className={linkClass}>
          {t.terms}
        </Link>
      </li>
      <li>
        <CookieSettingsButton className={linkClass}>{t.settings}</CookieSettingsButton>
      </li>
    </ul>
  )
}

/** Minimal legal footer for ad landing pages that intentionally hide the full site footer. */
export default function LegalLinksBar({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-brand-surface-light bg-brand-dark px-4 pb-24 pt-6 lg:pb-6">
      <LegalLinkList locale={locale} />
    </footer>
  )
}
