"use client"

import { useState } from "react"
import useSWR from "swr"
import { ExternalLink, Quote, Star } from "lucide-react"
import { siteConfig } from "@/lib/data"
import type { Locale } from "@/lib/i18n"
import { realReviewsFallback } from "@/lib/reviews-fallback"
import type { NormalizedReview, ReviewsResponse } from "@/app/api/reviews/route"

const copy = {
  en: {
    eyebrow: "WHAT OUR CUSTOMERS SAY",
    heading: (
      <>
        EXCELLENT
        <br />
        SERVICE.
        <br />
        TOP RATED.
      </>
    ),
    leaveReview: "Leave us a review",
    reviewsAcross: (_count: number) => `Over 200 reviews across Google & Yelp`,
    reviewsWord: "reviews",
    all: "All",
  },
  es: {
    eyebrow: "LO QUE DICEN NUESTROS CLIENTES",
    heading: (
      <>
        SERVICIO
        <br />
        EXCELENTE.
        <br />
        TOP RATED.
      </>
    ),
    leaveReview: "Déjenos una reseña",
    reviewsAcross: (_count: number) => `Más de 200 reseñas en Google y Yelp`,
    reviewsWord: "reseñas",
    all: "Todas",
  },
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to load reviews")
    return res.json() as Promise<ReviewsResponse>
  })

// Real, current Google + Yelp data — used until the live APIs are enabled.
const fallback: ReviewsResponse = realReviewsFallback

type SourceKey = "google" | "yelp"
type FilterKey = "all" | SourceKey

const SOURCE_META: Record<SourceKey, { label: string; badge: string; ring: string }> = {
  google: {
    label: "Google",
    badge: "bg-white text-gray-700 border border-gray-200",
    ring: "ring-[#4285F4]",
  },
  yelp: {
    label: "Yelp",
    badge: "bg-[#FF1A1A] text-white border border-[#FF1A1A]",
    ring: "ring-[#FF1A1A]",
  },
}

function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

function SourceBadge({ source }: { source: SourceKey }) {
  const meta = SOURCE_META[source]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${meta.badge}`}
    >
      {source === "google" ? (
        <GoogleGlyph className="h-3.5 w-3.5" />
      ) : (
        <span className="font-black tracking-tight">yelp</span>
      )}
      {source === "google" && meta.label}
    </span>
  )
}

function RatingStars({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < Math.round(rating)
        return (
          <div
            key={i}
            className={`rounded flex items-center justify-center p-1 ${
              filled ? "bg-[#FF1A1A]" : "bg-gray-200"
            }`}
          >
            <Star size={size} className="fill-white text-white" />
          </div>
        )
      })}
    </div>
  )
}

function SourceSummaryCard({
  source,
  rating,
  count,
  href,
}: {
  source: SourceKey
  rating: number
  count: number
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 transition-colors hover:border-gray-300"
    >
      {source === "google" ? (
        <GoogleGlyph className="h-6 w-6 shrink-0" />
      ) : (
        <span className="text-lg font-black text-[#FF1A1A]">yelp</span>
      )}
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{rating.toFixed(1)}</span>
          <div className="flex text-brand-orange">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={13}
                className={i < Math.round(rating) ? "fill-current" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
        <p className="text-xs font-medium text-gray-500">{count} reviews</p>
      </div>
      <ExternalLink
        size={16}
        className="ml-auto text-gray-300 transition-colors group-hover:text-gray-500"
      />
    </a>
  )
}

function ReviewCard({ review }: { review: NormalizedReview }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-brand-orange">
          <Quote size={32} />
        </div>
        <SourceBadge source={review.source} />
      </div>
      <p className="text-gray-700 font-medium text-lg mb-8 flex-1 line-clamp-6 whitespace-pre-line">
        &quot;{review.quote}&quot;
      </p>
      <div>
        <p className="font-bold mb-2">&mdash; {review.author}</p>
        <div className="flex items-center gap-3">
          <div className="flex text-brand-orange gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(review.rating) ? "fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          {review.timeAgo && (
            <span className="text-xs text-gray-400">{review.timeAgo}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-3 flex-1 mb-8">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-11/12" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-24" />
      </div>
    </div>
  )
}

export default function ReviewsPreview({ locale = "en" }: { locale?: Locale }) {
  const [filter, setFilter] = useState<FilterKey>("all")
  const t = copy[locale]

  const { data, isLoading } = useSWR<ReviewsResponse>("/api/reviews", fetcher, {
    fallbackData: fallback,
    revalidateOnFocus: false,
    // Silent error handling: keep showing fallback data, never surface errors.
    onError: () => {},
    shouldRetryOnError: false,
  })

  // Prefer live data with reviews; otherwise gracefully use the static fallback.
  const source = data && data.reviews.length > 0 ? data : fallback
  const averageRating = source.averageRating || fallback.averageRating
  const totalCount = source.totalCount || fallback.totalCount

  const showSkeleton = isLoading && (!data || data.reviews.length === 0)

  const hasGoogle = source.summary.google.available && source.summary.google.count > 0
  const hasYelp = source.summary.yelp.available && source.summary.yelp.count > 0

  const filters: { key: FilterKey; label: string; enabled: boolean }[] = [
    { key: "all", label: t.all, enabled: true },
    { key: "google", label: "Google", enabled: hasGoogle },
    { key: "yelp", label: "Yelp", enabled: hasYelp },
  ]

  const filtered =
    filter === "all"
      ? source.reviews
      : source.reviews.filter((r) => r.source === filter)
  const featured = filtered.slice(0, 6)

  return (
    <section className="bg-gray-50 text-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 lg:max-w-sm">
            <h4 className="text-brand-orange font-label font-bold tracking-wider mb-4">
              {t.eyebrow}
            </h4>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {t.heading}
            </h2>

            <a
              href={siteConfig.googleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-orange font-bold hover:underline mb-8"
            >
              {t.leaveReview}
              <ExternalLink size={16} />
            </a>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {showSkeleton ? (
                  <>
                    <div className="h-12 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    <RatingStars rating={averageRating} />
                  </>
                )}
              </div>
              <p className="text-gray-500 font-medium mb-6">
                {showSkeleton ? (
                  <span className="inline-block h-4 w-40 bg-gray-200 rounded animate-pulse align-middle" />
                ) : (
                  t.reviewsAcross(totalCount)
                )}
              </p>

              {/* Per-source breakdown */}
              {!showSkeleton && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {hasGoogle && (
                    <SourceSummaryCard
                      source="google"
                      rating={source.summary.google.rating}
                      count={source.summary.google.count}
                      href={siteConfig.googleUrl}
                    />
                  )}
                  {hasYelp && (
                    <SourceSummaryCard
                      source="yelp"
                      rating={source.summary.yelp.rating}
                      count={source.summary.yelp.count}
                      href={siteConfig.yelpUrl}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            {/* Source filter tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {filters
                .filter((f) => f.enabled)
                .map((f) => {
                  const active = filter === f.key
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFilter(f.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                        active
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {f.key === "google" && <GoogleGlyph className="h-4 w-4" />}
                      {f.key === "yelp" && (
                        <span
                          className={`font-black ${active ? "text-white" : "text-[#FF1A1A]"}`}
                        >
                          yelp
                        </span>
                      )}
                      {f.key !== "yelp" && f.label}
                    </button>
                  )
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {showSkeleton
                ? [0, 1, 2].map((i) => <CardSkeleton key={i} />)
                : featured.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
