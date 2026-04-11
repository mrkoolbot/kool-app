"use client"

import { useRef } from "react"
import Link from "next/link"

interface RippleButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
}

export function RippleButton({ href, children, className = "", target }: RippleButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null)

  const createRipple = (e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const ripple = document.createElement("span")
    ripple.className = "ripple"
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    btn.appendChild(ripple)
    ripple.addEventListener("animationend", () => ripple.remove())
  }

  return (
    <Link
      ref={btnRef}
      href={href}
      target={target}
      className={`ripple-btn ${className}`}
      onClick={createRipple}
    >
      {children}
    </Link>
  )
}
