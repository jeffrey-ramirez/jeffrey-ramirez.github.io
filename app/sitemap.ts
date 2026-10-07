import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

// Required for metadata routes under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/resume.pdf`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
