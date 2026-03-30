"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const textColor = inverted ? "#0A0A0A" : "#ffffff";

  const sizes: Record<string, { kool: string; heart: string; events: string; gap: string; letterSpacing: string }> = {
    sm: { kool: "22px",  heart: "16px", events: "7px",  gap: "1px",  letterSpacing: "0.22em" },
    md: { kool: "32px",  heart: "24px", events: "10px", gap: "2px",  letterSpacing: "0.22em" },
    lg: { kool: "56px",  heart: "40px", events: "16px", gap: "3px",  letterSpacing: "0.22em" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex flex-col items-start leading-none select-none ${className}`}
      style={{ gap: s.gap }}
    >
      <span className="flex items-baseline" style={{ gap: "1px", lineHeight: 1 }}>
        <span
          className="font-galano font-black"
          style={{
            fontSize: s.kool,
            color: textColor,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            fontFamily: "var(--font-galano, 'Galano Grotesque', Arial Black, sans-serif)",
            fontWeight: 700,
          }}
        >
          kool
        </span>
        <span style={{ fontSize: s.heart, color: "#D90000", lineHeight: 1, fontWeight: 900 }}>♥</span>
      </span>
      <span
        className="font-galano"
        style={{
          fontSize: s.events,
          color: textColor,
          letterSpacing: s.letterSpacing,
          lineHeight: 1,
          fontFamily: "var(--font-galano, 'Galano Grotesque', Arial, sans-serif)",
          fontWeight: 500,
          opacity: 0.85,
        }}
      >
        events
      </span>
    </span>
  );
}
