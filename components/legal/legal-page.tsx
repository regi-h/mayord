import Link from "next/link"
import { Cookie } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { LEGAL_LAST_UPDATED, legalRoutes, type LegalDocument } from "@/lib/legal/types"
import CookieSettingsButton from "@/components/consent/cookie-settings-button"

const copy = {
  en: {
    updated: "Last updated",
    contents: "On this page",
    cookieSettings: "Cookie Settings",
    related: "Related policies",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Terms of Service",
  },
  es: {
    updated: "Última actualización",
    contents: "En esta página",
    cookieSettings: "Configuración de cookies",
    related: "Políticas relacionadas",
    privacy: "Política de Privacidad",
    cookies: "Política de Cookies",
    terms: "Términos de Servicio",
  },
}

export default function LegalPage({ doc, locale }: { doc: LegalDocument; locale: Locale }) {
  const t = copy[locale]
  const routes = legalRoutes[locale]
  const related = [
    { href: routes.privacy, label: t.privacy },
    { href: routes.cookies, label: t.cookies },
    { href: routes.terms, label: t.terms },
  ]

  return (
    <article className="bg-brand-dark">
      <header className="border-b border-brand-surface-light">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-label text-sm font-bold tracking-widest text-brand-orange">{doc.label}</p>
          <h1 className="text-balance text-4xl font-bold text-white md:text-5xl">{doc.title}</h1>
          <p className="font-label text-sm text-brand-text-muted">
            {t.updated}: <time>{LEGAL_LAST_UPDATED[locale]}</time>
          </p>
          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-brand-text">{doc.intro}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-16">
        <nav aria-label={t.contents} className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-3">
            <p className="font-label text-xs font-bold tracking-widest text-brand-text-muted">
              {t.contents.toUpperCase()}
            </p>
            <ol className="flex flex-col gap-2 border-l border-brand-surface-light">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-brand-text-muted transition-colors hover:border-brand-orange hover:text-white"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="flex min-w-0 max-w-3xl flex-col gap-12">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-4">
              <h2 className="text-balance text-2xl font-bold text-white">{section.heading}</h2>

              {section.paragraphs?.map((p) => (
                <p key={p} className="text-pretty leading-relaxed text-brand-text-muted">
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className="flex flex-col gap-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-brand-text-muted">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 bg-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-brand-surface-light">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-brand-surface">
                      <tr>
                        {section.table.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-label font-bold tracking-wide text-white">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-brand-surface-light align-top">
                          {row.map((cell, i) => (
                            <td
                              key={i}
                              className={`px-4 py-3 leading-relaxed ${i === 0 ? "font-label font-bold text-brand-text" : "text-brand-text-muted"}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.showCookieSettings && (
                <CookieSettingsButton className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand-orange px-5 py-3 font-label text-sm font-bold tracking-wide text-brand-orange transition-colors hover:bg-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">
                  <Cookie size={16} aria-hidden="true" />
                  {t.cookieSettings}
                </CookieSettingsButton>
              )}
            </section>
          ))}

          <aside className="flex flex-col gap-4 border-t border-brand-surface-light pt-8">
            <p className="font-label text-xs font-bold tracking-widest text-brand-text-muted">
              {t.related.toUpperCase()}
            </p>
            <ul className="flex flex-wrap gap-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-lg bg-brand-surface px-4 py-2 text-sm font-medium text-brand-text transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </article>
  )
}
