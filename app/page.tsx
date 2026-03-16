import { KoolLogo } from "@/components/kool-logo";
import { HeroAvatar } from "@/components/hero-avatar";
import Link from "next/link";
import { Calendar, CheckSquare, Users, DollarSign, Clock, Star, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-kool-red" />,
      title: "smart planning timelines",
      desc: "auto-generated countdowns and task schedules built for your specific event type and date.",
    },
    {
      icon: <CheckSquare className="w-6 h-6 text-kool-red" />,
      title: "expert checklists",
      desc: "hundreds of tasks — organized by category, priority, and timeline. built from 8 years of real events.",
    },
    {
      icon: <Users className="w-6 h-6 text-kool-red" />,
      title: "guest management & rsvp",
      desc: "track every guest, send rsvp links, manage dietary needs. up to 25 guests free, unlimited on premium.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-kool-red" />,
      title: "budget tracker",
      desc: "set your total budget, allocate by category, track estimated vs actual costs in real time.",
    },
    {
      icon: <Clock className="w-6 h-6 text-kool-red" />,
      title: "vendor management",
      desc: "track every vendor from first contact to payment. contracts, deposits, confirmations — all in one place.",
    },
    {
      icon: <Star className="w-6 h-6 text-kool-red" />,
      title: "run of show builder",
      desc: "build your day-of timeline minute by minute. assign tasks. coordinate like a pro.",
    },
  ];

  const eventTypes = [
    "weddings", "milestone birthdays", "quinceañeras", "baby showers",
    "corporate events", "graduation parties", "retirement celebrations",
    "engagement parties", "holiday parties", "dinner parties", "brand launches", "galas",
  ];

  return (
    <main className="min-h-screen bg-white text-kool-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-kool-black">
          <KoolLogo />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/pricing" className="hover:text-kool-red transition-colors">pricing</Link>
          <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-kool-red transition-colors">the koolture group</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-kool-black transition-colors">log in</Link>
          <Link
            href="/signup"
            className="bg-kool-red text-white text-sm px-5 py-2.5 rounded-sm font-semibold hover:bg-kool-crimson transition-colors"
          >
            get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-center">

        {/* Paula avatar — hero */}
        <HeroAvatar />

        <p className="text-kool-red text-xs font-bold tracking-[0.3em] mb-6">
          event planning by paula mescolin
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-kool-black leading-[0.95] mb-8 tracking-tight">
          plan kool events.<br />
          <span className="text-kool-red">live unforgettable</span><br />
          moments.
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          the first event planning platform designed by a six sigma-certified brand strategist
          and 8-year event production founder. every checklist, timeline, and template
          is built from hundreds of real events.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-kool-red text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-kool-crimson transition-colors inline-flex items-center justify-center gap-2"
          >
            start planning free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto border border-gray-200 text-kool-black px-10 py-5 rounded-sm font-semibold text-lg hover:border-kool-black transition-colors inline-flex items-center justify-center"
          >
            see all features
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-6">free forever for up to 25 guests · no credit card required</p>
      </section>

      {/* Event types marquee */}
      <section className="py-6 bg-kool-black overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap text-white/40 text-sm font-medium tracking-wide">
          {[...eventTypes, ...eventTypes].map((type, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              {type}
              <span className="text-kool-red">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] text-center mb-4">how it works</p>
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">
          from idea to unforgettable<br />in three steps.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "create your event",
              desc: "tell us the type, date, location, and guest count. kool instantly generates your personalized planning dashboard.",
            },
            {
              number: "02",
              title: "plan everything",
              desc: "work through your smart checklist, manage vendors, track your budget, and build your day-of timeline — all in one place.",
            },
            {
              number: "03",
              title: "celebrate in style",
              desc: "send beautiful rsvp links, coordinate your team with the run of show, and walk into your event knowing every detail is handled.",
            },
          ].map((step) => (
            <div key={step.number} className="relative">
              <div className="text-8xl font-black text-gray-100 mb-4 leading-none">{step.number}</div>
              <h3 className="text-xl font-bold mb-3 -mt-6">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] text-center mb-4">features</p>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">
            everything your event needs.<br />nothing it doesn&apos;t.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-sm border border-gray-100 hover:border-kool-red transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium preview */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] text-center mb-4">pricing</p>
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tight">start free. go premium when ready.</h2>
        <p className="text-gray-500 text-center mb-16">free forever for intimate events · premium unlocks everything</p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-sm p-8">
            <div className="text-sm font-bold text-gray-400 mb-2">free</div>
            <div className="text-5xl font-black mb-1">$0</div>
            <p className="text-gray-500 text-sm mb-8">forever free for intimate events</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              {["1 active event", "up to 25 guests", "smart checklist", "planning timeline", "budget tracker", "3 invite templates", "vendor list"].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center border border-kool-black text-kool-black py-3 rounded-sm font-semibold hover:bg-kool-black hover:text-white transition-colors">
              get started free
            </Link>
          </div>
          {/* Premium */}
          <div className="border-2 border-kool-red rounded-sm p-8 relative">
            <div className="absolute -top-3 left-8 bg-kool-red text-white text-xs font-bold px-3 py-1 rounded-sm">most popular</div>
            <div className="text-sm font-bold text-kool-red mb-2">premium</div>
            <div className="text-5xl font-black mb-1">$15<span className="text-2xl font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-500 text-sm mb-8">or $99/year · save 45%</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              {[
                "unlimited events",
                "unlimited guests",
                "full ai-powered checklists",
                "vendor management suite",
                "budget manager + payments",
                "run of show generator",
                "full invite template library",
                "collaborative playlist",
                "calendar sync + reminders",
                "priority tkG consultation",
              ].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-kool-red flex items-center justify-center text-xs text-white">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=premium" className="block text-center bg-kool-red text-white py-3 rounded-sm font-bold hover:bg-kool-crimson transition-colors">
              start premium free trial
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-6">
          <Link href="/pricing" className="underline hover:text-kool-black transition-colors">see full feature comparison →</Link>
        </p>
      </section>

      {/* TKG FOMO Section */}
      <section className="py-24 px-6 bg-kool-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] mb-6">for the events that matter most</p>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
            your event deserves more<br />than a planning tool.
          </h2>
          {/* Paula animated avatar */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-kool-red ring-offset-4 ring-offset-kool-black animate-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/paula-avatar-headshot.jpg" alt="Paula Mescolin" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute inset-0 rounded-full ring-4 ring-kool-red opacity-30 animate-pulse-out" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs text-center">
              <p className="text-white text-sm font-medium leading-relaxed">
                "i built kool because i needed it. 20 years of events taught me what works."
              </p>
              <p className="text-kool-red text-xs font-bold mt-2">— paula mescolin, founder</p>
            </div>
          </div>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            KOOL was built by paula mescolin — brand strategist, six sigma-certified event producer,
            and founder of the koolture group. 20 years of enterprise brand strategy.
            8 years running a creative event production firm in rio de janeiro.
          </p>
          <p className="text-white/60 text-lg mb-12">
            for high-stakes events — corporate summits, executive galas, milestone celebrations
            that need to be perfect — <span className="text-white font-semibold">paula and the koolture group can run the entire show.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://thekoolturegroup.com/contact"
              target="_blank"
              className="w-full sm:w-auto bg-kool-red text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-kool-crimson transition-colors inline-flex items-center justify-center gap-2"
            >
              hire the koolture group <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="https://thekoolturegroup.com"
              target="_blank"
              className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-sm font-semibold text-lg hover:border-white transition-colors inline-flex items-center justify-center"
            >
              learn more about tkG
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-xl font-black tracking-tight text-kool-black">
              <KoolLogo />
            </Link>
            <p className="text-gray-400 text-xs mt-1">event planning by paula mescolin · the koolture group</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link href="/pricing" className="hover:text-kool-black transition-colors">pricing</Link>
            <Link href="/login" className="hover:text-kool-black transition-colors">log in</Link>
            <Link href="/signup" className="hover:text-kool-black transition-colors">sign up</Link>
            <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-kool-black transition-colors">the koolture group</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
