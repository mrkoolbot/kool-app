import Image from "next/image"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const heights: Record<string, number> = { sm: 32, md: 48, lg: 72 }
  const h = heights[size] || 48
  const w = h * 2 // logo is 400x200 = 2:1 ratio

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={inverted ? "/kool-logo-inverted.svg" : "/kool-logo-v2.svg"}
        alt="kool events"
        width={w}
        height={h}
        style={{ height: h, width: "auto" }}
        priority
      />
    </span>
  )
}
