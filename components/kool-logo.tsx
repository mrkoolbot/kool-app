"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const heights: Record<string, string> = { sm: "32px", md: "48px", lg: "144px" }
  const h = heights[size] || "48px"

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={inverted ? "/kool-logo-inverted.svg" : "/kool-logo-transparent.svg"}
        alt="kool events"
        style={{ height: h, width: "auto" }}
      />
    </span>
  )
}
