import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { Providers } from "@/components/Providers";
import { profile, siteUrl, socialLinks } from "@/data/profile";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Jeffrey Ramirez — Senior Frontend Developer";
const description =
  "Portfolio of Jeffrey Ramirez, a Senior Frontend Developer with Full Stack experience specializing in React, Next.js, and modern web applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — Jeffrey Ramirez" },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Jeffrey Ramirez",
    "Senior Frontend Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Django REST Framework",
    "Microfrontends",
    "Open edX",
    "Philippines",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    firstName: "Jeffrey",
    lastName: "Ramirez",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description,
  url: siteUrl,
  image: `${siteUrl}/jeffrey-ramirez.webp`,
  email: `mailto:${profile.email}`,
  sameAs: socialLinks.filter((l) => l.icon !== "mail").map((l) => l.href),
  knowsAbout: ["React", "Next.js", "TypeScript", "Python", "Django REST Framework", "PostgreSQL", "Docker", "Open edX"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`.preloader{display:none!important}.sig-stroke{stroke-dasharray:none!important;opacity:1!important}.sig-dot{opacity:1!important;transform:none!important}[data-logo-target]{opacity:1!important}`}</style>
        </noscript>
        <Preloader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
