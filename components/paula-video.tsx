"use client";
import { useState, useRef } from "react";

export function PaulaVideoAvatar() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <div style={{
      background: "#fff", border: "1px solid #f3f4f6", borderRadius: 4,
      padding: "20px", display: "flex", alignItems: "center", gap: 16,
    }}>
      {/* Video avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", overflow: "hidden",
          border: "2px solid #eb1e00", boxShadow: "0 0 0 4px rgba(235,30,0,0.15)",
          cursor: "pointer",
        }}
          onClick={handlePlay}
        >
          <video
            ref={videoRef}
            src="/paula-welcome.mp4"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            playsInline
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", background: "rgba(0,0,0,0.2)", borderRadius: "50%",
            }}>
              <div style={{
                width: 0, height: 0, borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent", borderLeft: "16px solid white",
                marginLeft: 4,
              }} />
            </div>
          )}
        </div>
        {!playing && (
          <div style={{
            position: "absolute", bottom: 0, right: 0, background: "#eb1e00",
            borderRadius: "50%", width: 20, height: 20, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 0, height: 0, borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent", borderLeft: "7px solid white",
              marginLeft: 2,
            }} />
          </div>
        )}
      </div>

      {/* Message */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#eb1e00", letterSpacing: "0.1em", marginBottom: 6 }}>
          paula mescolin · founder, the koolture group
        </p>
        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 4 }}>
          {playing ? "playing welcome message..." : ""}
        </p>
        {!playing && (
          <button
            onClick={handlePlay}
            style={{
              background: "#eb1e00", color: "#fff", border: "none", borderRadius: 4,
              padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            ▶ play welcome
          </button>
        )}
      </div>
    </div>
  );
}
