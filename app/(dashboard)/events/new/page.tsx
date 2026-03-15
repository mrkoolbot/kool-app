"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { EVENT_TYPES } from "@/lib/utils";
import { getChecklistForEventType } from "@/lib/checklist-templates";
import { ArrowLeft } from "lucide-react";

export default function NewEventPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    event_type: "",
    event_date: "",
    event_time: "",
    venue_name: "",
    location: "",
    guest_count_estimate: "",
    budget_total: "",
    description: "",
    theme: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: event, error: eventError } = await supabase
      .from("events")
      .insert({
        user_id: user.id,
        name: form.name,
        event_type: form.event_type,
        event_date: form.event_date || null,
        event_time: form.event_time || null,
        venue_name: form.venue_name || null,
        location: form.location || null,
        guest_count_estimate: form.guest_count_estimate ? parseInt(form.guest_count_estimate) : null,
        budget_total: form.budget_total ? parseFloat(form.budget_total) : 0,
        description: form.description || null,
        theme: form.theme || null,
      })
      .select()
      .single();

    if (eventError || !event) {
      setError(eventError?.message || "something went wrong");
      setLoading(false);
      return;
    }

    // Auto-generate checklist
    const templates = getChecklistForEventType(form.event_type);
    if (templates.length > 0 && form.event_date) {
      const eventDate = new Date(form.event_date);
      const checklistItems = templates.map((item, i) => {
        let dueDate = null;
        if (item.weeksBeforeEvent !== undefined) {
          const due = new Date(eventDate);
          due.setDate(due.getDate() - (item.weeksBeforeEvent * 7));
          dueDate = due.toISOString().split("T")[0];
        }
        return {
          event_id: event.id,
          category: item.category,
          title: item.title,
          description: item.description || null,
          priority: item.priority,
          due_date: dueDate,
          sort_order: i,
        };
      });
      await supabase.from("checklist_items").insert(checklistItems);
    }

    router.push(`/events/${event.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Link href="/" className="text-xl font-black tracking-tight text-kool-black">
          kool<span className="text-kool-red">.</span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black mb-2 tracking-tight">create your event.</h1>
        <p className="text-gray-500 mb-10">fill in the details and we&apos;ll build your personalized planning dashboard.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event name */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">event name *</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="e.g. sarah's 40th birthday, the rodriguez wedding"
            />
          </div>

          {/* Event type */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">event type *</label>
            <select
              name="event_type" value={form.event_type} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors bg-white"
            >
              <option value="">select event type</option>
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Date and time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">event date</label>
              <input
                type="date" name="event_date" value={form.event_date} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">event time</label>
              <input
                type="time" name="event_time" value={form.event_time} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">venue name</label>
            <input
              name="venue_name" value={form.venue_name} onChange={handleChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="e.g. the breakers palm beach"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">location / address</label>
            <input
              name="location" value={form.location} onChange={handleChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="city, state or full address"
            />
          </div>

          {/* Guest count and budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">estimated guest count</label>
              <input
                type="number" name="guest_count_estimate" value={form.guest_count_estimate} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
                placeholder="e.g. 80"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">total budget ($)</label>
              <input
                type="number" name="budget_total" value={form.budget_total} onChange={handleChange}
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
                placeholder="e.g. 15000"
              />
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">theme or vibe <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              name="theme" value={form.theme} onChange={handleChange}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="e.g. tropical elegance, black tie modern, garden party"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">notes or description <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors resize-none"
              placeholder="anything else you want to note about this event..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit" disabled={loading}
              className="w-full bg-kool-red text-white py-4 rounded-sm font-bold text-lg hover:bg-kool-crimson transition-colors disabled:opacity-50"
            >
              {loading ? "creating your event..." : "create event + generate checklist →"}
            </button>
            <p className="text-center text-gray-400 text-xs mt-3">
              we&apos;ll automatically generate a smart checklist based on your event type and date.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
