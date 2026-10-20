"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Cookie, ShieldCheck, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { legalRoutes } from "@/lib/legal/types"
import {
  OPEN_CONSENT_EVENT,
  hasGlobalPrivacyControl,
  readConsent,
  saveConsent,
} from "@/lib/consent"

const copy = {
  en: {
    bannerLabel: "Cookie notice",
    title: "Your privacy, your call",
    body: "We use essential cookies to run this site. With your permission we also use Google Analytics and Google Ads cookies to see which pages and ads help drivers find us. We never sell your information.",
    policy: "Cookie Policy",
    accept: "Accept all",
    reject: "Reject non-essential",
    manage: "Manage preferences",
    dialogTitle: "Cookie preferences",
    dialogBody: "Choose which cookies we can use. You can change this anytime from \"Cookie Settings\" in the footer.",
    close: "Close",
    necessary: "Strictly necessary",
    necessaryDesc: "Keeps the site secure and remembers this choice. Always on.",
    alwaysOn: "Always on",
    analytics: "Analytics",
    analyticsDesc: "Google Analytics — helps us understand which pages are useful.",
    marketing: "Marketing",
    marketingDesc: "Google Ads — measures calls and quote requests that came from our ads.",
    gpc: "Your browser sent a Global Privacy Control signal, so marketing cookies start turned off.",
    save: "Save choices",
  },
  es: {
    bannerLabel: "Aviso de cookies",
    title: "Su privacidad, su decisión",
    body: "Usamos cookies esenciales para que este sitio funcione. Con su permiso también usamos cookies de Google Analytics y Google Ads para saber qué páginas y anuncios ayudan a los conductores a encontrarnos. Nunca vendemos su información.",
    policy: "Política de Cookies",
    accept: "Aceptar todas",
    reject: "Rechazar no esenciales",
    manage: "Gestionar preferencias",
    dialogTitle: "Preferencias de cookies",
    dialogBody: "Elija qué cookies podemos usar. Puede cambiarlo en cualquier momento desde \"Configuración de cookies\" en el pie de página.",
    close: "Cerrar",
    necessary: "Estrictamente necesarias",
    necessaryDesc: "Mantienen el sitio seguro y recuerdan esta elección. Siempre activas.",
    alwaysOn: "Siempre activas",
    analytics: "Analítica",
    analyticsDesc: "Google Analytics — nos ayuda a entender qué páginas son útiles.",
    marketing: "Marketing",
    marketingDesc: "Google Ads — mide las llamadas y cotizaciones que provienen de nuestros anuncios.",
    gpc: "Su navegador envió una señal Global Privacy Control, por eso las cookies de marketing comienzan desactivadas.",
    save: "Guardar preferencias",
  },
}

function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex flex-col gap-1">
        <span id={`${id}-label`} className="font-label font-bold text-white">
          {label}
        </span>
        <span id={`${id}-desc`} className="text-sm leading-relaxed text-brand-text-muted">
          {description}
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 h-7 w-12 flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface ${
          checked ? "bg-brand-orange" : "bg-brand-surface-light"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 h-5 w-5 rounded-full bg-brand-text transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}

export default function CookieConsent({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [gpc, setGpc] = useState(false)

  useEffect(() => {
    const saved = readConsent()
    setGpc(hasGlobalPrivacyControl())
    if (saved) {
      setAnalytics(saved.analytics)
      setMarketing(saved.marketing)
    } else {
      setBannerVisible(true)
    }

    const open = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      dialogRef.current?.showModal()
    }
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  function commit(next: { analytics: boolean; marketing: boolean }) {
    saveConsent(next)
    setAnalytics(next.analytics)
    setMarketing(next.marketing)
    setBannerVisible(false)
    dialogRef.current?.close()
  }

  function openPreferences() {
    dialogRef.current?.showModal()
  }

  return (
    <>
      {bannerVisible && (
        <section
          aria-label={t.bannerLabel}
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-brand-surface-light bg-brand-surface p-5 shadow-2xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:rounded-2xl sm:border"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                <Cookie size={18} aria-hidden="true" />
              </span>
              <h2 className="font-heading text-lg font-bold text-white">{t.title}</h2>
            </div>
            <p className="text-sm leading-relaxed text-brand-text-muted">
              {t.body}{" "}
              <Link
                href={legalRoutes[locale].cookies}
                className="font-medium text-brand-text underline underline-offset-4 hover:text-brand-orange"
              >
                {t.policy}
              </Link>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => commit({ analytics: false, marketing: false })}
                className="rounded-lg bg-brand-surface-light px-4 py-3 font-label text-sm font-bold text-white transition-colors hover:bg-brand-text hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                {t.reject}
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: true, marketing: true })}
                className="rounded-lg bg-brand-orange px-4 py-3 font-label text-sm font-bold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.accept}
              </button>
            </div>
            <button
              type="button"
              onClick={openPreferences}
              className="self-start font-label text-sm font-bold tracking-wide text-brand-text underline underline-offset-4 hover:text-brand-orange"
            >
              {t.manage}
            </button>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-brand-surface-light bg-brand-surface p-0 text-brand-text backdrop:bg-brand-dark/80 backdrop:backdrop-blur-sm"
      >
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault()
            commit({ analytics, marketing })
          }}
          className="flex flex-col gap-2 p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-dialog-title" className="font-heading text-xl font-bold text-white">
              {t.dialogTitle}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full p-1 text-brand-text-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <X size={20} aria-hidden="true" />
              <span className="sr-only">{t.close}</span>
            </button>
          </div>
          <p className="text-sm leading-relaxed text-brand-text-muted">{t.dialogBody}</p>

          <div className="mt-2 flex flex-col divide-y divide-brand-surface-light border-y border-brand-surface-light">
            <div className="flex items-start justify-between gap-4 py-4">
              <div className="flex flex-col gap-1">
                <span className="font-label font-bold text-white">{t.necessary}</span>
                <span className="text-sm leading-relaxed text-brand-text-muted">{t.necessaryDesc}</span>
              </div>
              <span className="mt-1 flex flex-shrink-0 items-center gap-1 font-label text-xs font-bold text-brand-orange">
                <ShieldCheck size={16} aria-hidden="true" />
                {t.alwaysOn}
              </span>
            </div>
            <Toggle
              id="consent-analytics"
              checked={analytics}
              onChange={setAnalytics}
              label={t.analytics}
              description={t.analyticsDesc}
            />
            <Toggle
              id="consent-marketing"
              checked={marketing}
              onChange={setMarketing}
              label={t.marketing}
              description={t.marketingDesc}
            />
          </div>

          {gpc && <p className="text-xs leading-relaxed text-brand-text-muted">{t.gpc}</p>}

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => commit({ analytics: false, marketing: false })}
              className="rounded-lg bg-brand-surface-light px-4 py-3 font-label text-sm font-bold text-white transition-colors hover:bg-brand-text hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {t.reject}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-orange px-4 py-3 font-label text-sm font-bold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.save}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
