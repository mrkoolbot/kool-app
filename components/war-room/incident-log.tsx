"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { createClient } from "@/lib/supabase/client";
import { AlertTriangle, Plus, X } from "lucide-react";

interface Incident {
  id: string;
  event_id: string;
  note: string;
  created_at: string;
}

interface IncidentLogProps {
  eventId: string;
}

export interface IncidentLogHandle {
  addIncident: (note: string) => void;
}

export const IncidentLog = forwardRef<IncidentLogHandle, IncidentLogProps>(
  function IncidentLog({ eventId }, ref) {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [note, setNote] = useState("");
    const supabase = createClient();

    useImperativeHandle(ref, () => ({
      addIncident: (text: string) => createIncident(text),
    }));

    useEffect(() => {
      loadIncidents();
      // Subscribe to realtime
      const channel = supabase
        .channel(`war_room_incidents:${eventId}`)
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "war_room_incidents",
          filter: `event_id=eq.${eventId}`,
        }, (payload) => {
          setIncidents((prev) => [payload.new as Incident, ...prev]);
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }, [eventId]);

    async function loadIncidents() {
      const { data } = await supabase
        .from("war_room_incidents")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: false });
      setIncidents(data || []);
      setLoading(false);
    }

    async function createIncident(text: string) {
      if (!text.trim()) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("war_room_incidents")
        .insert({
          event_id: eventId,
          user_id: user.id,
          note: text.trim(),
        })
        .select()
        .single();
      if (data) setIncidents((prev) => [data, ...prev]);
    }

    async function submitNote(e: React.FormEvent) {
      e.preventDefault();
      await createIncident(note);
      setNote("");
      setShowInput(false);
    }

    async function deleteIncident(id: string) {
      await supabase.from("war_room_incidents").delete().eq("id", id);
      setIncidents((prev) => prev.filter((i) => i.id !== id));
    }

    function formatTime(ts: string) {
      return new Date(ts).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="w-5 h-5 border-2 border-[#D90000] border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40">
            {incidents.length} incident{incidents.length !== 1 ? "s" : ""} logged
          </span>
          <button
            onClick={() => setShowInput(!showInput)}
            className="flex items-center gap-1.5 text-xs text-[#D90000] hover:text-[#ff2200] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            add note
          </button>
        </div>

        {showInput && (
          <form onSubmit={submitNote} className="flex gap-2">
            <input
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="describe the incident..."
              className="flex-1 bg-white/10 border border-[#D90000]/40 rounded-sm px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D90000]"
            />
            <button
              type="submit"
              disabled={!note.trim()}
              className="bg-[#D90000] text-white text-sm px-4 py-2 rounded-sm font-semibold disabled:opacity-40 hover:bg-[#b00000] transition-colors"
            >
              log
            </button>
          </form>
        )}

        {incidents.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-8 h-8 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">no incidents logged</p>
            <p className="text-white/25 text-xs mt-1">tap + add note to log an issue</p>
          </div>
        ) : (
          <div className="space-y-2">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className={`flex items-start gap-3 p-3 rounded-sm border ${
                  incident.note.startsWith("🚨")
                    ? "bg-[#D90000]/10 border-[#D90000]/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white leading-relaxed">{incident.note}</p>
                  <p className="text-xs text-white/30 mt-1">{formatTime(incident.created_at)}</p>
                </div>
                <button
                  onClick={() => deleteIncident(incident.id)}
                  className="text-white/20 hover:text-white/50 transition-colors shrink-0 mt-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
