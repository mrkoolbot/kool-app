"use client"
import Link from "next/link"
import { KoolLogo } from "@/components/kool-logo"

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-black tracking-tight text-kool-black">
        <KoolLogo inverted={true} size="md" />
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
        <Link href="/pricing" className="hover:text-kool-red transition-colors">pricing</Link>
        <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-kool-red transition-colors">the koolture group</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm text-gray-600 hover:text-kool-black transition-colors">log in</Link>
        <Link href="/signup" className="bg-kool-red text-white text-sm font-bold px-4 py-2 hover:bg-red-700 transition-colors">
          get started free
        </Link>
      </div>
    </nav>
  )
}
