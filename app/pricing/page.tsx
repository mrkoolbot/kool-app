import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const FREE_FEATURES = [
  "1 active event at a time",
  "up to 25 guests",
  "smart checklist (by event type)",
  "planning timeline auto-generated",
  "budget tracker",
  "vendor list",
  "3 invite templates",
  "RSVP page (sharable link)",
  "basic run of show",
];

const PREMIUM_FEATURES = [
  "unlimited events",
  "unlimited guests",
  "full AI-powered checklists",
  "complete vendor management suite",
  "budget manager + payment tracking",
  "run of show generator",
  "full invite template library",
  "collaborative playlist (Spotify)",
  "calendar sync (Google + Apple)",
  "email reminders to guests",
  "mood board creator",
  "priority TKG consultation booking",
  "advanced event insights",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight">kool<span className="text-kool-red">♥</span></Link>
        <Link href="/login" className="text-sm text-gray-500 hover:text-kool-black">log in</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">pricing</p>
          <h1 className="text-5xl font-black tracking-tight mb-4">start free.<br />go premium when ready.</h1>
          <p className="text-gray-500 text-lg">free forever for intimate events · no credit card required</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-sm p-8">
            <div className="text-sm font-bold text-gray-400 mb-2">free</div>
            <div className="text-6xl font-black mb-1">$0</div>
            <p className="text-gray-500 text-sm mb-8">forever. no credit card.</p>
            <ul className="space-y-3 mb-10">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center border-2 border-kool-black text-kool-black py-3.5 rounded-sm font-bold hover:bg-kool-black hover:text-white transition-colors">
              get started free
            </Link>
          </div>

          {/* Premium */}
          <div className="border-2 border-kool-red rounded-sm p-8 relative">
            <div className="absolute -top-3.5 left-8 bg-kool-red text-white text-xs font-bold px-4 py-1.5 rounded-sm">
              most popular
            </div>
            <div className="text-sm font-bold text-kool-red mb-2">premium</div>
            <div className="flex items-end gap-2 mb-1">
              <div className="text-6xl font-black">$15</div>
              <div className="text-gray-400 pb-2">/month</div>
            </div>
            <p className="text-gray-500 text-sm mb-8">or $99/year · save 45%</p>
            <ul className="space-y-3 mb-10">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-kool-red mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=premium" className="block text-center bg-kool-red text-white py-3.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors">
              start free trial
            </Link>
          </div>
        </div>

        {/* TKG section */}
        <div className="mt-16 bg-kool-black rounded-sm p-10 text-white text-center">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">for high-stakes events</p>
          <h2 className="text-3xl font-black mb-4">some events need more than a tool.</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            for corporate summits, executive galas, quinceañeras, and once-in-a-lifetime celebrations —
            paula mescolin and the koolture group handle everything. strategy, production, day-of execution.
          </p>
          <Link href="https://www.thekoolturegroup.com/contact" target="_blank"
            className="inline-flex items-center gap-2 bg-kool-red text-white px-8 py-4 rounded-sm font-bold hover:bg-kool-crimson transition-colors">
            hire the koolture group <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
