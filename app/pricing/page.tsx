"use client"
import { KoolLogo } from "@/components/kool-logo";
import { LandingNav } from "@/components/landing/nav";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const ETIQUETTE_FREEBIE = "event etiquette manual (free for all)";

const FREE_FEATURES = [
  "1 active event at a time",
  "up to 25 guests",
  "smart checklist by event type",
  "planning timeline auto-generated",
  "budget tracker",
  "vendor list",
  "3 invite templates",
  "rsvp page (sharable link)",
  "basic run of show",
  ETIQUETTE_FREEBIE,
];

const PREMIUM_FEATURES = [
  "3 active events at a time",
  "up to 100 guests per event",
  "full ai-powered checklists",
  "complete vendor management suite",
  "budget manager + payment tracking",
  "run of show generator",
  "full invite template library",
  "collaborative playlist (spotify)",
  "calendar sync (google + apple)",
  "email reminders to guests",
  "mood board creator",
  "priority TKG consultation booking",
  ETIQUETTE_FREEBIE,
];

const UNLIMITED_FEATURES = [
  "unlimited active events",
  "unlimited guests",
  "everything in premium",
  "event war room (day-of coordination)",
  "advanced guest intelligence",
  "multi-event dashboard",
  "white-label rsvp pages",
  "post-event brain (after-action reports)",
  "vendor scorecard system",
  "smart event blueprints (ai templates)",
  "dedicated support",
  ETIQUETTE_FREEBIE,
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <LandingNav />


      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] lowercase mb-4">pricing</p>
          <h1 className="text-5xl font-black tracking-tight mb-4">plan with intention.<br />execute with kool.</h1>
          <p className="text-gray-500 text-lg">free forever to start · no credit card required</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-sm p-8">
            <div className="text-sm font-bold text-gray-400 mb-2">free</div>
            <div className="text-5xl font-black mb-1">$0</div>
            <p className="text-gray-500 text-sm mb-8">forever. no credit card.</p>
            <ul className="space-y-3 mb-10">
              {FREE_FEATURES.map((f) => (
                <li key={f} className={`flex items-start gap-3 text-sm ${f === ETIQUETTE_FREEBIE ? "text-kool-red font-semibold" : "text-gray-600"}`}>
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${f === ETIQUETTE_FREEBIE ? "text-kool-red" : "text-gray-400"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full text-center border border-kool-black py-3 text-sm font-bold hover:bg-kool-black hover:text-white transition-colors">
              get started free
            </Link>
          </div>

          {/* Premium */}
          <div className="border-2 border-kool-red rounded-sm p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kool-red text-white text-xs font-bold px-3 py-1">
              most popular
            </div>
            <div className="text-sm font-bold text-kool-red mb-2">premium</div>
            <div className="text-5xl font-black mb-1">$25</div>
            <p className="text-gray-500 text-sm mb-8">per month · billed monthly</p>
            <ul className="space-y-3 mb-10">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f} className={`flex items-start gap-3 text-sm ${f === ETIQUETTE_FREEBIE ? "text-kool-red font-semibold" : "text-gray-600"}`}>
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${f === ETIQUETTE_FREEBIE ? "text-kool-red" : "text-kool-red"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=premium" className="block w-full text-center bg-kool-red text-white py-3 text-sm font-bold hover:bg-red-700 transition-colors">
              start premium
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Unlimited */}
          <div className="border border-gray-200 rounded-sm p-8 bg-[#0A0A0A] text-white">
            <div className="text-sm font-bold text-gray-400 mb-2">unlimited</div>
            <div className="text-5xl font-black mb-1">$39</div>
            <p className="text-gray-400 text-sm mb-8">per month · billed monthly</p>
            <ul className="space-y-3 mb-10">
              {UNLIMITED_FEATURES.map((f) => (
                <li key={f} className={`flex items-start gap-3 text-sm ${f === ETIQUETTE_FREEBIE ? "text-kool-red font-semibold" : "text-gray-300"}`}>
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${f === ETIQUETTE_FREEBIE ? "text-kool-red" : "text-kool-red"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=unlimited" className="block w-full text-center border border-white text-white py-3 text-sm font-bold hover:bg-white hover:text-obsidian transition-colors">
              go unlimited
            </Link>
          </div>
        </div>

        {/* Etiquette Manual callout */}
        <div className="mt-12 bg-red-50 border border-kool-red/20 rounded-sm p-6 text-center">
          <p className="text-kool-red font-bold text-sm mb-1">free for every plan</p>
          <p className="text-kool-black font-black text-xl mb-2">event etiquette manual</p>
          <p className="text-gray-500 text-sm">a comprehensive guide to event planning etiquette — written by paula mescolin. yours free, no matter which plan you choose.</p>
        </div>

        {/* Annual note */}
        <p className="text-center text-gray-400 text-sm mt-8">annual plans available at checkout · save up to 20%</p>
      </div>
    </main>
  );
}
