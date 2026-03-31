import { KoolLogo } from "@/components/kool-logo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "impressum",
  description: "KOOL Events legal disclosure — company information and contact details.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/"><KoolLogo /></Link>
        <Link href="/login" className="text-sm text-gray-500 hover:text-kool-black">
          log in
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] lowercase mb-4">
          legal
        </p>
        <h1 className="text-4xl font-black tracking-tight mb-2">impressum</h1>
        <p className="text-gray-400 text-sm mb-12">legal disclosure pursuant to § 5 TMG (Germany) and equivalent EU regulations</p>

        <div className="space-y-10 text-gray-600">

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">company</h2>
            <p className="text-base leading-relaxed">
              The Koolture Group<br />
              Florida, USA
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">represented by</h2>
            <p className="text-base leading-relaxed">
              Paula Mescolin<br />
              Owner &amp; Founder, The Koolture Group
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">contact</h2>
            <p className="text-base leading-relaxed">
              Email:{" "}
              <a href="mailto:hello@koolevents.app" className="text-kool-red hover:underline">
                hello@koolevents.app
              </a>
              <br />
              Website:{" "}
              <a href="https://koolevents.app" className="text-kool-red hover:underline">
                koolevents.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">platform</h2>
            <p className="text-base leading-relaxed">
              KOOL Events is a product of The Koolture Group, an event planning platform designed to support event professionals with planning, coordination, and execution tools.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">EU online dispute resolution</h2>
            <p className="text-base leading-relaxed">
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-kool-red hover:underline">
                ec.europa.eu/consumers/odr
              </a>
              <br />
              We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">liability for content</h2>
            <p className="text-base leading-relaxed">
              The contents of this website have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general law. We are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.2em] text-kool-black uppercase mb-3">copyright</h2>
            <p className="text-base leading-relaxed">
              The content and works created by the site operators on these pages are subject to US copyright law. The reproduction, editing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex gap-6 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-kool-black">privacy policy</Link>
          <Link href="/support" className="hover:text-kool-black">support</Link>
          <Link href="/" className="hover:text-kool-black">back to kool</Link>
        </div>
      </div>
    </main>
  );
}
