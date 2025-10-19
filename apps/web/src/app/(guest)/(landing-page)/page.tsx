import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js | Modern Landing Page Template",
  description:
    "A modern landing page built with Next.js, perfect for startups, agencies, and SaaS products. Fast, responsive, and SEO-optimized.",
  keywords: [
    "Next.js",
    "Landing Page",
    "Template",
    "SaaS",
    "Startup",
    "React",
    "Tailwind CSS",
    "SEO",
  ],
  authors: [{ name: "Next.js Team", url: "https://example.com" }],
  creator: "Next.js R",
  publisher: "Next.js R",
  openGraph: {
    title: "Next.js R | Modern Landing Page Template",
    description:
      "A modern landing page built with Next.js, perfect for startups and digital products.",
    url: "https://example.com",
    siteName: "Next.js R",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js R Landing Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js R | Modern Landing Page Template",
    description:
      "A modern and fast landing page template built with Next.js and Tailwind CSS.",
    creator: "@nextjsr",
    images: ["https://example.com/og-image.jpg"],
  },
  metadataBase: new URL("https://example.com"),
  alternates: {
    canonical: "https://example.com",
  },
};

export default function LandingPage() {
  
  return (
    <div className="min-h-screen bg-gray-50">

    </div>
  );
}
