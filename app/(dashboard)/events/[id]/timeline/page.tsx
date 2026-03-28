"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Clock } from "lucide-react";
import type { TimelineItem } from "@/types";
import { getTemplateForEventType } from "@/lib/timeline-templates";

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const [form, setForm] = useState({
    time_slot: "", duration_minutes: "", title: "", description: "", location: "", assigned_to: "",
  });

  const [event, setEvent] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => { params.then(({ id }) => { setEventId(id); loadItems(id); loadEvent(id); }); }, []);

  async function loadEvent(id: string) {
    const { data } = await supabase.from("events").select("*").eq("id", id).single();
    setEvent(data);
  }

  async function generateTimeline() {
    if (!event) return;
    setGenerating(true);
    const templateResult = getTemplateForEventType(event.event_type);
    const template = templateResult || [];
    const eventDate = new Date(event.event_date);
    const itemsToInsert = template.map((item: any, i: number) => {
      let timeSlot = "";
      if (item.offsetType === "months" && item.offsetValue) {
        const d = new Date(eventDate);
        d.setMonth(d.getMonth() - item.offsetValue);
        timeSlot = d.toISOString().split("T")[0];
      } else if (item.offsetType === "weeks" && item.offsetValue) {
        const d = new Date(eventDate);
        d.setDate(d.getDate() - (item.offsetValue * 7));
        timeSlot = d.toISOString().split("T")[0];
      } else if (item.offsetType === "days" && item.offsetValue) {
        const d = new Date(eventDate);
        d.setDate(d.getDate() - item.offsetValue);
        timeSlot = d.toISOString().split("T")[0];
      } else if (item.offsetType === "day-of" && item.dayOfHour !== undefined) {
        const h = String(item.dayOfHour).padStart(2, "0");
        const m = String(item.dayOfMinute || 0).padStart(2, "0");
        timeSlot = `${h}:${m}`;
      }
      return {
        event_id: eventId,
        title: item.title,
        description: item.protocolNote ? `${item.description} — ${item.protocolNote}` : item.description,
        time_slot: timeSlot || null,
        duration_minutes: item.durationMinutes || null,
        sort_order: i,
      };
    });
    await supabase.from("timeline_items").insert(itemsToInsert);
    await loadItems(eventId);
    setGenerating(false);
  }

  async function loadItems(id: string) {
    const { data } = await supabase.from("timeline_items").select("*").eq("event_id", id).order("time_slot");
    setItems(data || []);
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from("timeline_items").insert({
      event_id: eventId,
      time_slot: form.time_slot || null,
      duration_minutes: form.duration_minutes ? parseInt(form.duration_minutes) : null,
      title: form.title,
      description: form.description || null,
      location: form.location || null,
      assigned_to: form.assigned_to || null,
      sort_order: items.length,
    }).select().single();
    if (data) setItems((prev) => [...prev, data].sort((a, b) => (a.time_slot || "").localeCompare(b.time_slot || "")));
    setForm({ time_slot: "", duration_minutes: "", title: "", description: "", location: "", assigned_to: "" });
    setShowForm(false);
  }

  async function deleteItem(id: string) {
    await supabase.from("timeline_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function formatTime(time: string) {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "pm" : "am";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${m} ${ampm}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">run of show</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black">run of show.</h1>
            <p className="text-gray-500 text-sm mt-1">your day-of timeline</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson">
            <Plus className="w-4 h-4" /> add moment
          </button>
        </div>

        {items.length === 0 && !showForm && (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-sm">
            <Clock className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-700 mb-2">no timeline yet</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
              generate a smart timeline based on your event type and date — built from professional planning protocols.
            </p>
            {event?.event_type && (
              <button
                onClick={generateTimeline}
                disabled={generating}
                className="bg-kool-red text-white text-sm px-6 py-3 rounded-sm hover:bg-kool-crimson disabled:opacity-50 mb-3 block mx-auto"
              >
                {generating ? "generating..." : `generate ${event.event_type.replace(/_/g, " ")} timeline`}
              </button>
            )}
            <button onClick={() => setShowForm(true)} className="text-sm text-gray-400 hover:text-kool-black underline">
              or add items manually
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white border border-kool-red rounded-sm p-5 mb-6">
            <form onSubmit={addItem} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-500">time</label>
                  <input type="time" value={form.time_slot} onChange={(e) => setForm(p => ({ ...p, time_slot: e.target.value }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-500">duration (min)</label>
                  <input type="number" value={form.duration_minutes} onChange={(e) => setForm(p => ({ ...p, duration_minutes: e.target.value }))}
                    placeholder="e.g. 30" className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                </div>
              </div>
              <input required value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="what's happening" className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
                  placeholder="location" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                <input value={form.assigned_to} onChange={(e) => setForm(p => ({ ...p, assigned_to: e.target.value }))}
                  placeholder="assigned to" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="notes or details..." rows={2}
                className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red resize-none" />
              <div className="flex gap-3">
                <button type="submit" className="bg-kool-red text-white px-5 py-2 rounded-sm font-semibold text-sm hover:bg-kool-crimson">add</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 px-5 py-2 rounded-sm text-sm">cancel</button>
              </div>
            </form>
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
            <Clock className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="font-bold mb-2">no timeline yet.</p>
            <p className="text-gray-400 text-sm mb-6">build your minute-by-minute day-of schedule.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-0">
              {items.map((item, idx) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-[52px] shrink-0 text-right">
                    {item.time_slot && (
                      <span className="text-xs font-bold text-kool-red">{formatTime(item.time_slot)}</span>
                    )}
                  </div>
                  <div className="relative pb-6">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-kool-red border-2 border-white" />
                    <div className="bg-white border border-gray-100 rounded-sm p-4 ml-4 hover:border-kool-red transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-sm">{item.title}</div>
                          {item.duration_minutes && (
                            <div className="text-xs text-gray-400 mt-0.5">{item.duration_minutes} min</div>
                          )}
                          {item.description && <div className="text-xs text-gray-500 mt-1">{item.description}</div>}
                          <div className="flex gap-3 mt-2">
                            {item.location && <span className="text-xs text-gray-400">{item.location}</span>}
                            {item.assigned_to && <span className="text-xs text-gray-400">👤 {item.assigned_to}</span>}
                          </div>
                        </div>
                        <button onClick={() => deleteItem(item.id)}
                          className="text-gray-200 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs ml-2">✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
