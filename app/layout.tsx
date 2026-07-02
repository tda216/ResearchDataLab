import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Research Data Lab | Research-ready datasets",
  description:
    "Research-ready data collection, cleaning, documentation, and reproducible delivery for thesis and academic projects.",
  metadataBase: new URL("https://researchdatalab.xyz"),
  openGraph: {
    title: "Research Data Lab | Research-ready datasets",
    description:
      "Turn difficult sources into clean, documented, reproducible datasets for academic research.",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
    languages: { en: "/", vi: "/vi" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} font-[family-name:var(--font-geist)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
