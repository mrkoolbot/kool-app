import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const freeFeatures = [
    "1 active event at a time",
    "up to 25 guests",
    "smart checklist (event-specific)",
    "planning timeline",
    "budget tracker",
    "vendor list template",
    "3 invite templates",
    "public rsvp page",
    "guest dietary tracking",
  ];

  const premiumFeatures = [
    "unlimited events",
    "unlimited guests",
    "full ai-powered smart checklists",
    "unlimited invite templates",
    "vendor management suite",
    "full budget manager + payment tracking",
    "run of show builder",
    "day-of coordination mode",
    "collaborative guest playlist",
    "calendar sync + reminders",
    "mood board creator",
    "event style rendering",
    "digital thank you cards",
    "post-event memory book",
    "priority tkG consultation booking",
    "remove kool branding from rsvp pages",
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-kool-black">kool<span className="text-kool-red">.</span></Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-kool-black">log in</Link>
          <Link href="/signup" className="bg-kool-red text-white text-sm px-5 py-2.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors">get started free</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">pricing</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">simple, honest pricing.</h1>
          <p className="text-gray-500 text-lg">start free. upgrade when you need more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="border border-gray-200 rounded-sm p-8">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">free forever</div>
            <div className="text-6xl font-black mb-1">$0</div>
            <p className="text-gray-500 text-sm mb-8">no credit card required. ever.</p>
            <ul className="space-y-3 mb-10">
              {freeFeatures.map(f => (
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
            <div className="absolute -top-3.5 left-8 bg-kool-red text-white text-xs font-bold px-3 py-1 rounded-sm">most popular</div>
            <div className="text-xs font-bold text-kool-red uppercase tracking-wide mb-3">premium</div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-6xl font-black">$15</span>
              <span className="text-gray-400 text-lg pb-2">/month</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">or <strong className="text-kool-black">$99/year</strong> — save 45%</p>
            <p className="text-gray-400 text-xs mb-8">14-day free trial · cancel anytime</p>
            <ul className="space-y-3 mb-10">
              {premiumFeatures.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-kool-red mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=premium" className="block text-center bg-kool-red text-white py-3.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors">
              start premium trial →
            </Link>
          </div>
        </div>

        {/* TKG managed */}
        <div className="mt-16 bg-kool-black rounded-sm p-10 text-white text-center">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">the koolture group</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            for events that need a professional.
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
            paula mescolin is a six sigma-certified event producer with 8 years running a creative event firm.
            for high-stakes events — corporate summits, milestone celebrations, executive experiences —
            the koolture group handles everything from strategy to day-of production.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://www.thekoolturegroup.com/contact"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-kool-red text-white px-8 py-4 rounded-sm font-bold hover:bg-kool-crimson transition-colors"
            >
              hire tkG <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.thekoolturegroup.com"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 rounded-sm font-medium hover:border-white transition-colors"
            >
              learn about the koolture group
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
