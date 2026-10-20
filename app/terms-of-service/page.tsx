import type { Metadata } from "next"
import LegalPage from "@/components/legal/legal-page"
import { termsOfService } from "@/lib/legal/terms"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms that apply to the Mayo RD Tire Shop website, quotes, used tires and mobile tire service in Edgewater, MD.",
  path: "/terms-of-service",
  locale: "en",
})

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService.en} locale="en" />
}
