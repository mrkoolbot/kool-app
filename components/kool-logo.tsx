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
        {/* Exact code from official logo file — no background rect */}
        <text
          fontFamily="GalanoGrotesque-Bold, 'Galano Grotesque'"
          fontSize="110"
          fontWeight="700"
          fill={fill}
          transform="translate(82 125.9)"
        ><tspan x="0" y="0">kool</tspan></text>
        {/* Exact heart path from official file */}
        <path
          fill="#d90000"
          d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"
        />
        {/* "events" — exact from official file */}
        <text
          fontFamily="GalanoGrotesque-Medium, 'Galano Grotesque'"
          fontSize="21"
          fontWeight="500"
          letterSpacing="29.4"
          fill={fill}
          transform="translate(88.38 151.94) scale(.99 1)"
        ><tspan x="0" y="0">events</tspan></text>
      </svg>
    </span>
  )
}
