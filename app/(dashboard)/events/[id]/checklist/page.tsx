"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, CheckSquare, Square } from "lucide-react";
import type { ChecklistItem } from "@/types";

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  venue: { label: "venue & logistics", emoji: "📍" },
  catering: { label: "catering & food", emoji: "🍽️" },
  entertainment: { label: "entertainment", emoji: "🎵" },
  decor: { label: "decor & florals", emoji: "💐" },
  photography: { label: "photography & video", emoji: "📸" },
  invitations: { label: "invitations & comms", emoji: "💌" },
  transportation: { label: "transportation", emoji: "🚗" },
  attire: { label: "attire & beauty", emoji: "💄" },
  day_of: { label: "day-of coordination", emoji: "⏰" },
  personal_touches: { label: "personal touches", emoji: "💝" },
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-yellow-50 text-yellow-600",
  low: "bg-gray-100 text-gray-500",
};

export default function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [filter, setFilter] = useState<"all" | "incomplete" | "complete">("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const [newItem, setNewItem] = useState({ title: "", category: "venue", priority: "medium" as "high" | "medium" | "low", due_date: "" });

  useEffect(() => {
    params.then(({ id }) => { setEventId(id); loadItems(id); });
  }, []);

  async function loadItems(id: string) {
    const { data } = await supabase.from("checklist_items").select("*").eq("event_id", id).order("sort_order");
    setItems(data || []);
    setLoading(false);
  }

  async function toggleItem(item: ChecklistItem) {
    const updated = { ...item, is_completed: !item.is_completed };
    await supabase.from("checklist_items").update({ is_completed: updated.is_completed }).eq("id", item.id);
    setItems((prev) => prev.map((i) => i.id === item.id ? updated : i));
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from("checklist_items").insert({
      event_id: eventId, ...newItem, due_date: newItem.due_date || null, sort_order: items.length,
    }).select().single();
    if (data) setItems((prev) => [...prev, data]);
    setNewItem({ title: "", category: "venue", priority: "medium", due_date: "" });
    setShowAddForm(false);
  }

  const filteredItems = items.filter((item) => {
    if (filter === "complete") return item.is_completed;
    if (filter === "incomplete") return !item.is_completed;
    return true;
  });

  const groupedItems: Record<string, ChecklistItem[]> = {};
  filteredItems.forEach((item) => {
    if (!groupedItems[item.category]) groupedItems[item.category] = [];
    groupedItems[item.category].push(item);
  });

  const completed = items.filter((i) => i.is_completed).length;
  const pct = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">checklist</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black tracking-tight">event checklist.</h1>
          <button onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors">
            <Plus className="w-4 h-4" /> add task
          </button>
        </div>

        {/* Progress */}
        <div className="bg-white border border-gray-100 rounded-sm p-5 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">{completed} of {items.length} tasks complete</span>
            <span className="font-black text-kool-red text-lg">{pct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-kool-red rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6">
          {(["all", "incomplete", "complete"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${filter === f ? "bg-kool-black text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-kool-black"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Add item form */}
        {showAddForm && (
          <div className="bg-white border border-kool-red rounded-sm p-5 mb-6">
            <form onSubmit={addItem} className="space-y-3">
              <input required value={newItem.title} onChange={(e) => setNewItem(p => ({ ...p, title: e.target.value }))}
                placeholder="task title..."
                className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              <div className="grid grid-cols-3 gap-3">
                <select value={newItem.category} onChange={(e) => setNewItem(p => ({ ...p, category: e.target.value }))}
                  className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white">
                  {Object.entries(CATEGORY_LABELS).map(([val, { label }]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <select value={newItem.priority} onChange={(e) => setNewItem(p => ({ ...p, priority: e.target.value as "high" | "medium" | "low" }))}
                  className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white">
                  <option value="high">high priority</option>
                  <option value="medium">medium priority</option>
                  <option value="low">low priority</option>
                </select>
                <input type="date" value={newItem.due_date} onChange={(e) => setNewItem(p => ({ ...p, due_date: e.target.value }))}
                  className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-kool-red text-white px-5 py-2 rounded-sm font-semibold text-sm hover:bg-kool-crimson transition-colors">add</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="border border-gray-200 px-5 py-2 rounded-sm text-sm">cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-400">loading checklist...</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, catItems]) => {
              const meta = CATEGORY_LABELS[category] || { label: category, emoji: "📌" };
              const catCompleted = catItems.filter((i) => i.is_completed).length;
              return (
                <div key={category} className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <span>{meta.emoji}</span>
                      <span>{meta.label}</span>
                    </div>
                    <span className="text-xs text-gray-400">{catCompleted}/{catItems.length}</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {catItems.map((item) => (
                      <div key={item.id} className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50/50 transition-colors ${item.is_completed ? "opacity-50" : ""}`}>
                        <button onClick={() => toggleItem(item)} className="mt-0.5 shrink-0 text-gray-300 hover:text-kool-red transition-colors">
                          {item.is_completed
                            ? <CheckSquare className="w-5 h-5 text-kool-red" />
                            : <Square className="w-5 h-5" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${item.is_completed ? "line-through" : ""}`}>{item.title}</p>
                          {item.due_date && (
                            <p className="text-xs text-gray-400 mt-0.5">due {new Date(item.due_date).toLocaleDateString()}</p>
                          )}
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm shrink-0 ${PRIORITY_COLORS[item.priority]}`}>
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
