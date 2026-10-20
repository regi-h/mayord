import Image from "next/image"
import Link from "next/link"
import { Clock, DoorOpen, Facebook, MapPin, Phone, Truck } from "lucide-react"
import { navLinks, siteConfig } from "@/lib/data"
import { esNavLinks, type Locale } from "@/lib/i18n"
import { LegalLinkList } from "@/components/legal/legal-links"

const copy = {
  en: {
    description:
      "Premium quality new & used tires and expert services in Maryland. Honesty and customer satisfaction are our top priorities.",
    quickLinks: "QUICK LINKS",
    contact: "CONTACT",
    mobileTireService: "Mobile Tire Service",
    hours: (
      <>
        Mon-Wed, Fri-Sat: 8am-6:30pm
        <br />
        Thu: 8am-6pm
        <br />
        Sun: 9am-4pm
      </>
    ),
    walkIns: "Walk-ins welcome — no appointment needed",
    mobileRadius: "Mobile assistance within ~15 min of Edgewater",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    mobileServiceHref: "/mobile-tire-service-edgewater-md",
  },
  es: {
    description:
      "Llantas nuevas y usadas de primera calidad y servicios expertos en Maryland. La honestidad y la satisfacción del cliente son nuestra prioridad.",
    quickLinks: "ENLACES RÁPIDOS",
    contact: "CONTACTO",
    mobileTireService: "Servicio Móvil de Llantas",
    hours: (
      <>
        Lun-Mié, Vie-Sáb: 8am-6:30pm
        <br />
        Jue: 8am-6pm
        <br />
        Dom: 9am-4pm
      </>
    ),
    walkIns: "Se atiende sin cita previa",
    mobileRadius: "Asistencia móvil a ~15 minutos de Edgewater",
    rights: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    mobileServiceHref: "/es/servicio-movil-de-llantas-edgewater-md",
  },
}

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale]
  const links = locale === "es" ? esNavLinks : navLinks

  return (
    <footer className="bg-brand-dark pt-20 pb-8 border-t border-brand-surface-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Image
              src={siteConfig.logoUrl}
              alt="Mayo RD Tire Shop Logo"
              width={192}
              height={48}
              className="h-12 w-auto object-contain mb-6"
            />
            <p className="text-brand-text-muted max-w-sm mb-6">{t.description}</p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#1877F2] hover:text-white transition-all"
              >
                <Facebook size={20} className="fill-current" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-label font-bold tracking-wider mb-6">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 font-medium text-brand-text-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-orange transition-colors capitalize"
                  >
                    {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={t.mobileServiceHref}
                  className="hover:text-brand-orange transition-colors"
                >
                  {t.mobileTireService}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-label font-bold tracking-wider mb-6">
              {t.contact}
            </h4>
            <ul className="space-y-4 text-brand-text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-orange mt-1 flex-shrink-0" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-orange flex-shrink-0" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-brand-orange mt-1 flex-shrink-0" />
                <span>{t.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <DoorOpen size={20} className="text-brand-orange mt-1 flex-shrink-0" />
                <span>{t.walkIns}</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck size={20} className="text-brand-orange mt-1 flex-shrink-0" />
                <span>{t.mobileRadius}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-surface-light text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t.rights}
          </p>
          <LegalLinkList locale={locale} className="md:justify-end" />
        </div>
      </div>
    </footer>
  )
}
