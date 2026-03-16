export default function AvatarTest() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 60, padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#231f20", margin: 0 }}>pick your avatar, paula</h1>

      <div style={{ display: "flex", gap: 60, flexWrap: "wrap", justifyContent: "center" }}>

        {/* Option A — Headshot */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#eb1e00", letterSpacing: "0.15em", margin: 0 }}>OPTION A — headshot</p>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", overflow: "hidden",
            border: "3px solid #eb1e00", boxShadow: "0 0 0 6px rgba(235,30,0,0.15)",
            animation: "floatUp 4s ease-in-out infinite",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-avatar-headshot.jpg" alt="headshot" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }} />
          </div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "12px 12px 12px 4px", padding: "10px 14px", maxWidth: 200, textAlign: "left", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 12, color: "#231f20", margin: 0 }}>"i built kool because i needed it."</p>
            <p style={{ fontSize: 11, color: "#eb1e00", fontWeight: 700, marginTop: 4 }}>— paula mescolin</p>
          </div>
          <p style={{ fontSize: 12, color: "#666", textAlign: "center", maxWidth: 180 }}>realistic · professional · personal</p>
        </div>

        {/* Option B — Cartoon no BG */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#eb1e00", letterSpacing: "0.15em", margin: 0 }}>OPTION B — cartoon</p>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", overflow: "hidden",
            border: "3px solid #eb1e00", boxShadow: "0 0 0 6px rgba(235,30,0,0.15)",
            background: "#231f20",
            animation: "floatUp 4s ease-in-out infinite",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/paula-avatar-cartoon-nobg.png" alt="cartoon" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "12px 12px 12px 4px", padding: "10px 14px", maxWidth: 200, textAlign: "left", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 12, color: "#231f20", margin: 0 }}>"i built kool because i needed it."</p>
            <p style={{ fontSize: 11, color: "#eb1e00", fontWeight: 700, marginTop: 4 }}>— paula mescolin</p>
          </div>
          <p style={{ fontSize: 12, color: "#666", textAlign: "center", maxWidth: 180 }}>playful · branded · illustrated</p>
        </div>

      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <p style={{ fontSize: 12, color: "#999", textAlign: "center" }}>
        send me "A" or "B" and I'll update everything instantly.
      </p>
    </div>
  );
}
