"use client"

const heights: Record<string, number> = { sm: 36, md: 52, lg: 88 }

export function KoolLogo({ className = "", inverted = false, size = "md" }: {
  className?: string
  inverted?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const h = heights[size] || heights.md
  const w = Math.round(h * 2) // 400:200 aspect ratio = 2:1
  // inverted=true = dark logo on light background
  // inverted=false = white logo on dark background
  const src = inverted ? "/kool-logo-dark.svg" : "/kool-logo-white.svg"

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="kool events"
      width={w}
      height={h}
      className={className}
      style={{ display: "inline-block", width: w, height: h }}
    />
  )
}
