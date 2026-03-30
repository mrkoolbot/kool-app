"use client";
import { KoolLogo } from "@/components/kool-logo";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Search, UserCheck, Download, QrCode, X, Check, Users } from "lucide-react";
import QRCode from "qrcode";

interface Guest {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  rsvp_status: string;
  checked_in?: boolean;
  checked_in_at?: string;
  plus_one?: boolean;
  plus_one_name?: string;
}

export default function CheckinPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "checked_in" | "not_checked_in">("all");
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ guest: Guest; dataUrl: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
  }, []);

  async function loadData(id: string) {
    const { data: event } = await supabase.from("events").select("name").eq("id", id).single();
    if (event) setEventName(event.name || "");
    const { data } = await supabase
      .from("guests")
      .select("id, first_name, last_name, email, rsvp_status, checked_in, checked_in_at, plus_one, plus_one_name")
      .eq("event_id", id)
      .order("last_name");
    setGuests(data || []);
    setLoading(false);
  }

  async function checkIn(guestId: string) {
    setCheckingIn(guestId);
    const now = new Date().toISOString();
    const { error } = await supabase
      .from("guests")
      .update({ checked_in: true, checked_in_at: now })
      .eq("id", guestId);
    if (!error) {
      setGuests((prev) => prev.map((g) => g.id === guestId ? { ...g, checked_in: true, checked_in_at: now } : g));
    }
    setCheckingIn(null);
  }

  async function uncheckIn(guestId: string) {
    const { error } = await supabase
      .from("guests")
      .update({ checked_in: false, checked_in_at: null })
      .eq("id", guestId);
    if (!error) {
      setGuests((prev) => prev.map((g) => g.id === guestId ? { ...g, checked_in: false, checked_in_at: undefined } : g));
    }
  }

  async function showQr(guest: Guest) {
    const url = `${window.location.origin}/checkin/${eventId}/${guest.id}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 280, margin: 2, color: { dark: "#0a0a0a", light: "#ffffff" } });
    setQrModal({ guest, dataUrl });
  }

  function exportReport() {
    const rows = [
      ["Name", "Email", "RSVP Status", "Checked In", "Check-in Time"],
      ...guests.map((g) => [
        `${g.first_name} ${g.last_name || ""}`.trim(),
        g.email || "",
        g.rsvp_status,
        g.checked_in ? "yes" : "no",
        g.checked_in_at ? new Date(g.checked_in_at).toLocaleString() : "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventName.toLowerCase().replace(/\s+/g, "-")}-checkin.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredGuests = guests.filter((g) => {
    const matchSearch =
      !search ||
      `${g.first_name} ${g.last_name || ""}`.toLowerCase().includes(search.toLowerCase()) ||
      (g.email || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "checked_in" && g.checked_in) ||
      (filter === "not_checked_in" && !g.checked_in);
    return matchSearch && matchFilter;
  });

  const checkedInCount = guests.filter((g) => g.checked_in).length;
  const totalCount = guests.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo size="sm" inverted={true} />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">check-in</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">check-in</h1>
            <p className="text-gray-500 text-sm mt-1">
              {eventName && <span className="font-medium">{eventName} · </span>}
              <span className="text-kool-red font-bold">{checkedInCount} of {totalCount}</span> checked in
            </p>
          </div>
          <button
            onClick={exportReport}
            className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2.5 rounded-sm hover:border-kool-black transition-colors"
          >
            <Download className="w-4 h-4" /> export report
          </button>
        </div>

        {/* Live counter */}
        <div className="bg-kool-black rounded-sm p-6 mb-6 flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-black text-white">{checkedInCount}</div>
            <div className="text-xs text-white/40 mt-1">checked in</div>
          </div>
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-kool-red rounded-full transition-all duration-500"
                style={{ width: totalCount > 0 ? `${(checkedInCount / totalCount) * 100}%` : "0%" }}
              />
            </div>
            <p className="text-white/50 text-xs mt-2">{totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0}% arrived · {totalCount - checkedInCount} remaining</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black text-white/30">{totalCount}</div>
            <div className="text-xs text-white/40 mt-1">total guests</div>
          </div>
        </div>

        {/* Search & filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search guests..."
              className="w-full border border-gray-200 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-kool-red bg-white"
            />
          </div>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-sm p-1">
            {(["all", "checked_in", "not_checked_in"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                  filter === f ? "bg-kool-red text-white" : "text-gray-500 hover:text-kool-black"
                }`}
              >
                {f === "all" ? "all" : f === "checked_in" ? "checked in" : "not in"}
              </button>
            ))}
          </div>
        </div>

        {/* Guest list */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">loading guests...</div>
        ) : filteredGuests.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="font-bold">no guests found.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-400 px-6 py-4">name</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden md:table-cell">rsvp</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4">status</th>
                  <th className="text-left text-xs font-semibold text-gray-400 px-4 py-4 hidden lg:table-cell">time</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${guest.checked_in ? "bg-green-50/30" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{guest.first_name} {guest.last_name}</div>
                      {guest.email && <div className="text-xs text-gray-400">{guest.email}</div>}
                      {(guest.plus_one || guest.plus_one_name) && (
                        <div className="text-xs text-gray-400">+1{guest.plus_one_name ? ` · ${guest.plus_one_name}` : ""}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${
                        guest.rsvp_status === "attending" ? "bg-green-50 text-green-700" :
                        guest.rsvp_status === "declined" ? "bg-red-50 text-red-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {guest.rsvp_status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {guest.checked_in ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                          <Check className="w-3.5 h-3.5" /> checked in
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">not arrived</span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      {guest.checked_in_at ? (
                        <span className="text-xs text-gray-500">
                          {new Date(guest.checked_in_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showQr(guest)}
                          className="p-1.5 text-gray-400 hover:text-kool-black transition-colors"
                          title="show QR code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        {guest.checked_in ? (
                          <button
                            onClick={() => uncheckIn(guest.id)}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded-sm"
                          >
                            undo
                          </button>
                        ) : (
                          <button
                            onClick={() => checkIn(guest.id)}
                            disabled={checkingIn === guest.id}
                            className="flex items-center gap-1.5 text-xs font-semibold bg-kool-red text-white px-3 py-1.5 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
                          >
                            {checkingIn === guest.id ? (
                              "..."
                            ) : (
                              <><UserCheck className="w-3.5 h-3.5" /> check in</>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setQrModal(null)}>
          <div className="bg-white rounded-sm p-8 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQrModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-kool-black">
              <X className="w-5 h-5" />
            </button>
            <p className="font-black text-lg mb-1">{qrModal.guest.first_name} {qrModal.guest.last_name}</p>
            <p className="text-xs text-gray-400 mb-5">scan to check in</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrModal.dataUrl} alt="QR code" className="mx-auto w-56 h-56" />
            <p className="text-xs text-gray-300 mt-4 break-all">
              {typeof window !== "undefined" ? `${window.location.origin}/checkin/${eventId}/${qrModal.guest.id}` : ""}
            </p>
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = qrModal.dataUrl;
                a.download = `qr-${qrModal.guest.first_name}-${qrModal.guest.last_name || ""}.png`;
                a.click();
              }}
              className="mt-4 flex items-center gap-2 mx-auto text-xs text-gray-500 hover:text-kool-black border border-gray-200 px-4 py-2 rounded-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> download QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
