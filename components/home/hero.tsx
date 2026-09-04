import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Phone, Star } from "lucide-react"
import { images, siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import PhoneCallLink from "@/components/phone-call-link"

const copy = {
  en: {
    headline: (
      <>
        GOOD TIRES.
        <br />
        HONEST SERVICE.
        <br />
        <span className="text-brand-orange">REAL FAST.</span>
      </>
    ),
    subhead: "Quality new & used tires and expert service, done right the first time.",
    callCta: "CALL NOW: ",
    shopCta: "SHOP NEW & USED TIRES",
    shopHref: "/tires",
    reviews: "over 200 reviews",
    familyOwned: "Family-Owned",
    open7: "Open 7 Days",
    hablamos: "Hablamos Español",
  },
  es: {
    headline: (
      <>
        BUENAS LLANTAS.
        <br />
        BUENOS PRECIOS.
        <br />
        <span className="text-brand-orange">SERVICIO DE VERDAD.</span>
      </>
    ),
    subhead: "Llantas nuevas y usadas de calidad, con un servicio experto hecho bien desde la primera vez.",
    callCta: "LLAME AHORA: ",
    shopCta: "VER LLANTAS NUEVAS Y USADAS",
    shopHref: "/es/llantas",
    reviews: "más de 200 reseñas",
    familyOwned: "Negocio Familiar",
    open7: "Abierto 7 Días",
    hablamos: "Hablamos Español",
  },
}

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale]

  return (
    <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
      <Image
        src={images.homeHero}
        alt="Mayo RD Tire Shop interior in Edgewater, Maryland"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40 pointer-events-none z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            {t.headline}
          </h1>
          <p className="text-xl sm:text-2xl text-brand-text mb-10 max-w-2xl font-medium">
            {t.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PhoneCallLink
              label="hero"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-lg font-bold font-label flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={20} />
              {t.callCta}
              {siteConfig.phone}
            </PhoneCallLink>
            <Link
              href={t.shopHref}
              className="border-2 border-brand-text hover:border-brand-orange hover:text-brand-orange text-brand-text px-8 py-4 rounded-lg font-bold font-label flex items-center justify-center gap-2 transition-colors"
            >
              {t.shopCta}
              <ChevronRight size={20} />
            </Link>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base font-medium text-brand-text-muted">
            <span className="inline-flex items-center gap-1 text-brand-orange font-bold">
              4.5
              <Star size={16} className="fill-current" />
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{t.reviews}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{t.familyOwned}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{t.open7}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{t.hablamos}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
