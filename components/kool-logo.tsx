"use client"

// Inline SVG logo — uses page CSS fonts, renders correctly on all devices
export function KoolLogo({ className = "", inverted = false, size = "md" }: {
  className?: string
  inverted?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const heights: Record<string, number> = { sm: 36, md: 52, lg: 88 }
  const h = heights[size] || heights.md
  const w = h * 2

  const fill = inverted ? "#0a0a0a" : "#ffffff"

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      width={w}
      height={h}
      aria-label="kool events"
      role="img"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      {/* "kool" text */}
      <text
        x="78"
        y="133"
        style={{
          fontFamily: "var(--font-galano, 'Galano Grotesque', Arial Black, sans-serif)",
          fontWeight: 700,
          fontSize: 112,
          fill,
          letterSpacing: "-1px",
        }}
      >
        kool
      </text>
      {/* Heart mark — exact path from official file */}
      <path
        d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"
        fill="#d90000"
      />
      {/* "events" text */}
      <text
        x="90"
        y="158"
        style={{
          fontFamily: "var(--font-galano, 'Galano Grotesque', Arial, sans-serif)",
          fontWeight: 500,
          fontSize: 20,
          fill,
          letterSpacing: "8px",
        }}
      >
        events
      </text>
    </svg>
  )
}
