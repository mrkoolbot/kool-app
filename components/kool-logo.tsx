"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  // Scale factors based on size
  const scales: Record<string, number> = { sm: 0.45, md: 0.6, lg: 1 }
  const scale = scales[size] || 0.6
  const w = Math.round(400 * scale)
  const h = Math.round(200 * scale)

  const bg = inverted ? "#ffffff" : "#0a0a0a"
  const textFill = inverted ? "#0a0a0a" : "#ffffff"

  return (
    <span className={`inline-block ${className}`} style={{ lineHeight: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 200"
        width={w}
        height={h}
        aria-label="kool events"
        role="img"
      >
        <rect width="400" height="200" fill={bg} />
        {/* "kool" text — rendered as path approximation using text element with fallback */}
        <text
          x="82" y="125.9"
          fontFamily="'Galano Grotesque', 'GalanoGrotesque-Bold', Arial Black, sans-serif"
          fontWeight="700"
          fontSize="110"
          fill={textFill}
          style={{ isolation: "isolate" }}
          stroke={inverted ? "#0a0a0a" : "none"}
          strokeWidth="0.25"
        >kool</text>
        {/* Heart mark — exact path from the official SVG */}
        <path
          d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"
          fill="#d90000"
        />
        {/* "events" text */}
        <text
          x="88.38" y="151.94"
          fontFamily="'Galano Grotesque', GalanoGrotesque-Medium, Arial, sans-serif"
          fontWeight="500"
          fontSize="21"
          letterSpacing="29.4"
          fill={textFill}
          transform="scale(0.99 1)"
          style={{ transformOrigin: "88.38px 151.94px" }}
        >events</text>
      </svg>
    </span>
  )
}
