"use client";
import Image from "next/image";
import { useState } from "react";

interface PaulaAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showMessage?: boolean;
  message?: string;
  className?: string;
}

const SIZES = {
  sm: { container: "w-12 h-12", image: 48 },
  md: { container: "w-16 h-16", image: 64 },
  lg: { container: "w-24 h-24", image: 96 },
  xl: { container: "w-32 h-32", image: 128 },
};

const MESSAGES = [
  "ready to plan something unforgettable?",
  "every great event starts with a plan.",
  "let's make this event kool. ♥",
  "i've planned hundreds of events. this tool has everything i wish i had.",
  "need help? the koolture group is one click away.",
];

export function PaulaAvatar({
  size = "md",
  showMessage = false,
  message,
  className = "",
}: PaulaAvatarProps) {
  const [hovered, setHovered] = useState(false);
  const s = SIZES[size];
  const displayMessage = message || MESSAGES[0];

  return (
    <div className={`relative flex items-end gap-3 ${className}`}>
      {/* Speech bubble */}
      {showMessage && (
        <div
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max max-w-[220px] bg-white border border-gray-100 shadow-lg rounded-2xl rounded-bl-sm px-4 py-3 text-xs text-gray-700 font-medium leading-relaxed"
          style={{
            animation: "fadeInUp 0.4s ease both",
          }}
        >
          {displayMessage}
          {/* bubble tail */}
          <span className="absolute -bottom-2 left-6 w-0 h-0"
            style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #f3f4f6" }} />
          <span className="absolute -bottom-[7px] left-[25px] w-0 h-0"
            style={{ borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid white" }} />
        </div>
      )}

      {/* Avatar container */}
      <div
        className={`relative ${s.container} rounded-full overflow-hidden ring-2 ring-kool-red ring-offset-2 cursor-pointer select-none`}
        style={{ animation: "float 4s ease-in-out infinite" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src="/paula-avatar-hq.jpg"
          alt="Paula Mescolin — founder, the koolture group"
          fill
          className="object-cover object-top"
          style={{
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Pulse ring on hover */}
        {hovered && (
          <div className="absolute inset-0 rounded-full"
            style={{ animation: "pulseRing 1s ease-out infinite", border: "2px solid #eb1e00", opacity: 0.6 }} />
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Full welcome card variant for onboarding / dashboard
export function PaulaWelcomeCard({ name }: { name?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);

  return (
    <div className="bg-white border border-gray-100 rounded-sm p-5 flex items-start gap-4">
      <div
        className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-kool-red ring-offset-2 shrink-0"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <Image src="/paula-avatar-hq.jpg" alt="Paula Mescolin" fill className="object-cover object-top" />
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-kool-red tracking-wide mb-1">paula mescolin · founder, the koolture group</p>
        <p
          className="text-sm text-gray-700 leading-relaxed cursor-pointer hover:text-kool-black transition-colors"
          onClick={() => setMsgIndex((i) => (i + 1) % MESSAGES.length)}
          title="tap for more"
        >
          {name ? `hey ${name}! ` : ""}{MESSAGES[msgIndex]}
        </p>
        <p className="text-xs text-gray-300 mt-1">tap to read more ↻</p>
      </div>
    </div>
  );
}
