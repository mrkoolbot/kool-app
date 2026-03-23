"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { TimelinePanel } from "@/components/war-room/timeline-panel";
import { StaffPanel } from "@/components/war-room/staff-panel";
import { VendorPanel } from "@/components/war-room/vendor-panel";
import { IncidentLog, IncidentLogHandle } from "@/components/war-room/incident-log";

interface Event {
  id: string;
  name: string;
  event_date?: string;
  event_time?: string;
  location?: string;
  venue_name?: string;
  event_type: string;
}

type Panel = "timeline" | "staff" | "vendors" | "incidents";

function useCountdown(eventDate?: string, eventTime?: string) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    function calc() {
      if (!eventDate) { setCountdown(""); return; }
      const dateStr = eventTime ? `${eventDate}T${eventTime}` : `${eventDate}T00:00`;
      const target = new Date(dateStr);
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown("live now");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (h > 0) setCountdown(`${h}h ${m}m`);
      else if (m > 0) setCountdown(`${m}m ${s}s`);
      else setCountdown(`${s}s`);
    }
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [eventDate, eventTime]);

  return countdown;
}

export default function WarRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<Panel>("timeline");
  const [incidentCount, setIncidentCount] = useState(0);
  const incidentRef = useRef<IncidentLogHandle>(null);
  const router = useRouter();
  const supabase = createClient();
  const countdown = useCountdown(event?.event_date, event?.event_time);

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadEvent(id);
    });
  }, []);

  async function loadEvent(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();
    if (!data) { router.push("/dashboard"); return; }
    setEvent(data);
    setLoading(false);
  }

  function handleVendorIncident(note: string) {
    incidentRef.current?.addIncident(note);
    setActivePanel("incidents");
  }

  const panels: Array<{ id: Panel; label: string }> = [
    { id: "timeline", label: "timeline" },
    { id: "staff", label: "staff" },
    { id: "vendors", label: "vendors" },
    { id: "incidents", label: "incidents" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D90000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) return null;

  const isToday = event.event_date
    ? new Date(event.event_date).toDateString() === new Date().toDateString()
    : false;
  const isTomorrow = event.event_date
    ? (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return new Date(event.event_date).toDateString() === tomorrow.toDateString();
      })()
    : false;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/events/${eventId}`} className="text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-sm font-black text-white leading-tight truncate max-w-[180px]">
                {event.name}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {/* LIVE dot */}
                <span className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D90000] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D90000]" />
                  </span>
                  <span className="text-[#D90000] text-xs font-black tracking-widest">LIVE</span>
                </span>
                {isTomorrow && (
                  <span className="text-yellow-400 text-xs font-bold">PREP MODE</span>
                )}
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-right">
            {countdown && (
              <div className={`font-black text-lg leading-none ${
                countdown === "live now" ? "text-[#D90000]" : "text-white"
              }`}>
                {countdown}
              </div>
            )}
            {event.event_time && countdown !== "live now" && (
              <div className="text-white/30 text-xs mt-0.5">
                {new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Panel tabs */}
      <div className="flex border-b border-white/10 bg-[#0A0A0A] sticky top-[61px] z-40">
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={`flex-1 py-3 text-center transition-all ${
              activePanel === panel.id
                ? "text-[#D90000] border-b-2 border-[#D90000]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <div className="text-lg leading-none"></div>
            <div className="text-xs font-semibold mt-0.5">{panel.label}</div>
          </button>
        ))}
      </div>

      {/* Panel content */}
      <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
        {activePanel === "timeline" && eventId && (
          <TimelinePanel eventId={eventId} />
        )}
        {activePanel === "staff" && eventId && (
          <StaffPanel eventId={eventId} />
        )}
        {activePanel === "vendors" && eventId && (
          <VendorPanel eventId={eventId} onIncidentAdded={handleVendorIncident} />
        )}
        {activePanel === "incidents" && eventId && (
          <IncidentLog ref={incidentRef} eventId={eventId} />
        )}
      </main>

      {/* Footer glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D90000]/30 to-transparent" />
      <div className="text-center py-3">
        <span className="text-white/15 text-xs">kool war room</span>
      </div>
    </div>
  );
}
