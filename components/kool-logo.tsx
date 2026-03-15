export function KoolLogo({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight ${className}`} style={{ fontFamily: "var(--font-galano), system-ui, sans-serif" }}>
      kool
      <svg
        viewBox="0 0 24 22"
        fill="#eb1e00"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.55em",
          height: "0.55em",
          marginLeft: "0.04em",
          verticalAlign: "baseline",
          marginBottom: "-0.05em",
          flexShrink: 0,
        }}
      >
        {/* Classic playing card heart — two circles top, sharp V point bottom */}
        <path d="M12 21.5 C12 21.5 1 13.5 1 6.5 C1 3.5 3.5 1 6.5 1 C8.8 1 10.8 2.4 12 4.4 C13.2 2.4 15.2 1 17.5 1 C20.5 1 23 3.5 23 6.5 C23 13.5 12 21.5 12 21.5 Z" />
      </svg>
    </span>
  );
}
