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
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .hero-pulse-ring { animation: pulseRing 2.5s ease-out infinite; }
      `}</style>

      {/* Floating headshot circle */}
      <div className="hero-avatar-float" style={{ position: "relative", marginBottom: 16 }}>
        <div className="hero-pulse-ring" style={{
          position: "absolute", inset: -8, borderRadius: "50%",
          border: "2px solid #eb1e00", pointerEvents: "none",
        }} />
        <div style={{
          width: 100, height: 100, borderRadius: "50%", overflow: "hidden",
          border: "3px solid #eb1e00", boxShadow: "0 0 0 5px rgba(235,30,0,0.12)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/paula-avatar-headshot.jpg"
            alt="Paula Mescolin"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%" }}
          />
        </div>
      </div>

      {/* Video card — proper dimensions */}
      <div style={{
        background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)", overflow: "hidden",
        width: 260, cursor: "pointer",
      }} onClick={handlePlay}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "#111" }}>
          <video
            ref={videoRef}
            src="/paula-welcome.mp4"
            playsInline
            onEnded={() => setPlaying(false)}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          {!playing && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: "#eb1e00",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(235,30,0,0.4)",
              }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                  borderLeft: "18px solid white",
                  marginLeft: 4,
                }} />
              </div>
              <p style={{ color: "white", fontSize: 12, marginTop: 10, fontWeight: 600 }}>hear from paula</p>
            </div>
          )}
        </div>
        <div style={{ padding: "10px 14px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#eb1e00", margin: 0 }}>paula mescolin · founder, TKG</p>
        </div>
      </div>
    </div>
  );
}
