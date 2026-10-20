"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import { trackFormLead } from "@/lib/gtag"

const SHOP_SMS_NUMBER = "2405958547"

const copy = {
  en: {
    sizeLabel: "Tire size or vehicle",
    sizePlaceholder: "e.g. 205/55R16 or 2018 Honda Civic",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone",
    phonePlaceholder: "(240) 555-0123",
    submit: "TEXT ME",
    footer: (phone: string) => `Or call ${phone} — we answer 7 days a week.`,
    smsBody: (size: string, name: string, phone: string) =>
      `Hi Mayo RD Tire Shop, I'd like to check availability on used tires. Tire size/vehicle: ${size}. Name: ${name}. My number: ${phone}.`,
    thankYouHref: "/thank-you",
    consentPre: "We'll only use your info to reply to this request. Msg & data rates may apply. ",
    privacyLink: "Privacy Policy",
    privacyHref: "/privacy-policy",
  },
  es: {
    sizeLabel: "Medida de llanta o vehículo",
    sizePlaceholder: "ej. 205/55R16 o Honda Civic 2018",
    nameLabel: "Nombre",
    namePlaceholder: "Su nombre",
    phoneLabel: "Teléfono",
    phonePlaceholder: "(240) 555-0123",
    submit: "ENVÍENME UN MENSAJE",
    footer: (phone: string) => `O llame al ${phone} — contestamos los 7 días de la semana.`,
    smsBody: (size: string, name: string, phone: string) =>
      `Hola Mayo RD Tire Shop, quisiera verificar disponibilidad de llantas usadas. Medida/vehículo: ${size}. Nombre: ${name}. Mi número: ${phone}.`,
    thankYouHref: "/es/gracias",
    consentPre: "Solo usaremos sus datos para responder a esta solicitud. Pueden aplicarse tarifas de mensajes y datos. ",
    privacyLink: "Política de Privacidad",
    privacyHref: "/es/politica-de-privacidad",
  },
}

export default function QuoteForm({
  label = "landing_used_tires",
  locale = "en",
}: {
  label?: string
  locale?: Locale
}) {
  const router = useRouter()
  const [size, setSize] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const t = copy[locale]

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!size.trim() || !name.trim() || !phone.trim()) return

    // Fire the Google Ads lead conversion — this is a qualified lead.
    trackFormLead(label)

    // Pre-fill the visitor's SMS composer to the shop (mobile-first ads audience).
    const body = encodeURIComponent(t.smsBody(size.trim(), name.trim(), phone.trim()))
    window.open(`sms:${SHOP_SMS_NUMBER}?body=${body}`, "_self")

    // Send the visitor to the conversion confirmation page.
    router.push(t.thankYouHref)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-brand-surface border border-brand-surface-light p-6 sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="q-size"
            className="mb-1.5 block font-label text-sm font-bold tracking-wide text-white"
          >
            {t.sizeLabel}
          </label>
          <input
            id="q-size"
            type="text"
            required
            maxLength={120}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder={t.sizePlaceholder}
            className="w-full rounded-lg border border-brand-surface-light bg-brand-dark px-4 py-3 text-white placeholder:text-brand-text-muted/70 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label
            htmlFor="q-name"
            className="mb-1.5 block font-label text-sm font-bold tracking-wide text-white"
          >
            {t.nameLabel}
          </label>
          <input
            id="q-name"
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full rounded-lg border border-brand-surface-light bg-brand-dark px-4 py-3 text-white placeholder:text-brand-text-muted/70 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label
            htmlFor="q-phone"
            className="mb-1.5 block font-label text-sm font-bold tracking-wide text-white"
          >
            {t.phoneLabel}
          </label>
          <input
            id="q-phone"
            type="tel"
            required
            maxLength={25}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            className="w-full rounded-lg border border-brand-surface-light bg-brand-dark px-4 py-3 text-white placeholder:text-brand-text-muted/70 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-brand-orange px-6 py-4 font-label text-lg font-bold text-white transition-colors hover:bg-brand-orange-hover"
      >
        {t.submit}
      </button>
      <p className="mt-3 text-center text-sm text-brand-text-muted">
        {t.footer(siteConfig.phone)}
      </p>
      <p className="mt-2 text-center text-xs leading-relaxed text-brand-text-muted">
        {t.consentPre}
        <Link href={t.privacyHref} className="underline underline-offset-2 hover:text-white">
          {t.privacyLink}
        </Link>
      </p>
    </form>
  )
}
