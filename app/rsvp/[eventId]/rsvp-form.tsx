"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RSVPForm({ eventId }: { eventId: string }) {
  const supabase = createClient();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    rsvp_status: "attending" as "attending" | "declined" | "maybe",
    plus_one: false,
    dietary_restrictions: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.from("guests").insert({
      event_id: eventId,
      ...form,
      responded_at: new Date().toISOString(),
    });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">
          {form.rsvp_status === "attending" ? "🎉" : form.rsvp_status === "maybe" ? "🤔" : "😢"}
        </div>
        <h2 className="text-2xl font-black mb-3">
          {form.rsvp_status === "attending" ? "you're in!" : form.rsvp_status === "maybe" ? "we'll keep you posted!" : "we'll miss you!"}
        </h2>
        <p className="text-gray-500">
          {form.rsvp_status === "attending"
            ? `thanks ${form.first_name}! we can't wait to celebrate with you.`
            : form.rsvp_status === "maybe"
            ? `thanks ${form.first_name}! we hope you can make it.`
            : `thanks for letting us know, ${form.first_name}. we'll miss you!`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">first name *</label>
          <input
            required
            value={form.first_name}
            onChange={e => setForm({...form, first_name: e.target.value})}
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">last name</label>
          <input
            value={form.last_name}
            onChange={e => setForm({...form, last_name: e.target.value})}
            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">will you be attending? *</label>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: "attending", label: "yes, i'll be there! 🎉" },
            { value: "maybe", label: "maybe 🤔" },
            { value: "declined", label: "can't make it 😢" },
          ] as const).map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({...form, rsvp_status: opt.value})}
              className={`py-3 px-4 rounded-sm text-sm font-semibold border-2 transition-colors text-center leading-tight ${
                form.rsvp_status === opt.value
                  ? "border-kool-red bg-kool-red text-white"
                  : "border-gray-200 text-gray-600 hover:border-kool-red"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">dietary restrictions / allergies</label>
        <input
          value={form.dietary_restrictions}
          onChange={e => setForm({...form, dietary_restrictions: e.target.value})}
          placeholder="e.g. vegetarian, gluten-free, nut allergy"
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">message for the host (optional)</label>
        <textarea
          value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
          rows={3}
          placeholder="looking forward to celebrating with you!"
          className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors resize-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.plus_one}
          onChange={e => setForm({...form, plus_one: e.target.checked})}
          className="w-4 h-4 accent-kool-red"
        />
        <span className="text-sm">i will bring a plus one</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-kool-red text-white py-4 rounded-sm font-bold text-lg hover:bg-kool-crimson transition-colors disabled:opacity-50"
      >
        {loading ? "submitting..." : "submit rsvp →"}
      </button>
    </form>
  );
}
