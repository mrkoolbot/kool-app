import { KoolLogo } from "@/components/kool-logo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy policy",
  description: "KOOL Events privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 22, 2026";

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/"><KoolLogo /></Link>
        <Link href="/login" className="text-sm text-gray-500 hover:text-kool-black">
          log in
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">
          legal
        </p>
        <h1 className="text-4xl font-black tracking-tight mb-2">privacy policy</h1>
        <p className="text-gray-400 text-sm mb-12">last updated: {lastUpdated}</p>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-8">

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">who we are</h2>
            <p>
              KOOL Events is a product of The Koolture Group LLC ("TKG", "we", "us", "our"),
              an event planning and brand strategy consultancy. Our app is available at{" "}
              <a href="https://koolevents.app" className="text-kool-red hover:underline">
                koolevents.app
              </a>{" "}
              and on the Apple App Store and Google Play Store.
            </p>
            <p className="mt-2">
              Questions? Contact us at{" "}
              <a href="mailto:hello@koolevents.app" className="text-kool-red hover:underline">
                hello@koolevents.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">what we collect</h2>
            <p>We collect only what we need to provide the service:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Account information:</strong> Your name and email address when you create
                an account.
              </li>
              <li>
                <strong>Event data:</strong> Event details, guest lists, vendor information,
                budgets, checklists, and timelines you create within the app.
              </li>
              <li>
                <strong>Usage data:</strong> How you interact with the app (pages visited,
                features used) to improve the product. This data is anonymous.
              </li>
              <li>
                <strong>Device information:</strong> Device type, operating system, and app
                version for technical support and crash reporting.
              </li>
              <li>
                <strong>Payment information:</strong> If you subscribe to KOOL Premium, payments
                are processed by Stripe. We do not store your card number.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">how we use your data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, operate, and improve the KOOL Events app</li>
              <li>To send transactional emails (account confirmation, password reset)</li>
              <li>To process payments for premium subscriptions</li>
              <li>To provide customer support</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal data. We do <strong>not</strong> use
              your event data to train AI models or share it with third parties for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">third-party services</h2>
            <p>We use the following trusted third-party services:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Supabase</strong> — database and authentication (
                <a href="https://supabase.com/privacy" className="text-kool-red hover:underline" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>)
              </li>
              <li>
                <strong>Stripe</strong> — payment processing (
                <a href="https://stripe.com/privacy" className="text-kool-red hover:underline" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>)
              </li>
              <li>
                <strong>Vercel</strong> — web hosting (
                <a href="https://vercel.com/legal/privacy-policy" className="text-kool-red hover:underline" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">data retention</h2>
            <p>
              We retain your data as long as your account is active. If you delete your account,
              we will delete your personal data within 30 days, except where we are required to
              retain it for legal or financial compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">
              your rights (GDPR & CCPA)
            </h2>
            <p>Depending on where you live, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Access</strong> the personal data we hold about you
              </li>
              <li>
                <strong>Correct</strong> inaccurate data
              </li>
              <li>
                <strong>Delete</strong> your data ("right to be forgotten")
              </li>
              <li>
                <strong>Export</strong> your data in a portable format
              </li>
              <li>
                <strong>Opt out</strong> of marketing communications at any time
              </li>
              <li>
                <strong>California residents (CCPA):</strong> You have the right to know what
                personal information we collect and the right to opt out of its sale. We do not
                sell personal information.
              </li>
            </ul>
            <p className="mt-3">
              To exercise these rights, email us at{" "}
              <a href="mailto:privacy@koolevents.app" className="text-kool-red hover:underline">
                privacy@koolevents.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">cookies</h2>
            <p>
              We use essential cookies to keep you logged in and remember your preferences. We do
              not use advertising or tracking cookies. You can disable cookies in your browser
              settings, though some features of the app may not work correctly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">children&apos;s privacy</h2>
            <p>
              KOOL Events is not directed at children under 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with
              their information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">security</h2>
            <p>
              We use industry-standard security measures including encrypted connections (HTTPS),
              secure database storage, and access controls. No system is 100% secure — if you
              have security concerns, contact{" "}
              <a href="mailto:security@koolevents.app" className="text-kool-red hover:underline">
                security@koolevents.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">changes to this policy</h2>
            <p>
              If we make material changes, we&apos;ll notify you by email or with a notice in the
              app. Continued use of KOOL Events after changes take effect means you accept the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-kool-black mb-3">contact</h2>
            <p>
              The Koolture Group LLC
              <br />
              Florida, USA
              <br />
              <a href="mailto:privacy@koolevents.app" className="text-kool-red hover:underline">
                privacy@koolevents.app
              </a>
            </p>
          </section>

        </div>
      </div>

      <footer className="border-t border-gray-100 px-6 py-8 mt-12">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
