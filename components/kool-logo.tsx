"use client"

// Official kool logo — exact code from Paula Mescolin's Illustrator file
export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const scales: Record<string, number> = { sm: 0.35, md: 0.5, lg: 0.85 }
  const scale = scales[size] || 0.5
  const w = Math.round(400 * scale)
  const h = Math.round(200 * scale)
  const fill = inverted ? "#0a0a0a" : "#ffffff"

  return (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 400 200"
      width={w}
      height={h}
      className={className}
      style={{ display: "inline-block" }}
      aria-label="kool events"
    >
      <defs>
        <style>{`
          .kl-kool {
            font-family: var(--font-galano, 'Galano Grotesque', GalanoGrotesque-Bold, Arial Black, sans-serif);
            font-size: 110px;
            font-weight: 700;
            isolation: isolate;
          }
          .kl-events {
            font-family: var(--font-galano, 'Galano Grotesque', GalanoGrotesque-Medium, Arial, sans-serif);
            font-size: 21px;
            font-weight: 500;
            letter-spacing: 1.4em;
          }
        `}</style>
      </defs>
      {/* No background rect — transparent */}
      <text className="kl-kool" fill={fill} transform="translate(82 125.9)"><tspan x="0" y="0">kool</tspan></text>
      <path fill="#d90000" d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"/>
      <text className="kl-events" fill={fill} transform="translate(88.38 151.94) scale(.99 1)"><tspan x="0" y="0">events</tspan></text>
    </svg>
  )
}
