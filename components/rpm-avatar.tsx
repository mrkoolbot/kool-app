"use client";
import { useEffect, useRef, useState } from "react";

// Default Paula avatar URL — replace with real RPM avatar URL once created
const DEFAULT_AVATAR_URL = "https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb";

interface RPMAvatarProps {
  avatarUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  showCreator?: boolean;
  onAvatarCreated?: (url: string) => void;
  className?: string;
}

const SIZES = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-40 h-40",
  xl: "w-56 h-56",
};

export function RPMAvatar({
  avatarUrl,
  size = "md",
  animate = true,
  showCreator = false,
  onAvatarCreated,
  className = "",
}: RPMAvatarProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [creatorOpen, setCreatorOpen] = useState(showCreator);
  const [currentUrl, setCurrentUrl] = useState(avatarUrl || DEFAULT_AVATAR_URL);

  // Listen for avatar creation message from RPM iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://thekoolturegroup.readyplayer.me" &&
          event.origin !== "https://readyplayer.me") return;
      if (event.data?.source === "readyplayerme") {
        const { eventName, data } = event.data;
        if (eventName === "v1.avatar.exported" && data?.url) {
          setCurrentUrl(data.url);
          setCreatorOpen(false);
          onAvatarCreated?.(data.url);
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onAvatarCreated]);

  if (creatorOpen) {
    return (
      <div className={`relative ${className}`}>
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm overflow-hidden w-full max-w-2xl h-[600px] relative">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <span className="font-bold text-sm">create your avatar</span>
              <button onClick={() => setCreatorOpen(false)} className="text-gray-400 hover:text-kool-black text-sm">✕ close</button>
            </div>
            <iframe
              ref={iframeRef}
              src={`https://thekoolturegroup.readyplayer.me/avatar?frameApi&clearCache`}
              className="w-full h-full border-0"
              allow="camera *; microphone *"
              title="Ready Player Me Avatar Creator"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div
        className={`${SIZES[size]} relative rounded-full overflow-hidden ring-2 ring-kool-red ring-offset-2`}
        style={animate ? { animation: "float 4s ease-in-out infinite" } : {}}
      >
        {/* Model viewer for 3D GLB avatar */}
        <model-viewer
          src={currentUrl}
          alt="Paula Mescolin avatar"
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="20deg"
          camera-orbit="0deg 75deg 1.5m"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          disable-zoom
          interaction-prompt="none"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        model-viewer {
          --poster-color: transparent;
        }
      `}</style>
    </div>
  );
}

// Welcome card with 3D avatar
export function RPMWelcomeCard({ name, avatarUrl }: { name?: string; avatarUrl?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "ready to plan something unforgettable?",
    "every great event starts with a great plan.",
    "let's make this event kool. ♥",
    "i built kool because i needed it.",
    "need a full team? the koolture group is one click away.",
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-sm p-5 flex items-center gap-5">
      {/* 3D Avatar */}
      <div className="w-20 h-20 shrink-0 relative rounded-full overflow-hidden ring-2 ring-kool-red ring-offset-2"
        style={{ animation: "float 4s ease-in-out infinite" }}>
        <model-viewer
          src={avatarUrl || DEFAULT_AVATAR_URL}
          alt="Paula"
          auto-rotate
          camera-orbit="0deg 75deg 1.2m"
          disable-zoom
          interaction-prompt="none"
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>
      </div>

      {/* Message */}
      <div className="flex-1">
        <p className="text-xs font-bold text-kool-red tracking-wide mb-1">
          paula mescolin · founder, the koolture group
        </p>
        <p
          className="text-sm text-gray-700 leading-relaxed cursor-pointer hover:text-kool-black transition-colors"
          onClick={() => setMsgIndex((i) => (i + 1) % messages.length)}
        >
          {name ? `hey ${name}! ` : ""}{messages[msgIndex]}
        </p>
        <p className="text-xs text-gray-300 mt-1">tap to read more ↻</p>
      </div>
    </div>
  );
}

// TypeScript declarations for model-viewer web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "camera-orbit"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "disable-zoom"?: boolean;
        "interaction-prompt"?: string;
        poster?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}
