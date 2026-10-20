import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { privacyPolicy } from "@/lib/legal/privacy"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Mayo RD Tire Shop in Edgewater, MD collects, uses and protects your personal information, and how to exercise your privacy rights.",
  path: "/privacy-policy",
  locale: "en",
})

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy.en} locale="en" />
}
