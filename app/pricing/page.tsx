"use client"
import { useState } from "react";
import { KoolLogo } from "@/components/kool-logo";
import { LandingNav } from "@/components/landing/nav";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const FREE_FEATURES = [
  "1 active event at a time",
  "up to 25 guests",
  "smart checklist by event type",
  "run of show / timeline",
  "budget tracker",
  "vendor list",
  "catering calculator",
  "public event landing page",
  "guest RSVP page",
];

const PREMIUM_FEATURES = [
  "everything in free, plus:",
  "unlimited events",
  "unlimited guests",
  "full checklist suite — 20+ categories",
  "smart timeline generator (8 event types)",
  "automated email sequences",
  "QR code check-in system",
  "conditional RSVP form logic",
  "custom event branding (colors + hero image)",
  "landing page auto-archive after 30 days",
  "catering + bar calculator (industry formula)",
  "priority TKG consultation booking",
  "event etiquette manual",
];

const UNLIMITED_FEATURES = [
  "everything in premium, plus:",
  "event war room (day-of coordination)",
  "advanced guest intelligence",
  "multi-event dashboard",
  "white-label rsvp pages",
  "post-event brain (after-action reports)",
  "vendor scorecard system",
  "smart event blueprints (ai templates)",
  "dedicated support",
  "event etiquette manual",
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const proMonthly = 25;
  const proAnnualPerMonth = 24;
  const proAnnualTotal = 290;
  const proAnnualSavings = 58;

  const unlimitedMonthly = 79;
  const unlimitedAnnualPerMonth = 66;
  const unlimitedAnnualTotal = 790;
  const unlimitedAnnualSavings = 158;

  const proPrice = billing === "annual" ? proAnnualPerMonth : proMonthly;
  const unlimitedPrice = billing === "annual" ? unlimitedAnnualPerMonth : unlimitedMonthly;

  return (
    <>
      <main className="min-h-screen bg-white">
        <LandingNav />

        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
          <div className="text-center mb-12">
            <p className="text-kool-red text-xs font-bold tracking-[0.3em] lowercase mb-4">pricing</p>
            <h1 className="text-5xl font-black tracking-tight mb-4">plan with intention.<br />execute with kool.</h1>
            <p className="text-gray-500 text-lg mb-8">free forever to start · no credit card required</p>

            {/* billing toggle */}
            <div className="inline-flex items-center gap-1 border border-gray-200 rounded-sm p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 text-sm font-bold transition-colors rounded-sm ${
                  billing === "monthly"
                    ? "bg-kool-black text-white"
                    : "text-gray-500 hover:text-kool-black"
                }`}
              >
                monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 text-sm font-bold transition-colors rounded-sm flex items-center gap-2 ${
                  billing === "annual"
                    ? "bg-kool-black text-white"
                    : "text-gray-500 hover:text-kool-black"
                }`}
              >
                annual
                <span className={`text-xs px-2 py-0.5 rounded-sm font-bold ${billing === "annual" ? "bg-kool-red text-white" : "bg-kool-red/10 text-kool-red"}`}>
                  save up to 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="border border-gray-200 rounded-sm p-8">
              <div className="text-sm font-bold text-gray-400 mb-2">free</div>
              <div className="text-5xl font-black mb-1">$0</div>
              <p className="text-gray-500 text-sm mb-8">forever. no credit card.</p>
              <ul className="space-y-3 mb-10">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center border border-kool-black py-3 text-sm font-bold hover:bg-kool-black hover:text-white transition-colors">
                get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="border-2 border-kool-red rounded-sm p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kool-red text-white text-xs font-bold px-3 py-1">
                most popular
              </div>
              <div className="text-sm font-bold text-kool-red mb-2">pro</div>
              <div className="text-5xl font-black mb-1">
                ${proPrice}
                <span className="text-xl font-normal text-gray-400">/mo</span>
              </div>
              {billing === "annual" ? (
                <p className="text-gray-500 text-sm mb-1">billed ${proAnnualTotal}/yr · save ${proAnnualSavings}</p>
              ) : (
                <p className="text-gray-500 text-sm mb-1">per month · billed monthly</p>
              )}
              {billing === "monthly" && (
                <p className="text-kool-red text-xs font-semibold mb-6">or ${proAnnualTotal}/year — 2 months free</p>
              )}
              {billing === "annual" && <div className="mb-6" />}
              <ul className="space-y-3 mb-10">
                {PREMIUM_FEATURES.map((f) => (
                  f === "everything in free, plus:" ? (
                    <li key={f} className="text-xs font-bold text-gray-400 lowercase tracking-widest pt-1 pb-0 list-none">{f}</li>
                  ) : (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-kool-red" />
                      {f}
                    </li>
                  )
                ))}
              </ul>
              <Link href="/signup?plan=pro" className="block w-full text-center bg-kool-red text-white py-3 text-sm font-bold hover:bg-red-700 transition-colors">
                start pro
                <ArrowRight className="inline w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Unlimited */}
            <div className="border border-gray-200 rounded-sm p-8 bg-[#0A0A0A] text-white">
              <div className="text-sm font-bold text-gray-400 mb-2">unlimited</div>
              <div className="text-5xl font-black mb-1">
                ${unlimitedPrice}
                <span className="text-xl font-normal text-gray-500">/mo</span>
              </div>
              {billing === "annual" ? (
                <p className="text-gray-400 text-sm mb-1">billed ${unlimitedAnnualTotal}/yr · save ${unlimitedAnnualSavings}</p>
              ) : (
                <p className="text-gray-400 text-sm mb-1">per month · billed monthly</p>
              )}
              {billing === "monthly" && (
                <p className="text-kool-red text-xs font-semibold mb-6">or ${unlimitedAnnualTotal}/year — 2 months free</p>
              )}
              {billing === "annual" && <div className="mb-6" />}
              <ul className="space-y-3 mb-10">
                {UNLIMITED_FEATURES.map((f) => (
                  f === "everything in premium, plus:" ? (
                    <li key={f} className="text-xs font-bold text-gray-500 lowercase tracking-widest pt-1 pb-0 list-none">{f}</li>
                  ) : (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-kool-red" />
                      {f}
                    </li>
                  )
                ))}
              </ul>
              <Link href="/signup?plan=unlimited" className="block w-full text-center border border-white text-white py-3 text-sm font-bold hover:bg-white hover:text-obsidian transition-colors">
                go unlimited
              </Link>
            </div>
          </div>

          {/* Enterprise teaser */}
          <div className="mt-6 border border-dashed border-gray-300 rounded-sm p-8 text-center bg-gray-50">
            <div className="inline-block border border-gray-300 text-gray-400 text-xs font-bold px-3 py-1 mb-3 tracking-widest">coming q3 2026</div>
            <div className="text-sm font-bold text-gray-400 mb-2">enterprise</div>
            <p className="text-gray-500 text-sm mb-2">for agencies & large organizations</p>
            <p className="text-2xl font-black text-gray-300 mb-6">custom pricing</p>
            <a
              href="mailto:us@thekoolturegroup.com?subject=KOOL Enterprise Waitlist"
              className="inline-flex items-center gap-2 border border-gray-400 text-gray-500 px-6 py-2.5 text-sm font-bold hover:border-kool-black hover:text-kool-black transition-colors"
            >
              join waitlist <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Etiquette Manual callout */}
          <div className="mt-12 bg-red-50 border border-kool-red/20 rounded-sm p-6 text-center">
            <p className="text-kool-red font-bold text-sm mb-1">exclusive to pro & unlimited</p>
            <p className="text-kool-black font-black text-xl mb-2">event etiquette manual</p>
            <p className="text-gray-500 text-sm">a comprehensive guide to event planning etiquette — written by paula mescolin. included with every pro and unlimited plan.</p>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-100 px-6 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-1.5">
            <Link href="/" style={{ display: "inline-block", marginLeft: "-29px" }}><KoolLogo inverted size="sm" /></Link>
            <p className="text-gray-400 text-xs">intellectual property of the koolture group (TKG). all rights reserved.</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link href="/pricing" className="hover:text-black transition-colors">pricing</Link>
            <Link href="/login" className="hover:text-black transition-colors">log in</Link>
            <Link href="/signup" className="hover:text-black transition-colors">sign up</Link>
            <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-black transition-colors">the koolture group</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
