import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KOOL — event planning by paula mescolin",
    template: "%s | KOOL",
  },
  description:
    "the smartest way to plan your event. built by paula mescolin — brand strategist, six sigma certified event producer, and founder of the koolture group.",
  openGraph: {
    type: "website",
    siteName: "KOOL",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
