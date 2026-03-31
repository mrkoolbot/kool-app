import type { Metadata } from "next";
import localFont from "next/font/local";
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
    default: "kool — by the koolture group",
    template: "%s | kool",
  },
  description:
    "the smartest way to plan your event. built by paula mescolin — brand strategist, six sigma certified event producer, and founder of the koolture group.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${galanoGrotesque.variable} font-galano`}>{children}</body>
    </html>
  );
}
