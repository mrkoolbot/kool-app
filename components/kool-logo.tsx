"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const textColor = inverted ? "#0A0A0A" : "#ffffff";
  const sizes = {
    sm: { kool: "22px", heart: "18px", events: "8px", gap: "1px" },
    md: { kool: "28px", heart: "22px", events: "10px", gap: "2px" },
    lg: { kool: "48px", heart: "38px", events: "16px", gap: "3px" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`} style={{ gap: s.gap }}>
      <span className="flex items-baseline" style={{ gap: "2px" }}>
        <span style={{ fontFamily: "var(--font-galano, 'Galano Grotesque', sans-serif)", fontWeight: 900, fontSize: s.kool, color: textColor, letterSpacing: "-0.02em", lineHeight: 1 }}>
          kool
        </span>
        <span style={{ fontSize: s.heart, color: "#D90000", lineHeight: 1, fontWeight: 900 }}>♥</span>
      </span>
      <span style={{ fontFamily: "var(--font-galano, 'Galano Grotesque', sans-serif)", fontWeight: 500, fontSize: s.events, color: textColor, letterSpacing: "0.25em", lineHeight: 1, opacity: 0.85 }}>
        events
      </span>
    </span>
  );
}
