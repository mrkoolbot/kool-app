"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const scales: Record<string, number> = { sm: 0.35, md: 0.5, lg: 0.85 }
  const scale = scales[size] || 0.5
  const w = 400 * scale
  const h = 200 * scale
  const fill = inverted ? "#0a0a0a" : "#ffffff"

  return (
    <span className={`inline-block ${className}`} style={{ lineHeight: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 200"
        width={w}
        height={h}
        aria-label="kool events"
        role="img"
        style={{ display: "block" }}
      >
        {/* No background rect — transparent */}
        {/* "kool" — Galano Grotesque Bold 110px */}
        <text
          x="82" y="125.9"
          fontFamily="'Galano Grotesque', GalanoGrotesque-Bold, 'Arial Black', sans-serif"
          fontWeight="700"
          fontSize="110"
          fill={fill}
          strokeWidth="0.25"
          stroke={inverted ? "#0a0a0a" : "none"}
        >kool</text>
        {/* Exact heart path from official SVG */}
        <path
          d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"
          fill="#d90000"
        />
        {/* "events" — Galano Grotesque Medium, wide spacing */}
        <text
          x="88.38" y="151.94"
          fontFamily="'Galano Grotesque', GalanoGrotesque-Medium, Arial, sans-serif"
          fontWeight="500"
          fontSize="21"
          letterSpacing="29"
          fill={fill}
        >events</text>
      </svg>
    </span>
  )
}
