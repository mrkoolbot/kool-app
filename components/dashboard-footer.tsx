import Link from "next/link";
import { KoolLogo } from "@/components/kool-logo";

export function DashboardFooter() {
  return (
    <footer className="border-t border-gray-100 px-6 py-10 mt-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex flex-col items-start gap-2">
          <Link href="/"><KoolLogo size="sm" inverted={true} /></Link>
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
  );
}
