import type { MetadataRoute } from "next";

import { programs } from "@/lib/content";

const BASE = "https://talentic360ai.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/programs", priority: 0.9 },
    { path: "/why-us", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-service", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...programs.map((program) => ({
      url: `${BASE}/programs/${program.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
