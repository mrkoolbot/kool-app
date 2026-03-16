"use client";

export function HeroAvatar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .hero-avatar-float {
          animation: floatUp 4s ease-in-out infinite;
        }
      `}</style>
      <div className="hero-avatar-float" style={{
        width: 96, height: 96, borderRadius: "50%", overflow: "hidden",
        border: "3px solid #eb1e00",
        boxShadow: "0 0 0 6px rgba(235,30,0,0.18)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/paula-avatar-3d.jpg"
          alt="Paula Mescolin"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div style={{
        marginTop: 12, background: "#fff", border: "1px solid #f0f0f0",
        borderRadius: "16px 16px 16px 4px", padding: "10px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)", maxWidth: 260, textAlign: "left",
      }}>
        <p style={{ fontSize: 12, color: "#231f20", margin: 0, lineHeight: 1.5 }}>
          "i built kool because i needed it. 20 years of events taught me what works."
        </p>
        <p style={{ fontSize: 11, color: "#eb1e00", fontWeight: 700, marginTop: 4 }}>
          — paula mescolin, founder TKG
        </p>
      </div>
    </div>
  );
}
