"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RSVPForm({ eventId }: { eventId: string }) {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    rsvp_status: "attending" as "attending" | "declined" | "maybe",
    dietary_restrictions: "", plus_one: false, notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("guests").insert({
      event_id: eventId,
      first_name: form.first_name,
      last_name: form.last_name || null,
      email: form.email || null,
      rsvp_status: form.rsvp_status,
      dietary_restrictions: form.dietary_restrictions || null,
      plus_one: form.plus_one,
      notes: form.notes || null,
      responded_at: new Date().toISOString(),
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{"✓"}</div>
        <h3 className="text-xl font-black mb-2">
          {form.rsvp_status === "attending" ? "you're in!" : form.rsvp_status === "maybe" ? "got it." : "we'll miss you."}
        </h3>
        <p className="text-gray-500 text-sm">
          {form.rsvp_status === "attending"
            ? "we can't wait to celebrate with you."
            : form.rsvp_status === "maybe"
            ? "thanks for letting us know. we hope you can make it!"
            : "thanks for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">{error}</div>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-600">first name *</label>
          <input required value={form.first_name} onChange={(e) => setForm(p => ({ ...p, first_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-600">last name</label>
          <input value={form.last_name} onChange={(e) => setForm(p => ({ ...p, last_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-600">email</label>
        <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
          className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
      </div>

      {/* RSVP choice */}
      <div>
        <label className="block text-xs font-semibold mb-3 text-gray-600">will you attend? *</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "attending", label: "yes, i'll be there" },
            { value: "maybe", label: "maybe 🤔" },
            { value: "declined", label: "can't make it 😢" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm(p => ({ ...p, rsvp_status: opt.value as "attending" | "declined" | "maybe" }))}
              className={`px-3 py-3 rounded-sm text-xs font-semibold text-center transition-colors border ${
                form.rsvp_status === opt.value
                  ? "bg-kool-red text-white border-kool-red"
                  : "border-gray-200 text-gray-600 hover:border-kool-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {form.rsvp_status === "attending" && (
        <>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-600">dietary restrictions</label>
            <input value={form.dietary_restrictions} onChange={(e) => setForm(p => ({ ...p, dietary_restrictions: e.target.value }))}
              placeholder="e.g. vegetarian, gluten-free, nut allergy"
              className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="plus" checked={form.plus_one} onChange={(e) => setForm(p => ({ ...p, plus_one: e.target.checked }))} />
            <label htmlFor="plus" className="text-sm text-gray-600">i'll be bringing a +1</label>
          </div>
        </>
      )}

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-600">message <span className="font-normal text-gray-400">(optional)</span></label>
        <textarea value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} rows={2}
          placeholder="leave a message for the host..."
          className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red resize-none" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-kool-red text-white py-3.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50">
        {loading ? "sending..." : "submit rsvp"}
      </button>
    </form>
  );
}
