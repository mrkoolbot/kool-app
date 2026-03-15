"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckSquare, Square, Plus, ArrowLeft } from "lucide-react";
import type { ChecklistItem, Event } from "@/types";

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  venue: { label: "venue & logistics", emoji: "📍" },
  catering: { label: "catering & food", emoji: "🍽️" },
  entertainment: { label: "entertainment & music", emoji: "🎵" },
  decor: { label: "decor & florals", emoji: "💐" },
  photography: { label: "photography & video", emoji: "📸" },
  invitations: { label: "invitations & rsvp", emoji: "💌" },
  transportation: { label: "transportation", emoji: "🚗" },
  attire: { label: "attire & beauty", emoji: "💄" },
  day_of: { label: "day-of coordination", emoji: "⏰" },
  personal_touches: { label: "personal touches", emoji: "💝" },
};

export default function ChecklistPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [event, setEvent] = useState<Event | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("venue");
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: ev } = await supabase.from("events").select("*").eq("id", id).eq("user_id", user.id).single();
      if (!ev) { router.push("/dashboard"); return; }
      setEvent(ev as Event);
      const { data: cl } = await supabase.from("checklist_items").select("*").eq("event_id", id).order("sort_order");
      setItems((cl || []) as ChecklistItem[]);
      setLoading(false);
    }
    load();
  }, [id]);

  async function toggleItem(item: ChecklistItem) {
    const newVal = !item.is_completed;
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_completed: newVal } : i));
    await supabase.from("checklist_items").update({ is_completed: newVal }).eq("id", item.id);
  }

  async function addItem() {
    if (!newItemTitle.trim() || !id) return;
    setAddingItem(true);
    const { data: newItem } = await supabase.from("checklist_items").insert({
      event_id: id,
      category: newItemCategory,
      title: newItemTitle.trim(),
      priority: "medium",
      is_completed: false,
      sort_order: items.length,
    }).select().single();
    if (newItem) {
      setItems(prev => [...prev, newItem as ChecklistItem]);
      setNewItemTitle("");
    }
    setAddingItem(false);
  }

  const groupedItems: Record<string, ChecklistItem[]> = {};
  items.forEach(item => {
    if (!groupedItems[item.category]) groupedItems[item.category] = [];
    groupedItems[item.category].push(item);
  });

  const completed = items.filter(i => i.is_completed).length;
  const pct = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-xl font-black tracking-tight text-kool-black">kool<span className="text-kool-red">.</span></Link>
        <span className="text-gray-300">/</span>
        <Link href={`/events/${id}`} className="text-gray-500 text-sm hover:text-kool-black">{event?.name}</Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500 text-sm">checklist</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link href={`/events/${id}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-kool-black mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> back to event
        </Link>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-black tracking-tight">checklist.</h1>
          <span className="text-kool-red font-black text-2xl">{pct}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="bg-kool-red h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-gray-400 text-sm mb-10">{completed} of {items.length} tasks complete</p>

        {/* Add item */}
        <div className="bg-white border border-gray-100 rounded-sm p-4 mb-8 flex gap-3">
          <select
            value={newItemCategory}
            onChange={e => setNewItemCategory(e.target.value)}
            className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
          >
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v.emoji} {v.label}</option>
            ))}
          </select>
          <input
            value={newItemTitle}
            onChange={e => setNewItemTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addItem()}
            placeholder="add a task..."
            className="flex-1 border border-gray-200 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-kool-red"
          />
          <button
            onClick={addItem}
            disabled={addingItem || !newItemTitle.trim()}
            className="bg-kool-red text-white px-4 py-2 rounded-sm text-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50 inline-flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> add
          </button>
        </div>

        {/* Grouped items */}
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, categoryItems]) => {
            const meta = CATEGORY_LABELS[category] || { label: category, emoji: "📋" };
            const catCompleted = categoryItems.filter(i => i.is_completed).length;
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{meta.emoji}</span>
                  <h2 className="font-bold text-sm uppercase tracking-wide text-gray-600">{meta.label}</h2>
                  <span className="text-xs text-gray-400 ml-auto">{catCompleted}/{categoryItems.length}</span>
                </div>
                <div className="space-y-2">
                  {categoryItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`w-full text-left bg-white border rounded-sm px-5 py-4 flex items-start gap-4 hover:border-kool-red transition-colors ${
                        item.is_completed ? "border-gray-100 opacity-60" : "border-gray-100"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.is_completed
                          ? <CheckSquare className="w-5 h-5 text-kool-red" />
                          : <Square className="w-5 h-5 text-gray-300" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-medium ${item.is_completed ? "line-through text-gray-400" : ""}`}>
                          {item.title}
                        </span>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-sm ${
                        item.priority === "high" ? "bg-red-50 text-kool-red" :
                        item.priority === "medium" ? "bg-yellow-50 text-yellow-700" :
                        "bg-gray-50 text-gray-500"
                      }`}>
                        {item.priority}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
