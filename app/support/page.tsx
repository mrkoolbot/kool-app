import { KoolLogo } from "@/components/kool-logo";
import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageCircle, BookOpen, HelpCircle, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "support",
  description: "Get help with KOOL Events — FAQs, contact, and everything you need.",
};

const FAQ = [
  {
    q: "is KOOL Events really free?",
    a: "yes. the free plan is free forever — no credit card, no trial period, no bait and switch. you get one active event, up to 25 guests, smart checklists, budget tracking, vendor list, RSVP page, and run of show. upgrade when you need more.",
  },
  {
    q: "what does the premium plan include?",
    a: "premium unlocks unlimited events and guests, AI-powered checklists, the full vendor management suite, budget manager with payment tracking, run of show generator, the full invite template library, collaborative playlist (Spotify), calendar sync (Google + Apple), guest email reminders, a mood board creator, advanced event insights, and priority TKG consultation booking.",
  },
  {
    q: "can I use KOOL Events for a wedding?",
    a: "absolutely. weddings are one of the event types KOOL was built for. the checklist engine has hundreds of wedding-specific tasks organized by timeline — from 12 months out to the morning of. the vendor manager, budget tracker, and run of show are especially useful for weddings.",
  },
  {
    q: "can I collaborate with a co-planner or vendor?",
    a: "collaboration features are on the roadmap. right now KOOL is designed for a single planner per event. you can share your RSVP link with guests, but real-time multi-user collaboration is coming in a future update.",
  },
  {
    q: "how do I share my RSVP page with guests?",
    a: "from your event dashboard, go to the Guests section and tap 'share RSVP link.' this generates a personalized link you can send via text, email, or social media. guests can confirm attendance and add their details without needing a KOOL account.",
  },
  {
    q: "can I cancel my premium subscription?",
    a: "yes, anytime. go to your account settings → subscription → cancel. you keep access until the end of your billing period. no cancellation fees.",
  },
  {
    q: "I forgot my password. how do I reset it?",
    a: "on the login page, tap 'forgot password' and enter your email. we'll send a reset link within a few minutes. check your spam folder if it doesn't arrive.",
  },
  {
    q: "how do I delete my account?",
    a: "go to account settings → danger zone → delete account. this permanently removes your account and all associated data within 30 days. this action cannot be undone.",
  },
  {
    q: "is my event data private?",
    a: "yes. your events, guest lists, vendor info, and budgets are private to your account. we don't share your data with third parties for advertising, and we don't use your event data to train AI models. full details in our privacy policy.",
  },
  {
    q: "what devices and browsers does KOOL support?",
    a: "KOOL Events works on any modern browser (Chrome, Safari, Firefox, Edge) on desktop, tablet, and mobile. the native iOS and Android apps are available on the App Store and Google Play.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/"><KoolLogo /></Link>
        <Link href="/login" className="text-sm text-gray-500 hover:text-kool-black">
          log in
        </Link>
      </nav>

      {/* Hero */}
      <div className="bg-kool-black text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] lowercase mb-4">
            support
          </p>
          <h1 className="text-5xl font-black tracking-tight mb-4">
            we&apos;ve got you.
          </h1>
          <p className="text-gray-400 text-lg">
            find answers fast, or reach a real human. no bots. no runaround.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black tracking-tight mb-8">get in touch</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-16">

          <a
            href="mailto:hello@koolevents.app"
            className="border border-gray-200 rounded-sm p-6 hover:border-kool-red transition-colors group"
          >
            <Mail className="w-6 h-6 text-kool-red mb-3" />
            <h3 className="font-bold text-kool-black mb-1">email us</h3>
            <p className="text-sm text-gray-500 mb-2">
              for account issues, billing, and everything else.
            </p>
            <p className="text-xs text-kool-red font-semibold group-hover:underline">
              hello@koolevents.app
            </p>
          </a>

          <a
            href="https://instagram.com/koolevents"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 rounded-sm p-6 hover:border-kool-red transition-colors group"
          >
            <MessageCircle className="w-6 h-6 text-kool-red mb-3" />
            <h3 className="font-bold text-kool-black mb-1">dm us</h3>
            <p className="text-sm text-gray-500 mb-2">
              quick questions? find us on instagram.
            </p>
            <p className="text-xs text-kool-red font-semibold group-hover:underline">
              @koolevents
            </p>
          </a>

          <Link
            href="/pricing"
            className="border border-gray-200 rounded-sm p-6 hover:border-kool-red transition-colors group"
          >
            <BookOpen className="w-6 h-6 text-kool-red mb-3" />
            <h3 className="font-bold text-kool-black mb-1">pricing & plans</h3>
            <p className="text-sm text-gray-500 mb-2">
              compare free vs. premium features.
            </p>
            <p className="text-xs text-kool-red font-semibold group-hover:underline">
              view plans →
            </p>
          </Link>

        </div>

        {/* Response time note */}
        <div className="bg-gray-50 border border-gray-100 rounded-sm px-6 py-4 mb-16 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500">
            <strong className="text-kool-black">response time:</strong> we typically respond within 24 hours on business days (Monday–Friday, Eastern time). for urgent issues, email is fastest.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-8">frequently asked questions</h2>
          <div className="space-y-0 border-t border-gray-100">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group border-b border-gray-100 py-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-kool-black pr-4">{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Still stuck */}
        <div className="mt-16 text-center border border-gray-200 rounded-sm py-12 px-8">
          <h3 className="text-xl font-black tracking-tight mb-2">still stuck?</h3>
          <p className="text-gray-500 text-sm mb-6">
            if you didn&apos;t find what you needed, just ask. we&apos;re real people who love events and want your planning to go smoothly.
          </p>
          <a
            href="mailto:hello@koolevents.app"
            className="inline-flex items-center gap-2 bg-kool-black text-white text-sm font-bold px-6 py-3 hover:bg-kool-red transition-colors"
          >
            <Mail className="w-4 h-4" />
            email us
          </a>
        </div>
      </div>

      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <KoolLogo />
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-kool-black">privacy</Link>
            <Link href="/support" className="hover:text-kool-black">support</Link>
            <Link href="/pricing" className="hover:text-kool-black">pricing</Link>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} the koolture group llc
          </p>
        </div>
      </footer>
    </main>
  );
}
