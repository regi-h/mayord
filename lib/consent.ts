// Cookie consent state + Google Consent Mode v2 wiring.
//
// Model:
//  - EEA / UK / Switzerland: opt-in. Analytics and advertising storage are
//    denied until the visitor accepts (GDPR / ePrivacy / UK PECR).
//  - Everywhere else (primarily US / Maryland): opt-out. Measurement runs by
//    default, the visitor can reject at any time, and a Global Privacy Control
//    signal automatically opts them out of advertising (Maryland MODPA, CCPA/CPRA
//    and similar state laws treat GPC as a valid opt-out request).

export const CONSENT_COOKIE = "mayord_consent"
export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180
export const OPEN_CONSENT_EVENT = "mayord:open-cookie-settings"

export interface ConsentChoice {
  v: number
  analytics: boolean
  marketing: boolean
  ts: number
}

const OPT_IN_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
]

/**
 * Inline script that must run before any Google tag loads. It sets the
 * Consent Mode defaults and immediately re-applies a previously saved choice
 * so returning visitors never get a tag fired against their wishes.
 */
export const consentDefaultsScript = `(function(){
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
var base={functionality_storage:'granted',security_storage:'granted',wait_for_update:500};
gtag('consent','default',Object.assign({ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',personalization_storage:'denied',region:${JSON.stringify(OPT_IN_REGIONS)}},base));
var gpc=navigator.globalPrivacyControl===true;
var ads=gpc?'denied':'granted';
gtag('consent','default',Object.assign({ad_storage:ads,ad_user_data:ads,ad_personalization:ads,analytics_storage:'granted',personalization_storage:'granted'},base));
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
var m=document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)/);
if(m){try{var c=JSON.parse(decodeURIComponent(m[1]));var mk=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:mk,ad_user_data:mk,ad_personalization:mk,personalization_storage:c.analytics?'granted':'denied'});}catch(e){}}
})();`

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)`))
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as ConsentChoice
    if (parsed.v !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

function writeConsentCookie(choice: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(choice))}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
}

// Removes first-party Google cookies when the visitor withdraws consent so
// previously set identifiers do not linger.
function clearCookiesByPrefix(prefixes: string[]) {
  const host = window.location.hostname
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`]
  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim()
    if (!name || !prefixes.some((p) => name.startsWith(p))) continue
    for (const domain of domains) {
      const domainAttr = domain ? `; Domain=${domain}` : ""
      document.cookie = `${name}=; Path=/; Max-Age=0${domainAttr}`
    }
  }
}

export function saveConsent({ analytics, marketing }: { analytics: boolean; marketing: boolean }) {
  const choice: ConsentChoice = { v: CONSENT_VERSION, analytics, marketing, ts: Date.now() }
  writeConsentCookie(choice)

  const marketingState = marketing ? "granted" : "denied"
  window.dataLayer = window.dataLayer || []
  const gtag =
    window.gtag ??
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    personalization_storage: analytics ? "granted" : "denied",
    ad_storage: marketingState,
    ad_user_data: marketingState,
    ad_personalization: marketingState,
  })
  window.dataLayer.push({ event: "consent_update", consent_analytics: analytics, consent_marketing: marketing })

  if (!analytics) clearCookiesByPrefix(["_ga", "_gid", "_gat"])
  if (!marketing) clearCookiesByPrefix(["_gcl", "_fbp"])

  return choice
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
