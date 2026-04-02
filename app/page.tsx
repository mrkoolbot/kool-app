import { KoolLogo } from "@/components/kool-logo";

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
      desc: "hundreds of tasks — organized by category, priority, and timeline. built from 20 years of real events.",
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
    "corporate events", "galas", "retreats", "milestone birthdays",
    "anniversaries", "special events", "team bonding events", "weddings",
    "graduation", "award ceremonies",
  ];

  return (
    <main className="min-h-screen bg-white text-kool-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-kool-black">
          <KoolLogo inverted={true} size="md" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/pricing" className="hover:text-kool-red transition-colors">pricing</Link>
          <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-kool-red transition-colors">the koolture group</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline text-sm text-gray-600 hover:text-kool-black transition-colors">log in</Link>
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

        {/* Logo — large */}
        <div className="flex justify-center mb-6">
          <KoolLogo inverted={true} size="lg" />
        </div>


        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-kool-black leading-[0.95] mb-8 tracking-tight">
          the tool that makes<br />
          <span className="text-kool-red">any event feel</span><br />
          like a production.
        </h1>

        {/* Paula floating headshot — after the header */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-kool-red ring-offset-4 ring-offset-white animate-float">
              <img src="/paula-avatar-headshot.jpg" alt="Paula Mescolin" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute inset-0 rounded-full ring-4 ring-kool-red opacity-30 animate-pulse" />
          </div>
          <div className="mt-4 border border-kool-red/20 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs text-center bg-gray-50">
            <p className="text-gray-700 text-sm font-medium leading-relaxed">
              "i built kool because i needed it. 20 years of events taught me what works."
            </p>
            <p className="text-kool-red text-xs font-bold mt-2">— paula mescolin, founder</p>
          </div>
        </div>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          designed by a six sigma-certified brand strategist and internationally recognized event planning executive.
          every checklist, timeline, and template is built from 20 years of real events.
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

        {/* App Store badges — coming soon */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-3 border border-gray-200 px-6 py-3 rounded-sm text-left opacity-60 cursor-not-allowed">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-kool-black" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <div>
              <p className="text-[10px] text-gray-400 lowercase">coming soon</p>
              <p className="text-sm font-bold text-kool-black lowercase">app store</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border border-gray-200 px-6 py-3 rounded-sm text-left opacity-60 cursor-not-allowed">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-kool-black" xmlns="http://www.w3.org/2000/svg"><path d="M3.18 23.76c.3.17.64.22.98.14l13.12-7.57-2.83-2.83-11.27 10.26zm-1.7-20.1C1.18 3.96 1 4.34 1 4.8v14.4c0 .46.18.84.48 1.14l.06.06 8.07-8.07v-.19L1.54 3.6l-.06.06zm17.8 7.67l-2.28-1.32-3.17 3.17 3.17 3.16 2.3-1.33c.65-.38.65-1.3-.02-1.68zm-17.1 9.3L14.4 12 2.18 3.37l-.06.06z"/></svg>
            <div>
              <p className="text-[10px] text-gray-400 lowercase">coming soon</p>
              <p className="text-sm font-bold text-kool-black lowercase">google play</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event types marquee */}
      <section className="py-6 bg-kool-black overflow-hidden">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track gap-8 text-white/60 text-sm font-medium tracking-widest lowercase">
          {[...eventTypes, ...eventTypes].map((type, i) => (
            <span key={i} className="inline-flex items-center gap-8 whitespace-nowrap px-4">
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

      {/* 3-tier pricing preview */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] text-center mb-4">pricing</p>
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tight">plan with intention. execute with kool.</h2>
        <p className="text-gray-500 text-center mb-16">free forever to start · no credit card required</p>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-sm p-8">
            <div className="text-sm font-bold text-gray-400 mb-2">free</div>
            <div className="text-4xl font-black mb-1">$0</div>
            <p className="text-gray-500 text-sm mb-8">forever. no credit card.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-8">
              {["1 active event", "up to 25 guests", "smart checklist (20+ categories)", "run of show / timeline", "budget tracker", "vendor management", "catering calculator", "public event landing page", "guest rsvp page"].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-200 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center border border-kool-black text-kool-black py-3 font-semibold hover:bg-kool-black hover:text-white transition-colors text-sm">
              get started free
            </Link>
          </div>
          {/* Premium */}
          <div className="border-2 border-kool-red rounded-sm p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kool-red text-white text-xs font-bold px-3 py-1">most popular</div>
            <div className="text-sm font-bold text-kool-red mb-2">premium</div>
            <div className="text-4xl font-black mb-1">$25<span className="text-xl font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-500 text-sm mb-8">unlimited events + guests</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-8">
              {["everything in free, plus:", "unlimited events", "unlimited guests", "smart timeline generator", "automated email sequences", "qr code check-in", "conditional rsvp logic", "custom event branding", "priority TKG consultation"].map(f => (
                <li key={f} className={`flex items-center gap-2 ${f === "everything in free, plus:" ? "text-gray-400 text-xs font-bold lowercase tracking-widest" : ""}`}>
                  {f !== "everything in free, plus:" && <span className="w-3 h-3 rounded-full bg-kool-red flex-shrink-0" />}
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=premium" className="block text-center bg-kool-red text-white py-3 font-bold hover:bg-kool-crimson transition-colors text-sm">
              start premium
            </Link>
          </div>
          {/* Unlimited */}
          <div className="border border-gray-200 rounded-sm p-8 bg-[#0A0A0A] text-white">
            <div className="text-sm font-bold text-gray-400 mb-2">unlimited</div>
            <div className="text-4xl font-black mb-1">$39<span className="text-xl font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-400 text-sm mb-8">unlimited events + guests</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-8">
              {["everything in premium, plus:", "event war room", "guest intelligence", "smart event blueprints", "post-event brain", "white-label rsvp pages", "dedicated support"].map(f => (
                <li key={f} className={`flex items-center gap-2 ${f === "everything in premium, plus:" ? "text-gray-500 text-xs font-bold lowercase tracking-widest" : ""}`}>
                  {f !== "everything in premium, plus:" && <span className="w-3 h-3 rounded-full bg-kool-red flex-shrink-0" />}
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=unlimited" className="block text-center border border-white text-white py-3 font-bold hover:bg-white hover:text-kool-black transition-colors text-sm">
              go unlimited
            </Link>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
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
            kool was built by paula mescolin — brand strategist and founder of the koolture group.
            20 years of enterprise brand strategy and event planning for top tier clients.
          </p>
          <p className="text-white/60 text-lg mb-12">
            for high-stakes events — corporate summits, executive galas, milestone celebrations
            that build long-lasting memories and make an impact — <span className="text-white font-semibold">the koolture group team (TKG) can run the entire show.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://thekoolturegroup.com/contact"
              target="_blank"
              className="w-full sm:w-auto bg-kool-red text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-kool-crimson transition-colors inline-flex items-center justify-center gap-2"
            >
              hire TKG <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="https://thekoolturegroup.com"
              target="_blank"
              className="w-full sm:w-auto border border-white/20 text-white px-10 py-5 rounded-sm font-semibold text-lg hover:border-white transition-colors inline-flex items-center justify-center"
            >
              learn more about TKG
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-1.5">
            <Link href="/" style={{ display: "inline-block", marginLeft: "-29px" }}>
              <KoolLogo inverted={true} size="sm" />
            </Link>
            <p className="text-gray-400 text-xs">intellectual property of the koolture group (TKG). all rights reserved.</p>
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
