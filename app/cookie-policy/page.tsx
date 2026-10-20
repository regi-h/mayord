import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { cookiePolicy } from "@/lib/legal/cookies"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "The cookies Mayo RD Tire Shop uses on this website, what they do, and how to change your cookie preferences at any time.",
  path: "/cookie-policy",
  locale: "en",
})

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy.en} locale="en" />
}
