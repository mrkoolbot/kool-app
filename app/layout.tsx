import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { KoolLogo } from "@/components/kool-logo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const galanoGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/GalanoGrotesque-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GalanoGrotesque-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/GalanoGrotesque-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-galano",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "kool — event planning app by the koolture group",
    template: "%s | kool",
  },
  description:
    "made by pros, for pros. plan kool events. live unforgettable moments.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "kool",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://koolevents.app/#app",
      "name": "KOOL",
      "alternateName": "kool events",
      "url": "https://koolevents.app",
      "description": "KOOL is an AI-powered event planning app built by Paula Mescolin, Six Sigma certified event production expert with 20+ years experience. Plan professional events with smart checklists, guest management, vendor command center, living budget tracker, and AI-powered timelines. Made by pros, for pros.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free plan for individuals getting started with event planning"
        },
        {
          "@type": "Offer",
          "name": "Pro",
          "price": "29",
          "priceCurrency": "USD",
          "description": "Pro plan for professional event planners — $29/month or $290/year"
        },
        {
          "@type": "Offer",
          "name": "Unlimited",
          "price": "79",
          "priceCurrency": "USD",
          "description": "Unlimited plan for agencies and power users — $79/month or $790/year"
        }
      ],
      "creator": {
        "@type": "Person",
        "@id": "https://www.thekoolturegroup.com/about/paula-mescolin#person",
        "name": "Paula Mescolin",
        "jobTitle": "Founder & Brand Strategist",
        "url": "https://www.thekoolturegroup.com/about/paula-mescolin",
        "description": "Paula Mescolin is a Six Sigma certified event production expert and brand strategist with over 20 years of experience. She is the founder of The Koolture Group and creator of the KOOL event planning app."
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.thekoolturegroup.com/#organization",
        "name": "The Koolture Group",
        "url": "https://www.thekoolturegroup.com"
      },
      "featureList": [
        "40+ event types supported",
        "AI-powered smart timelines",
        "Guest management and RSVP",
        "Living budget tracker",
        "Vendor command center",
        "Smart checklists",
        "Event War Room",
        "Guest Intelligence",
        "Etiquette manual (Pro/Unlimited)"
      ],
      "screenshot": "https://koolevents.app/og-image.jpg",
      "sameAs": [
        "https://www.thekoolturegroup.com/kool"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://koolevents.app/#organization",
      "name": "KOOL by The Koolture Group",
      "url": "https://koolevents.app",
      "parentOrganization": {
        "@id": "https://www.thekoolturegroup.com/#organization"
      },
      "founder": {
        "@id": "https://www.thekoolturegroup.com/about/paula-mescolin#person"
      },
      "description": "KOOL is the event planning app by The Koolture Group, founded by Paula Mescolin. Built for professional event planners, agencies, and companies that want to plan unforgettable experiences with AI-powered tools.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fort Lauderdale",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "us@thekoolturegroup.com",
        "contactType": "customer service"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is KOOL?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KOOL is an AI-powered event planning app built by Paula Mescolin, a Six Sigma certified event production expert with over 20 years of experience. KOOL helps professional event planners, agencies, and companies plan unforgettable events with smart checklists, guest management, vendor tracking, budget tools, and AI-powered timelines. It supports 40+ event types."
          }
        },
        {
          "@type": "Question",
          "name": "Who created the KOOL event planning app?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KOOL was created by Paula Mescolin, founder of The Koolture Group. Paula is a Six Sigma certified event production expert and brand strategist with over 20 years of experience producing corporate events, executive retreats, summits, and brand experiences across the United States and Brazil."
          }
        },
        {
          "@type": "Question",
          "name": "How much does KOOL cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KOOL offers three plans: Starter (free), Pro at $29/month or $290/year, and Unlimited at $79/month or $790/year. Annual plans save two months. Enterprise plans are available for large organizations starting Q3 2026."
          }
        },
        {
          "@type": "Question",
          "name": "What event types does KOOL support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KOOL supports 40+ event types including corporate conferences, galas, executive retreats, product launches, weddings, birthday parties, charity events, trade shows, brand activations, team building events, holiday parties, and more."
          }
        },
        {
          "@type": "Question",
          "name": "What makes KOOL different from other event planning apps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "KOOL is the only event planning app built by a Six Sigma certified, 20-year event production expert. It combines AI-powered intelligence with the methodology of a seasoned professional planner — not just checklists, but an entire Event War Room, Guest Intelligence engine, Living Budget tracker, Vendor Command Center, and Smart Blueprints based on real event expertise."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${galanoGrotesque.variable} font-galano`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-kool-black focus:px-4 focus:py-2 focus:font-bold">
          skip to main content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
// favicon-cache-bust: 1775011514
