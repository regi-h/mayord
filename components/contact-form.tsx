"use client"

import { useState } from "react"
import { Check, Clock, MessageCircle, Phone, Send } from "lucide-react"
import { siteConfig, whatsappHref } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import { trackPhoneCall, trackWhatsApp, trackFormLead } from "@/lib/gtag"

const interestOptionsByLocale = {
  en: [
    "Used Tires",
    "New Tires",
    "Flat Tire Repair",
    "Mobile Tire Assistance",
    "Mounting & Balancing",
    "Tire Rotation",
    "TPMS Sensors / Sensor Light On",
    "Rim Cleaning",
    "Other",
  ],
  es: [
    "Llantas Usadas",
    "Llantas Nuevas",
    "Reparación de Ponchadura",
    "Asistencia Móvil de Llantas",
    "Montaje y Balanceo",
    "Rotación de Llantas",
    "Sensores TPMS / Luz de Sensor Encendida",
    "Limpieza de Rines",
    "Otro",
  ],
}

// Interests that need immediate phone dispatch rather than a form submission.
const urgentInterests = new Set([
  "Flat Tire Repair",
  "Mobile Tire Assistance",
  "Reparación de Ponchadura",
  "Asistencia Móvil de Llantas",
])

const confirmationHoursByLocale = {
  en: [
    { day: "Mon - Wed", time: "8:00 AM - 6:30 PM" },
    { day: "Thursday", time: "8:00 AM - 6:00 PM" },
    { day: "Friday", time: "8:00 AM - 6:30 PM" },
    { day: "Saturday", time: "8:00 AM - 6:30 PM" },
    { day: "Sunday", time: "9:00 AM - 4:00 PM" },
  ],
  es: [
    { day: "Lun - Mié", time: "8:00 AM - 6:30 PM" },
    { day: "Jueves", time: "8:00 AM - 6:00 PM" },
    { day: "Viernes", time: "8:00 AM - 6:30 PM" },
    { day: "Sábado", time: "8:00 AM - 6:30 PM" },
    { day: "Domingo", time: "9:00 AM - 4:00 PM" },
  ],
}

const t = {
  en: {
    whatsappMessage: "Hi! I'd like a quote on tires.",
    successTitle: "Thanks! Your quote request is in.",
    successBody:
      "We reply within the hour during business hours. Prefer to talk now? Give us a call or send a WhatsApp message.",
    callOrText: "CALL OR TEXT",
    hablamos: "Hablamos Español",
    whatsappUs: "WHATSAPP US",
    hours: "HOURS",
    name: "Name",
    namePlaceholder: "Your name",
    phoneLabel: "Phone — we'll call or text you back",
    vehicle: "Tire size or vehicle",
    vehiclePlaceholder: "e.g. 205/55R16 or 2018 Honda Civic",
    interestLabel: "I am interested in...",
    selectOption: "Select an option",
    messageLabel: "Message",
    optional: "(optional)",
    messagePlaceholder: "Tell us what you need...",
    emailLabel: "Email",
    urgentPre: "Need help right now? Don't wait for the form — call us: ",
    urgentPost: ". Mobile service is dispatched by phone.",
    sending: "SENDING...",
    submit: "GET MY QUOTE",
    footerPre: "We reply within the hour during business hours. Prefer to talk? Call ",
    footerPost: " — Hablamos Español.",
    errorMessage: "We couldn't send your request. Please try again.",
  },
  es: {
    whatsappMessage: "¡Hola! Me gustaría una cotización de llantas.",
    successTitle: "¡Gracias! Recibimos su solicitud de cotización.",
    successBody:
      "Respondemos dentro de una hora en horario de atención. ¿Prefiere hablar ahora? Llámenos o envíenos un mensaje por WhatsApp.",
    callOrText: "LLAME O ESCRIBA",
    hablamos: "Hablamos Español",
    whatsappUs: "ESCRÍBANOS POR WHATSAPP",
    hours: "HORARIO",
    name: "Nombre",
    namePlaceholder: "Su nombre",
    phoneLabel: "Teléfono — le llamamos o escribimos de vuelta",
    vehicle: "Medida de llanta o vehículo",
    vehiclePlaceholder: "ej. 205/55R16 o Honda Civic 2018",
    interestLabel: "Estoy interesado en...",
    selectOption: "Seleccione una opción",
    messageLabel: "Mensaje",
    optional: "(opcional)",
    messagePlaceholder: "Cuéntenos qué necesita...",
    emailLabel: "Correo electrónico",
    urgentPre: "¿Necesita ayuda ahora mismo? No espere el formulario — llámenos: ",
    urgentPost: ". El servicio móvil se despacha por teléfono.",
    sending: "ENVIANDO...",
    submit: "QUIERO MI COTIZACIÓN",
    footerPre: "Respondemos dentro de una hora en horario de atención. ¿Prefiere hablar? Llame ",
    footerPost: " — Hablamos Español.",
    errorMessage: "No pudimos enviar su solicitud. Por favor, inténtelo de nuevo.",
  },
}

const inputClasses =
  "w-full bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-xl px-4 py-3.5 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all font-semibold"

export default function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)
  const [interest, setInterest] = useState("")

  const c = t[locale]
  const interestOptions = interestOptionsByLocale[locale]
  const confirmationHours = confirmationHoursByLocale[locale]
  const CONTACT_WHATSAPP_MESSAGE = c.whatsappMessage
  const showUrgentAlert = urgentInterests.has(interest)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Prevent duplicate submissions while a request is in flight.
    if (sending) return
    setSending(true)
    setError(false)

    // Collect every field currently in the form (uncontrolled inputs are read
    // via FormData, so the user's data is preserved on error automatically).
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      access_key: "e5935bb6-68cd-4f2e-a753-c3fb019a3114",
      subject: "New Website Lead - Contact Form",
      ...Object.fromEntries(formData.entries()),
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      // Only treat it as a success when Web3Forms confirms it.
      if (response.ok && result.success) {
        // Named GA analytics event (not a Google Ads conversion).
        trackFormLead("contact_page")
        // Push the GTM conversion event ONLY after a confirmed successful submission.
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "mayord_contact_form_success",
        })
        form.reset()
        setSubmitted(true)
      } else {
        console.error("Web3Forms submission was not successful:", result)
        setError(true)
      }
    } catch (err) {
      console.error("Web3Forms request failed:", err)
      setError(true)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange mb-6 mx-auto">
          <Check size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{c.successTitle}</h3>
        <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">
          {c.successBody}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-brand-orange mb-3">
              <Phone size={20} />
              <span className="font-label font-bold text-sm tracking-widest">
                {c.callOrText}
              </span>
            </div>
            <a
              href={siteConfig.phoneHref}
              onClick={() => trackPhoneCall("contact_page")}
              className="text-xl font-bold text-gray-900 hover:text-brand-orange transition-colors"
            >
              {siteConfig.phone}
            </a>
            <p className="text-sm text-gray-500 font-medium mt-1">{c.hablamos}</p>
            <a
              href={whatsappHref(CONTACT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp("contact_page")}
              className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fb959] text-white px-4 py-3 rounded-xl font-bold font-label transition-colors"
            >
              <MessageCircle size={18} />
              {c.whatsappUs}
            </a>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-brand-orange mb-3">
              <Clock size={20} />
              <span className="font-label font-bold text-sm tracking-widest">
                {c.hours}
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-600 font-medium">
              {confirmationHours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-3">
                  <span className="text-gray-900">{entry.day}</span>
                  <span>{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      id="contact-form"
      aria-label="Contact Form"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Honeypot field for spam bots — hidden from real users, ignored by Web3Forms on real submissions. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
            {c.name}
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            placeholder={c.namePlaceholder}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
            {c.phoneLabel}
          </label>
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(240) 555-0123"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="vehicle" className="block text-sm font-bold text-gray-900 mb-2">
          {c.vehicle}
        </label>
        <input
          id="vehicle"
          name="vehicle"
          type="text"
          placeholder={c.vehiclePlaceholder}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-bold text-gray-900 mb-2">
          {c.interestLabel}
        </label>
        <select
          required
          id="interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3.5 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all font-semibold"
        >
          <option value="" disabled className="text-gray-500">
            {c.selectOption}
          </option>
          {interestOptions.map((option) => (
            <option key={option} value={option} className="text-gray-900">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
          {c.messageLabel} <span className="font-medium text-gray-400">{c.optional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={c.messagePlaceholder}
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
          {c.emailLabel} <span className="font-medium text-gray-400">{c.optional}</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className={inputClasses}
        />
      </div>

      {showUrgentAlert && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-brand-orange/10 border border-brand-orange rounded-xl p-4"
        >
          <Phone size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
          <p className="text-sm font-semibold text-gray-900 leading-relaxed">
            {c.urgentPre}
            <a
              href={siteConfig.phoneHref}
              onClick={() => trackPhoneCall("mobile_assistance")}
              className="text-brand-orange font-bold hover:underline"
            >
              {siteConfig.phone}
            </a>
            {c.urgentPost}
          </p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-xl p-4"
        >
          <Phone size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-semibold text-red-700 leading-relaxed">{c.errorMessage}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={sending}
          className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-xl font-bold font-label flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        >
          {sending ? c.sending : c.submit}
          <Send size={20} />
        </button>
        <p className="text-sm text-gray-500 font-medium mt-4 leading-relaxed">
          {c.footerPre}
          <a
            href={siteConfig.phoneHref}
            onClick={() => trackPhoneCall("contact_page")}
            className="text-brand-orange font-bold hover:underline"
          >
            {siteConfig.phone}
          </a>
          {c.footerPost}
        </p>
      </div>
    </form>
  )
}
