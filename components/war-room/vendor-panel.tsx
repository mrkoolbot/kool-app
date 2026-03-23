"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Truck, AlertTriangle } from "lucide-react";

interface Vendor {
  id: string;
  vendor_name: string;
  category: string;
  contact_name?: string;
  phone?: string;
}

interface VendorStatus {
  id: string;
  vendor_id: string;
  status: "confirmed" | "on_way" | "arrived" | "issue";
  notes?: string;
}

const STATUS_CONFIG = {
  confirmed: { label: "Confirmed", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  on_way: { label: "On Way", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  arrived: { label: "Arrived", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
  issue: { label: "Issue ⚠", color: "text-[#D90000]", bg: "bg-[#D90000]/10 border-[#D90000]/40" },
};

const STATUSES: Array<"confirmed" | "on_way" | "arrived" | "issue"> = ["confirmed", "on_way", "arrived", "issue"];

interface VendorPanelProps {
  eventId: string;
  onIncidentAdded?: (note: string) => void;
}

export function VendorPanel({ eventId, onIncidentAdded }: VendorPanelProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [statuses, setStatuses] = useState<Record<string, VendorStatus>>({});
  const [loading, setLoading] = useState(true);
  const [issueVendor, setIssueVendor] = useState<string | null>(null);
  const [issueNote, setIssueNote] = useState("");
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, [eventId]);

  async function loadData() {
    const [{ data: vendorData }, { data: statusData }] = await Promise.all([
      supabase.from("vendors").select("*").eq("event_id", eventId).order("vendor_name"),
      supabase.from("war_room_vendor_status").select("*").eq("event_id", eventId),
    ]);
    setVendors(vendorData || []);
    const statusMap: Record<string, VendorStatus> = {};
    (statusData || []).forEach((s) => { statusMap[s.vendor_id] = s; });
    setStatuses(statusMap);
    setLoading(false);
  }

  async function updateVendorStatus(vendor: Vendor, newStatus: "confirmed" | "on_way" | "arrived" | "issue") {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const existing = statuses[vendor.id];
    if (existing) {
      const { data } = await supabase
        .from("war_room_vendor_status")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single();
      if (data) setStatuses((prev) => ({ ...prev, [vendor.id]: data }));
    } else {
      const { data } = await supabase
        .from("war_room_vendor_status")
        .insert({
          event_id: eventId,
          vendor_id: vendor.id,
          user_id: user.id,
          status: newStatus,
        })
        .select()
        .single();
      if (data) setStatuses((prev) => ({ ...prev, [vendor.id]: data }));
    }

    if (newStatus === "issue") {
      setIssueVendor(vendor.id);
    }
  }

  async function submitIssue(vendor: Vendor) {
    if (!issueNote.trim()) {
      setIssueVendor(null);
      return;
    }
    const note = `🚨 VENDOR ISSUE: ${vendor.vendor_name} — ${issueNote}`;
    onIncidentAdded?.(note);
    setIssueNote("");
    setIssueVendor(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-[#D90000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-8">
        <Truck className="w-8 h-8 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 text-sm">no vendors added</p>
        <p className="text-white/25 text-xs mt-1">add vendors in the vendors section</p>
      </div>
    );
  }

  const issueCount = vendors.filter((v) => statuses[v.id]?.status === "issue").length;
  const arrivedCount = vendors.filter((v) => statuses[v.id]?.status === "arrived").length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/40">
          {arrivedCount}/{vendors.length} arrived
        </span>
        {issueCount > 0 && (
          <span className="flex items-center gap-1 text-xs text-[#D90000] font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            {issueCount} issue{issueCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {vendors.map((vendor) => {
          const status = statuses[vendor.id]?.status || "confirmed";
          const cfg = STATUS_CONFIG[status];
          return (
            <div key={vendor.id} className={`border rounded-sm p-3 ${
              status === "issue" ? "bg-[#D90000]/10 border-[#D90000]/30" : "bg-white/5 border-white/10"
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-white">{vendor.vendor_name}</div>
                  <div className="text-xs text-white/40">{vendor.category}</div>
                  {vendor.contact_name && (
                    <div className="text-xs text-white/30 mt-0.5">
                      {vendor.contact_name}
                      {vendor.phone && ` · ${vendor.phone}`}
                    </div>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-sm border ${cfg.bg} ${cfg.color} font-medium`}>
                  {cfg.label}
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateVendorStatus(vendor, s)}
                    className={`text-xs px-2.5 py-1 rounded-sm border font-medium transition-all ${
                      status === s
                        ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color}`
                        : "bg-white/5 border-white/10 text-white/30 hover:border-white/20"
                    }`}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
              {issueVendor === vendor.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    autoFocus
                    value={issueNote}
                    onChange={(e) => setIssueNote(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") submitIssue(vendor); if (e.key === "Escape") setIssueVendor(null); }}
                    placeholder="describe the issue..."
                    className="flex-1 bg-white/10 border border-[#D90000]/40 rounded-sm px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D90000]"
                  />
                  <button
                    onClick={() => submitIssue(vendor)}
                    className="bg-[#D90000] text-white text-xs px-3 py-1.5 rounded-sm font-semibold"
                  >
                    log
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
