"use client";
import { KoolLogo } from "@/components/kool-logo";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, CheckSquare, Square, ChevronDown, ChevronUp, X } from "lucide-react";
import type { ChecklistItem } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  venue: "Venue & Logistics",
  catering: "Catering",
  entertainment: "Entertainment",
  decor: "Decor",
  photography: "Photography & Video",
  invitations: "Invitations & Communications",
  transportation: "Transportation",
  attire: "Attire & Beauty",
  day_of: "Day-of Coordination",
  personal_touches: "Personal Touches",
  security: "Security",
  audio_visual: "Audio/Visual Dry-Run",
  presentations: "Presentations",
  vendors: "Vendors",
  scenery: "Scenery",
  guest_list: "Guest List",
  rsvp: "RSVP",
  welcome_registration: "Welcome & Registration",
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-yellow-50 text-yellow-600",
  low: "bg-gray-100 text-gray-500",
};

const CATEGORY_ORDER = [
  "security",
  "venue",
  "guest_list",
  "rsvp",
  "invitations",
  "vendors",
  "catering",
  "audio_visual",
  "presentations",
  "entertainment",
  "photography",
  "transportation",
  "scenery",
  "decor",
  "attire",
  "welcome_registration",
  "day_of",
  "personal_touches",
];

export default function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [filter, setFilter] = useState<"all" | "incomplete" | "complete">("all");
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [addingItemTo, setAddingItemTo] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const addItemInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadItems(id);
    });
  }, []);

  useEffect(() => {
    if (addingItemTo && addItemInputRef.current) {
      addItemInputRef.current.focus();
    }
  }, [addingItemTo]);

  async function loadItems(id: string) {
    const { data } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("event_id", id)
      .order("sort_order");
    setItems(data || []);
    setLoading(false);
  }

  async function toggleItem(item: ChecklistItem) {
    const updated = { ...item, is_completed: !item.is_completed };
    await supabase
      .from("checklist_items")
      .update({ is_completed: updated.is_completed })
      .eq("id", item.id);
    setItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
  }

  async function addQuickItem(category: string) {
    if (!newItemTitle.trim()) return;
    const { data } = await supabase
      .from("checklist_items")
      .insert({
        event_id: eventId,
        title: newItemTitle.trim(),
        category,
        priority: "medium",
        sort_order: items.filter((i) => i.category === category).length,
      })
      .select()
      .single();
    if (data) setItems((prev) => [...prev, data]);
    setNewItemTitle("");
    setAddingItemTo(null);
  }

  async function addCustomTopic() {
    const name = newTopicName.trim();
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    if (!CATEGORY_LABELS[key] && !customCategories.includes(key)) {
      setCustomCategories((prev) => [...prev, key]);
      // Register the label so it shows in the list
      CATEGORY_LABELS[key] = name;
    }
    setNewTopicName("");
    setShowAddTopic(false);
    setAddingItemTo(key);
  }

  const filteredItems = items.filter((item) => {
    if (filter === "complete") return item.is_completed;
    if (filter === "incomplete") return !item.is_completed;
    return true;
  });

  // Build ordered category list
  const presentCategories = Array.from(new Set(items.map((i) => i.category)));
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => presentCategories.includes(c)),
    ...presentCategories.filter((c) => !CATEGORY_ORDER.includes(c)),
    ...customCategories.filter((c) => !presentCategories.includes(c)),
  ];

  const groupedItems: Record<string, ChecklistItem[]> = {};
  filteredItems.forEach((item) => {
    if (!groupedItems[item.category]) groupedItems[item.category] = [];
    groupedItems[item.category].push(item);
  });

  // Also show categories with no items if they're custom or being added to
  orderedCategories.forEach((cat) => {
    if (!groupedItems[cat]) groupedItems[cat] = [];
  });

  const completed = items.filter((i) => i.is_completed).length;
  const pct = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  function toggleCollapse(cat: string) {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

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
          <button
            onClick={() => setShowAddTopic(true)}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Topic
          </button>
        </div>

        {/* Add Topic Form */}
        {showAddTopic && (
          <div className="bg-white border border-kool-red rounded-sm p-4 mb-6 flex gap-3">
            <input
              autoFocus
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustomTopic();
                if (e.key === "Escape") { setShowAddTopic(false); setNewTopicName(""); }
              }}
              placeholder="New topic name..."
              className="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
            />
            <button
              onClick={addCustomTopic}
              className="bg-kool-red text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-kool-crimson transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => { setShowAddTopic(false); setNewTopicName(""); }}
              className="border border-gray-200 px-3 py-2 rounded-sm text-sm text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="bg-white border border-gray-100 rounded-sm p-5 mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">{completed} of {items.length} tasks complete</span>
            <span className="font-black text-kool-red text-lg">{pct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-kool-red rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6">
          {(["all", "incomplete", "complete"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-sm text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-kool-black text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-kool-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">loading checklist...</div>
        ) : (
          <div className="space-y-4">
            {orderedCategories
              .filter((cat) => groupedItems[cat] !== undefined)
              .map((category) => {
                const catItems = groupedItems[category] || [];
                const label = CATEGORY_LABELS[category] || category.replace(/_/g, " ");
                const catCompleted = catItems.filter((i) => i.is_completed).length;
                const isCollapsed = collapsedCategories[category];
                const isAddingHere = addingItemTo === category;

                return (
                  <div key={category} className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                    {/* Category header */}
                    <div
                      className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleCollapse(category)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-700">{label}</span>
                        {catItems.length > 0 && (
                          <span className="text-xs text-gray-400">
                            {catCompleted}/{catItems.length}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isCollapsed
                          ? <ChevronDown className="w-4 h-4 text-gray-400" />
                          : <ChevronUp className="w-4 h-4 text-gray-400" />
                        }
                      </div>
                    </div>

                    {/* Items */}
                    {!isCollapsed && (
                      <>
                        {catItems.length > 0 && (
                          <div className="divide-y divide-gray-50">
                            {catItems.map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-start gap-3 px-5 py-4 hover:bg-gray-50/50 transition-colors ${
                                  item.is_completed ? "opacity-50" : ""
                                }`}
                              >
                                <button
                                  onClick={() => toggleItem(item)}
                                  className="mt-0.5 shrink-0 text-gray-300 hover:text-kool-red transition-colors"
                                >
                                  {item.is_completed ? (
                                    <CheckSquare className="w-5 h-5 text-kool-red" />
                                  ) : (
                                    <Square className="w-5 h-5" />
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${item.is_completed ? "line-through" : ""}`}>
                                    {item.title}
                                  </p>
                                  {item.due_date && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                      due {new Date(item.due_date).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                                <span
                                  className={`text-xs font-semibold px-2 py-0.5 rounded-sm shrink-0 ${
                                    PRIORITY_COLORS[item.priority]
                                  }`}
                                >
                                  {item.priority}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add item inline */}
                        <div className="px-5 py-3 border-t border-gray-50">
                          {isAddingHere ? (
                            <div className="flex gap-2">
                              <input
                                ref={addItemInputRef}
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") addQuickItem(category);
                                  if (e.key === "Escape") {
                                    setAddingItemTo(null);
                                    setNewItemTitle("");
                                  }
                                }}
                                placeholder="Item title..."
                                className="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
                              />
                              <button
                                onClick={() => addQuickItem(category)}
                                className="bg-kool-red text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-kool-crimson transition-colors"
                              >
                                Add
                              </button>
                              <button
                                onClick={() => {
                                  setAddingItemTo(null);
                                  setNewItemTitle("");
                                }}
                                className="border border-gray-200 px-3 py-2 rounded-sm text-sm text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAddingItemTo(category);
                                setNewItemTitle("");
                              }}
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-kool-red transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Item
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
}
