// Google Tag (gtag.js) configuration and event helpers.
//
// Two tag IDs are supported:
//  - NEXT_PUBLIC_GTAG_ID   → the Google tag / GA4 measurement id (e.g. "G-XXXX" or "AW-XXXX")
//  - GA_CONVERSION_ID      → the Google Ads conversion id used for the primary conversion action
//
// All conversion-worthy interactions (calls, form leads) fire BOTH a named
// GA event and the Google Ads conversion so campaigns can optimize on them.

export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID
export const GA_CONVERSION_ID = "AW-18349807750"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type EventParams = Record<string, unknown>

// Low-level: push a named event to gtag. No-ops on the server or before gtag loads.
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", name, params)
}

// Click on any tel: link. `label` identifies where on the site it happened.
// Google Ads conversions for calls are handled by GTM (container GTM-N88SGK53),
// so we no longer fire the Ads conversion directly via gtag.js here.
export function trackPhoneCall(label: string) {
  trackEvent("phone_call_click", { label })
}

// Click on any WhatsApp (wa.me) link.
export function trackWhatsApp(label: string) {
  trackEvent("whatsapp_click", { label })
}

// Click on any "get directions" link.
export function trackDirections(label: string) {
  trackEvent("directions_click", { label })
}

// A successful lead form submission.
// The Google Ads conversion for form leads is handled by GTM (container
// GTM-N88SGK53) via the `mayord_contact_form_success` dataLayer event, so we
// no longer fire the Ads conversion directly via gtag.js here.
export function trackFormLead(label: string) {
  trackEvent("form_submit_lead", { label })
}
