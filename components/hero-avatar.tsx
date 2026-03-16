"use client";
import { useRef, useState } from "react";

export function HeroAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .hero-avatar-float { animation: floatUp 4s ease-in-out infinite; }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .hero-pulse-ring { animation: pulseRing 2s ease-out infinite; }
      `}</style>

      {/* Talking video avatar */}
      <div className="hero-avatar-float" style={{ position: "relative", cursor: "pointer" }} onClick={handlePlay}>
        {/* Pulse ring */}
        {!playing && (
          <div className="hero-pulse-ring" style={{
            position: "absolute", inset: -6, borderRadius: "50%",
            border: "2px solid #eb1e00", pointerEvents: "none",
          }} />
        )}
        {/* Circle video */}
        <div style={{
          width: 110, height: 110, borderRadius: "50%", overflow: "hidden",
          border: "3px solid #eb1e00", boxShadow: "0 0 0 5px rgba(235,30,0,0.12)",
          position: "relative", background: "#111",
        }}>
          <video
            ref={videoRef}
            src="/paula-welcome.mp4"
            playsInline
            onEnded={() => setPlaying(false)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 5%" }}
          />
          {/* Play overlay */}
          {!playing && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", background: "rgba(0,0,0,0.35)",
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: "20px solid white",
                marginLeft: 5,
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Speech bubble */}
      <div style={{
        marginTop: 14, background: "#fff", border: "1px solid #f0f0f0",
        borderRadius: "16px 16px 16px 4px", padding: "10px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)", maxWidth: 260, textAlign: "left",
      }}>
        <p style={{ fontSize: 12, color: "#231f20", margin: 0, lineHeight: 1.5 }}>
          {playing ? "▶ playing..." : "▶ tap to hear from paula"}
        </p>
        <p style={{ fontSize: 11, color: "#eb1e00", fontWeight: 700, marginTop: 4 }}>
          — paula mescolin, founder TKG
        </p>
      </div>
    </div>
  );
}
