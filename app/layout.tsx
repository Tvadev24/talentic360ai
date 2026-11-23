import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import "./globals.css";
import { site } from "@/lib/content";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { ScrollProgress } from "@/components/motion";
import { themeInitScript } from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talentic360ai.in"),
  title: {
    default: site.title,
    template: `%s — ${site.legalName}`,
  },
  description: site.description,
  keywords: [
    "training programs",
    "apprenticeship programs",
    "corporate training",
    "vocational training",
    "academic partnerships",
    "skill development India",
    "TALENTIC 360.AI",
  ],
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.legalName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1210" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[var(--brand)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
