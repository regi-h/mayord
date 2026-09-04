import type { NormalizedReview, ReviewsResponse } from "@/app/api/reviews/route"

/**
 * Real, current review data captured from the business's live
 * Google Business Profile ("MAYO RD TIRE SHOP CORP") and Yelp
 * ("Mayo Rd Tire Shop", Edgewater, MD) listings.
 *
 * Used as the fallback whenever the Google Places / Yelp Fusion
 * APIs are unavailable so the section always reflects real numbers.
 */

// Google Business Profile: 4.5 stars, 188 ratings
const GOOGLE_RATING = 4.5
const GOOGLE_COUNT = 188

// Yelp: 4.1 stars, 18 reviews
const YELP_RATING = 4.1
const YELP_COUNT = 18

export const realGoogleReviews: NormalizedReview[] = [
  {
    id: "google-real-cris-martinez",
    author: "cris martinez",
    quote:
      "100% recommended. The service was excellent, the staff very friendly, and your experience is guaranteed.",
    rating: 5,
    source: "google",
    timeAgo: "4 weeks ago",
  },
  {
    id: "google-real-gina-senkowski",
    author: "Gina Senkowski",
    quote:
      "Great price. Second time here to get a tire plugged, and they're the best! Quick in and out, and as painless as a tire problem can possibly be. Friendly and efficient, a great local business!",
    rating: 5,
    source: "google",
    timeAgo: "3 weeks ago",
  },
  {
    id: "google-real-cristian-guillen",
    author: "Cristian Guillen",
    quote: "Very good",
    rating: 5,
    source: "google",
    timeAgo: "2 weeks ago",
  },
  {
    id: "google-real-trent-jackson",
    author: "Trent Jackson",
    quote: "Great local tire shop. Fast, honest, and fairly priced. Highly recommend.",
    rating: 5,
    source: "google",
    timeAgo: "2 weeks ago",
  },
]

export const realYelpReviews: NormalizedReview[] = [
  {
    id: "yelp-real-jamal-t",
    author: "Jamal T.",
    quote:
      "This place is awesome. My daughter and I pulled up, and they took care of us within minutes. In and out. This place will continue to be my #1 option. THANKS!!!!!",
    rating: 5,
    source: "yelp",
    timeAgo: "Jun 16, 2026",
  },
  {
    id: "yelp-real-christian-c",
    author: "Christian C.",
    quote:
      "Got my tire patched here after Pep Boys failed to plug a small nail. They got my tire patched and put my wheel back on my car in under 20 minutes from the time I was walking in the door, then balanced it and completely fixed a vibration in minutes — and were so unbelievably kind to not charge me. I will be going back to them for any future issues. HIGHLY recommend.",
    rating: 5,
    source: "yelp",
    timeAgo: "Feb 21, 2026",
  },
  {
    id: "yelp-real-micki-f",
    author: "micki f.",
    quote:
      "Great service — quality work and very competitive pricing. Highly recommend! I met the owner and son and they were very concerned about my happiness — great place!",
    rating: 5,
    source: "yelp",
    timeAgo: "Sep 12, 2024",
  },
  {
    id: "yelp-real-jennifer-m",
    author: "Jennifer M.",
    quote:
      "I've been coming here for a few years now. The staff is still wonderful! They'll work with you on the prices and always check the tires to make sure they're good. They always go above and beyond when they really don't have to. Now I live about 30 minutes away and I still come here. The drive doesn't matter because the service they provide is absolutely worth it! I would never recommend anyplace else!",
    rating: 5,
    source: "yelp",
    timeAgo: "Jul 7, 2023",
  },
]

// Count-weighted combined average across both sources.
const combinedAverage = Number(
  (
    (GOOGLE_RATING * GOOGLE_COUNT + YELP_RATING * YELP_COUNT) /
    (GOOGLE_COUNT + YELP_COUNT)
  ).toFixed(1),
)

export const realReviewsFallback: ReviewsResponse = {
  averageRating: combinedAverage,
  totalCount: GOOGLE_COUNT + YELP_COUNT,
  reviews: [...realGoogleReviews, ...realYelpReviews],
  sources: { google: true, yelp: true },
  summary: {
    google: { rating: GOOGLE_RATING, count: GOOGLE_COUNT, available: true },
    yelp: { rating: YELP_RATING, count: YELP_COUNT, available: true },
  },
}
