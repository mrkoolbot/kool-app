"use client"

export function KoolLogo({ className = "", inverted = false, size = "md" }: { className?: string, inverted?: boolean, size?: "sm" | "md" | "lg" }) {
  const textColor = inverted ? "#0A0A0A" : "#0A0A0A";
  const sizes: Record<string, { height: string; fontSize: string; subSize: string; spacing: string }> = {
    sm: { height: "32px", fontSize: "20px", subSize: "7px", spacing: "0.22em" },
    md: { height: "44px", fontSize: "28px", subSize: "9px", spacing: "0.22em" },
    lg: { height: "72px", fontSize: "48px", subSize: "14px", spacing: "0.22em" },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex flex-col items-start ${className}`}
      style={{ lineHeight: 1, gap: "2px" }}
    >
      <span style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
        <span style={{
          fontFamily: "var(--font-galano, 'Galano Grotesque', Arial Black, sans-serif)",
          fontWeight: 900,
          fontSize: s.fontSize,
          color: textColor,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>kool</span>
        <span style={{ fontSize: `calc(${s.fontSize} * 0.75)`, color: "#D90000", fontWeight: 900, lineHeight: 1 }}>♥</span>
      </span>
      <span style={{
        fontFamily: "var(--font-galano, 'Galano Grotesque', Arial, sans-serif)",
        fontWeight: 500,
        fontSize: s.subSize,
        color: textColor,
        letterSpacing: s.spacing,
        lineHeight: 1,
        opacity: 0.7,
      }}>events</span>
    </span>
  );
}
