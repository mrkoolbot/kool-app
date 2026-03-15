"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Upload, Copy, Check, Users } from "lucide-react";
import type { Guest } from "@/types";

const RSVP_COLORS: Record<string, string> = {
  attending: "bg-green-50 text-green-700",
  declined: "bg-red-50 text-red-700",
  maybe: "bg-yellow-50 text-yellow-700",
  pending: "bg-gray-100 text-gray-500",
};

export default function GuestsPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [plan, setPlan] = useState("free");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", dietary_restrictions: "", plus_one: false,
  });

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
  }, []);

  async function loadData(id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    setPlan(profile?.plan || "free");
    const { data } = await supabase.from("guests").select("*").eq("event_id", id).order("last_name");
    setGuests(data || []);
    setLoading(false);
  }

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    if (plan === "free" && guests.length >= 25) {
      alert("free plan is limited to 25 guests. upgrade to premium for unlimited guests.");
      return;
    }
    const { data } = await supabase.from("guests").insert({ ...form, event_id: eventId }).select().single();
    if (data) setGuests((prev) => [...prev, data]);
    setForm({ first_name: "", last_name: "", email: "", phone: "", dietary_restrictions: "", plus_one: false });
    setShowForm(false);
  }

  async function updateRsvp(guestId: string, status: string) {
    await supabase.from("guests").update({ rsvp_status: status, responded_at: new Date().toISOString() }).eq("id", guestId);
    setGuests((prev) => prev.map((g) => g.id === guestId ? { ...g, rsvp_status: status as Guest["rsvp_status"] } : g));
  }

  async function deleteGuest(guestId: string) {
    await supabase.from("guests").delete().eq("id", guestId);
    setGuests((prev) => prev.filter((g) => g.id !== guestId));
  }

  function copyRsvpLink() {
    navigator.clipboard.writeText(`${window.location.origin}/rsvp/${eventId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const attending = guests.filter((g) => g.rsvp_status === "attending").length;
  const declined = guests.filter((g) => g.rsvp_status === "declined").length;
  const pending = guests.filter((g) => g.rsvp_status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">guests</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">guest list.</h1>
            <p className="text-gray-500 text-sm mt-1">
              {guests.length} guests
              {plan === "free" && <span className="text-kool-red font-semibold"> · {25 - guests.length} remaining on free plan</span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={copyRsvpLink}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2.5 rounded-sm hover:border-kool-black transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "copied!" : "copy rsvp link"}
            </button>
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors">
              <Plus className="w-4 h-4" /> add guest
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "total", value: guests.length, color: "text-kool-black" },
            { label: "attending", value: attending, color: "text-green-600" },
            { label: "declined", value: declined, color: "text-red-500" },
            { label: "pending", value: pending, color: "text-gray-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-sm p-4 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Free tier warning */}
        {plan === "free" && guests.length >= 20 && (
          <div className="bg-kool-red/5 border border-kool-red/20 rounded-sm p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-kool-red font-medium">
              {guests.length >= 25 ? "you've reached the 25 guest limit." : `only ${25 - guests.length} guest spots remaining on your free plan.`}
            </p>
            <Link href="/pricing" className="text-xs font-bold text-kool-red border border-kool-red px-3 py-1.5 rounded-sm hover:bg-kool-red hover:text-white transition-colors">
              upgrade
            </Link>
          </div>
        )}

        {/* Add guest form */}
        {showForm && (
          <div className="bg-white border border-kool-red rounded-sm p-6 mb-6">
            <h3 className="font-bold mb-4">add guest</h3>
            <form onSubmit={addGuest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600">first name *</label>
                  <input required value={form.first_name} onChange={(e) => setForm(p => ({ ...p, first_name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600">last name</label>
                  <input value={form.last_name} onChange={(e) => setForm(p => ({ ...p, last_name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600">email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600">phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-gray-600">dietary restrictions</label>
                <input value={form.dietary_restrictions} onChange={(e) => setForm(p => ({ ...p, dietary_restrictions: e.target.value }))}
                  placeholder="e.g. vegetarian, gluten-free, nut allergy"
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="plus_one" checked={form.plus_one} onChange={(e) => setForm(p => ({ ...p, plus_one: e.target.checked }))} />
                <label htmlFor="plus_one" className="text-sm">bring a +1</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-kool-red text-white px-5 py-2.5 rounded-sm font-semibold text-sm hover:bg-kool-crimson transition-colors">
                  add guest
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="border border-gray-200 px-5 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
                  cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Guest table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">loading guests...</div>
        ) : guests.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="font-bold mb-2">no guests yet.</p>
            <p className="text-gray-400 text-sm mb-6">add guests manually or copy the rsvp link to share.</p>
            <button onClick={() => setShowForm(true)}
              className="bg-kool-red text-white px-6 py-3 rounded-sm font-semibold text-sm hover:bg-kool-crimson transition-colors">
              add first guest
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 px-6 py-4">name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden md:table-cell">email</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4">rsvp</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden md:table-cell">dietary</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{guest.first_name} {guest.last_name}</div>
                      {guest.plus_one && <div className="text-xs text-gray-400">+1</div>}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">{guest.email || "—"}</td>
                    <td className="px-4 py-4">
                      <select
                        value={guest.rsvp_status}
                        onChange={(e) => updateRsvp(guest.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-sm border-0 focus:outline-none cursor-pointer ${RSVP_COLORS[guest.rsvp_status]}`}
                      >
                        <option value="pending">pending</option>
                        <option value="attending">attending</option>
                        <option value="declined">declined</option>
                        <option value="maybe">maybe</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400 hidden md:table-cell">
                      {guest.dietary_restrictions || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => deleteGuest(guest.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors text-xs">remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
