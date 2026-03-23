"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, Circle, AlertTriangle, Clock } from "lucide-react";

interface TimelineItem {
  id: string;
  event_id: string;
  time_slot?: string;
  duration_minutes?: number;
  title: string;
  description?: string;
  location?: string;
  assigned_to?: string;
  is_completed?: boolean;
  sort_order?: number;
}

interface TimelinePanelProps {
  eventId: string;
}

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "pm" : "am";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${m} ${ampm}`;
}

function isLate(timeSlot?: string, isCompleted?: boolean): boolean {
  if (!timeSlot || isCompleted) return false;
  const now = new Date();
  const [h, m] = timeSlot.split(":");
  const itemTime = new Date();
  itemTime.setHours(parseInt(h), parseInt(m), 0, 0);
  return now > itemTime;
}

function getStatus(item: TimelineItem): "done" | "late" | "active" | "upcoming" {
  if (item.is_completed) return "done";
  if (!item.time_slot) return "upcoming";
  const now = new Date();
  const [h, m] = item.time_slot.split(":");
  const itemTime = new Date();
  itemTime.setHours(parseInt(h), parseInt(m), 0, 0);
  const diff = itemTime.getTime() - now.getTime();
  if (diff < 0) return "late";
  if (diff < 30 * 60 * 1000) return "active";
  return "upcoming";
}

export function TimelinePanel({ eventId }: TimelinePanelProps) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadItems();
    // Refresh every minute to update late status
    const interval = setInterval(loadItems, 60000);
    return () => clearInterval(interval);
  }, [eventId]);

  async function loadItems() {
    const { data } = await supabase
      .from("timeline_items")
      .select("*")
      .eq("event_id", eventId)
      .order("time_slot", { nullsFirst: false });
    setItems(data || []);
    setLoading(false);
  }

  async function toggleComplete(item: TimelineItem) {
    const newVal = !item.is_completed;
    await supabase
      .from("timeline_items")
      .update({ is_completed: newVal })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_completed: newVal } : i))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-[#D90000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 text-sm">no timeline items yet</p>
        <p className="text-white/25 text-xs mt-1">add items in the timeline section</p>
      </div>
    );
  }

  const lateCount = items.filter((i) => getStatus(i) === "late").length;

  return (
    <div className="space-y-2">
      {lateCount > 0 && (
        <div className="flex items-center gap-2 bg-[#D90000]/20 border border-[#D90000]/40 rounded-sm px-3 py-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-[#D90000] shrink-0" />
          <span className="text-[#D90000] text-xs font-bold">
            {lateCount} item{lateCount > 1 ? "s" : ""} running late
          </span>
        </div>
      )}

      <div className="space-y-1">
        {items.map((item) => {
          const status = getStatus(item);
          return (
            <button
              key={item.id}
              onClick={() => toggleComplete(item)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-sm border transition-all ${
                status === "done"
                  ? "bg-white/5 border-white/10 opacity-60"
                  : status === "late"
                  ? "bg-[#D90000]/10 border-[#D90000]/40 hover:bg-[#D90000]/20"
                  : status === "active"
                  ? "bg-white/10 border-white/30 hover:bg-white/15"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {status === "done" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : status === "late" ? (
                  <AlertTriangle className="w-5 h-5 text-[#D90000]" />
                ) : status === "active" ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/60 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-white/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${status === "done" ? "line-through text-white/40" : "text-white"}`}>
                    {item.title}
                  </span>
                  {item.time_slot && (
                    <span className={`text-xs shrink-0 font-mono ${
                      status === "late" ? "text-[#D90000] font-bold" :
                      status === "active" ? "text-white/80" : "text-white/40"
                    }`}>
                      {formatTime(item.time_slot)}
                    </span>
                  )}
                </div>
                {(item.location || item.assigned_to) && (
                  <div className="flex gap-3 mt-0.5">
                    {item.location && <span className="text-xs text-white/30">{item.location}</span>}
                    {item.assigned_to && <span className="text-xs text-white/30">👤 {item.assigned_to}</span>}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
