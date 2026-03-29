"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Copy, Check, Users, Mail, RefreshCw, ChevronDown, ChevronRight, Car, Accessibility } from "lucide-react";
import type { Guest } from "@/types";

const RSVP_COLORS: Record<string, string> = {
  attending: "bg-green-50 text-green-700",
  declined: "bg-red-50 text-red-700",
  maybe: "bg-yellow-50 text-yellow-700",
  pending: "bg-gray-100 text-gray-500",
};

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface GuestWithInvite extends Guest {
  invite_sent?: boolean;
  invite_sent_at?: string;
  rsvp_answers?: Record<string, string | boolean>;
  plus_one_name?: string;
  plus_one_attending?: boolean;
}

export default function GuestsPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [guests, setGuests] = useState<GuestWithInvite[]>([]);
  const [plan, setPlan] = useState("free");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sendingInvite, setSendingInvite] = useState<string | null>(null);
  const [expandedGuest, setExpandedGuest] = useState<string | null>(null);
  const supabase = createClient();

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "", dietary_restrictions: "", plus_one: false,
  });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

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
    const { data: event } = await supabase.from("events").select("name, event_date, event_time, location").eq("id", id).single();
    if (event) {
      setEventName(event.name || "");
      setEventDate(event.event_date || "");
      setEventTime(event.event_time || "");
      setEventLocation(event.location || "");
    }
    const { data } = await supabase.from("guests").select("*").eq("event_id", id).order("last_name");
    setGuests(data || []);
    setLoading(false);
  }

  async function sendInvite(guest: GuestWithInvite, eid: string) {
    if (!guest.email) {
      showToast("no email address for this guest", "error");
      return;
    }
    setSendingInvite(guest.id);
    try {
      const rsvpUrl = `${window.location.origin}/rsvp/${eid}`;
      const res = await fetch("/api/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId: guest.id,
          guestName: `${guest.first_name}${guest.last_name ? " " + guest.last_name : ""}`,
          guestEmail: guest.email,
          eventId: eid,
          eventName,
          eventDate,
          eventTime,
          eventLocation,
          rsvpUrl,
        }),
      });
      if (!res.ok) throw new Error("failed to send");
      await supabase.from("guests").update({
        invite_sent: true,
        invite_sent_at: new Date().toISOString(),
      }).eq("id", guest.id);
      setGuests((prev) => prev.map((g) => g.id === guest.id
        ? { ...g, invite_sent: true, invite_sent_at: new Date().toISOString() }
        : g
      ));
      showToast(`invite sent to ${guest.first_name}!`);
    } catch {
      showToast("failed to send invite", "error");
    } finally {
      setSendingInvite(null);
    }
  }

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    if (plan === "free" && guests.length >= 25) {
      alert("free plan is limited to 25 guests. upgrade to premium for unlimited guests.");
      return;
    }
    const { data } = await supabase.from("guests").insert({ ...form, event_id: eventId }).select().single();
    if (data) {
      setGuests((prev) => [...prev, data]);
      setForm({ first_name: "", last_name: "", email: "", phone: "", dietary_restrictions: "", plus_one: false });
      setShowForm(false);
      if (form.email) {
        await sendInvite(data, eventId);
      }
    }
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

  // RSVP answer summaries
  const parkingCount = guests.filter((g) => {
    const answers = g.rsvp_answers as Record<string, unknown> | undefined;
    return answers?.parking === true;
  }).length;
  const adaCount = guests.filter((g) => {
    const answers = g.rsvp_answers as Record<string, unknown> | undefined;
    return answers?.ada && String(answers.ada).trim().length > 0;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`px-4 py-3 rounded-sm text-sm font-semibold shadow-lg transition-all animate-in slide-in-from-right ${
            toast.type === "success" ? "bg-kool-black text-white" : "bg-red-600 text-white"
          }`}>
            {toast.message}
          </div>
        ))}
      </div>

      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo size="sm" />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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

        {/* RSVP answer summary */}
        {(parkingCount > 0 || adaCount > 0) && (
          <div className="flex flex-wrap gap-3 mb-6">
            {parkingCount > 0 && (
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-sm px-4 py-2">
                <Car className="w-4 h-4 text-kool-red" />
                <span className="text-xs font-semibold text-gray-600">{parkingCount} need parking</span>
              </div>
            )}
            {adaCount > 0 && (
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-sm px-4 py-2">
                <Accessibility className="w-4 h-4 text-kool-red" />
                <span className="text-xs font-semibold text-gray-600">{adaCount} ADA / special accommodations</span>
              </div>
            )}
          </div>
        )}

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
                  <label className="block text-xs font-semibold mb-1.5 text-gray-600">
                    email
                    <span className="text-kool-red ml-1">— invite will be sent automatically</span>
                  </label>
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
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden md:table-cell">info</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden lg:table-cell">invite</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => {
                  const answers = (guest.rsvp_answers as Record<string, unknown>) || {};
                  const dietary = (guest.dietary_restrictions || answers.dietary) as string | undefined;
                  const needsParking = answers.parking === true;
                  const adaNote = answers.ada as string | undefined;
                  const isExpanded = expandedGuest === guest.id;
                  const hasAnswers = dietary || needsParking || adaNote || guest.plus_one_attending || Object.keys(answers).filter(k => !["dietary","parking","ada","plus_one"].includes(k)).length > 0;

                  return (
                    <>
                      <tr
                        key={guest.id}
                        className={`border-b border-gray-50 transition-colors ${hasAnswers ? "cursor-pointer hover:bg-gray-50/70" : "hover:bg-gray-50/50"}`}
                        onClick={() => hasAnswers && setExpandedGuest(isExpanded ? null : guest.id)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {hasAnswers && (
                              isExpanded
                                ? <ChevronDown className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                                : <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            )}
                            <div>
                              <div className="font-medium text-sm">{guest.first_name} {guest.last_name}</div>
                              {(guest.plus_one || guest.plus_one_attending) && (
                                <div className="text-xs text-gray-400">
                                  +1{guest.plus_one_name ? ` · ${guest.plus_one_name}` : ""}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">{guest.email || "—"}</td>
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
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
                        <td className="px-4 py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1.5">
                            {dietary && (
                              <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-sm font-medium" title={dietary}>
                                dietary
                              </span>
                            )}
                            {needsParking && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm font-medium flex items-center gap-1">
                                <Car className="w-3 h-3" /> parking
                              </span>
                            )}
                            {adaNote && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-sm font-medium flex items-center gap-1">
                                <Accessibility className="w-3 h-3" /> ADA
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell" onClick={(e) => e.stopPropagation()}>
                          {guest.email ? (
                            <button
                              onClick={() => sendInvite(guest, eventId)}
                              disabled={sendingInvite === guest.id}
                              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-sm transition-colors ${
                                guest.invite_sent
                                  ? "text-green-600 bg-green-50 hover:bg-green-100"
                                  : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                              }`}
                            >
                              {sendingInvite === guest.id ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : guest.invite_sent ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Mail className="w-3 h-3" />
                              )}
                              {sendingInvite === guest.id ? "sending..." : guest.invite_sent ? "sent" : "send invite"}
                            </button>
                          ) : (
                            <span className="text-xs text-gray-300">no email</span>
                          )}
                        </td>
                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => deleteGuest(guest.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors text-xs">remove</button>
                        </td>
                      </tr>
                      {/* Expanded RSVP answers */}
                      {isExpanded && (
                        <tr key={`${guest.id}-expanded`} className="border-b border-gray-100 bg-gray-50/60">
                          <td colSpan={6} className="px-10 py-4">
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-gray-400 tracking-widest mb-3">rsvp answers</p>
                              {dietary && (
                                <div className="flex gap-2 text-sm">
                                  <span className="text-gray-400 w-48 shrink-0">dietary restrictions</span>
                                  <span className="text-gray-700">{dietary}</span>
                                </div>
                              )}
                              {needsParking !== undefined && answers.parking !== undefined && (
                                <div className="flex gap-2 text-sm">
                                  <span className="text-gray-400 w-48 shrink-0">parking needed</span>
                                  <span className="text-gray-700">{needsParking ? "yes" : "no"}</span>
                                </div>
                              )}
                              {adaNote !== undefined && answers.ada !== undefined && (
                                <div className="flex gap-2 text-sm">
                                  <span className="text-gray-400 w-48 shrink-0">ADA / accommodations</span>
                                  <span className="text-gray-700">{adaNote || "none"}</span>
                                </div>
                              )}
                              {(guest.plus_one_attending !== undefined || answers.plus_one !== undefined) && (
                                <div className="flex gap-2 text-sm">
                                  <span className="text-gray-400 w-48 shrink-0">bringing a guest</span>
                                  <span className="text-gray-700">
                                    {(guest.plus_one_attending || answers.plus_one === true) ? "yes" : "no"}
                                    {guest.plus_one_name && ` · ${guest.plus_one_name}`}
                                  </span>
                                </div>
                              )}
                              {/* Custom question answers */}
                              {Object.entries(answers)
                                .filter(([k]) => !["dietary", "parking", "ada", "plus_one"].includes(k))
                                .map(([key, val]) => (
                                  <div key={key} className="flex gap-2 text-sm">
                                    <span className="text-gray-400 w-48 shrink-0">{key.replace(/_/g, " ")}</span>
                                    <span className="text-gray-700">{String(val)}</span>
                                  </div>
                                ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
