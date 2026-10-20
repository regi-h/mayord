import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/data"
import { serviceAreas } from "@/lib/service-areas"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/tires", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    {
      path: "/mobile-tire-service-edgewater-md",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
    { path: "/es/politica-de-privacidad", priority: 0.3, changeFrequency: "yearly" },
    { path: "/es/politica-de-cookies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/es/terminos-de-servicio", priority: 0.3, changeFrequency: "yearly" },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const areaEntries: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: new URL(`/mobile-tire-service/${area.slug}`, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.dateISO),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticEntries, ...areaEntries, ...blogEntries]
}
