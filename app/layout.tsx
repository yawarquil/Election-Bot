import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeBootstrap } from "@/components/shell/ThemeBootstrap";
import { Analytics } from "@/components/shell/Analytics";
import { ErrorBoundary } from "@/components/shell/ErrorBoundary";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Election Guide Assistant — understand elections, step by step",
    template: "%s · Election Guide Assistant",
  },
  description:
    "A calm, non-partisan civic companion that walks you through the timeline, paperwork, and polling-day reality of voting — in plain language.",
  applicationName: "Election Guide Assistant",
  authors: [{ name: "Election Guide Assistant" }],
  keywords: [
    "elections",
    "voting",
    "civic tech",
    "electoral roll",
    "polling day",
    "voter education",
  ],
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Election Guide Assistant",
    description:
      "A calm, non-partisan civic companion for voters — timeline, paperwork, and polling-day reality in plain language.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Election Guide Assistant",
    description:
      "Non-partisan, accessibility-first civic companion for voters.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <ThemeBootstrap>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-3 focus:py-1.5 focus:text-paper"
          >
            Skip to content
          </a>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeBootstrap>
        <Analytics />
      </body>
    </html>
  );
}
