"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Plus, X } from "lucide-react";

interface StaffMember {
  id: string;
  event_id: string;
  name: string;
  role?: string;
  assignment?: string;
  status: "on_site" | "en_route" | "not_arrived";
}

const STATUS_CONFIG = {
  on_site: { label: "On Site", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
  en_route: { label: "En Route", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  not_arrived: { label: "Not Yet Arrived", color: "text-white/40", bg: "bg-white/5 border-white/10" },
};

const STATUSES: Array<"on_site" | "en_route" | "not_arrived"> = ["on_site", "en_route", "not_arrived"];

interface StaffPanelProps {
  eventId: string;
}

export function StaffPanel({ eventId }: StaffPanelProps) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", assignment: "" });
  const supabase = createClient();

  useEffect(() => {
    loadStaff();
  }, [eventId]);

  async function loadStaff() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("war_room_staff")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at");
    setStaff(data || []);
    setLoading(false);
  }

  async function addStaff(e: React.FormEvent) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !form.name.trim()) return;
    const { data } = await supabase
      .from("war_room_staff")
      .insert({
        event_id: eventId,
        user_id: user.id,
        name: form.name.trim(),
        role: form.role.trim() || null,
        assignment: form.assignment.trim() || null,
        status: "not_arrived",
      })
      .select()
      .single();
    if (data) setStaff((prev) => [...prev, data]);
    setForm({ name: "", role: "", assignment: "" });
    setShowForm(false);
  }

  async function updateStatus(id: string, status: "on_site" | "en_route" | "not_arrived") {
    await supabase
      .from("war_room_staff")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  async function removeStaff(id: string) {
    await supabase.from("war_room_staff").delete().eq("id", id);
    setStaff((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-[#D90000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const onSiteCount = staff.filter((s) => s.status === "on_site").length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/40">
          {onSiteCount}/{staff.length} on site
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-xs text-[#D90000] hover:text-[#ff2200] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          add staff
        </button>
      </div>

      {showForm && (
        <form onSubmit={addStaff} className="bg-white/5 border border-white/10 rounded-sm p-3 space-y-2">
          <input
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="name"
            className="w-full bg-white/10 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D90000]"
          />
          <input
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            placeholder="role (e.g. DJ, Coordinator)"
            className="w-full bg-white/10 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D90000]"
          />
          <input
            value={form.assignment}
            onChange={(e) => setForm((p) => ({ ...p, assignment: e.target.value }))}
            placeholder="current assignment"
            className="w-full bg-white/10 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D90000]"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-[#D90000] text-white text-xs px-4 py-2 rounded-sm font-semibold hover:bg-[#b00000]">
              add
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/40 text-xs px-4 py-2 rounded-sm border border-white/10 hover:border-white/20">
              cancel
            </button>
          </div>
        </form>
      )}

      {staff.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">no staff added yet</p>
          <p className="text-white/25 text-xs mt-1">tap + add staff to track your team</p>
        </div>
      ) : (
        <div className="space-y-2">
          {staff.map((member) => {
            const cfg = STATUS_CONFIG[member.status];
            return (
              <div key={member.id} className="bg-white/5 border border-white/10 rounded-sm p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-white">{member.name}</div>
                    {member.role && <div className="text-xs text-white/40">{member.role}</div>}
                    {member.assignment && <div className="text-xs text-white/30 mt-0.5">→ {member.assignment}</div>}
                  </div>
                  <button
                    onClick={() => removeStaff(member.id)}
                    className="text-white/20 hover:text-white/50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(member.id, s)}
                      className={`text-xs px-2.5 py-1 rounded-sm border font-medium transition-all ${
                        member.status === s
                          ? `${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].color}`
                          : "bg-white/5 border-white/10 text-white/30 hover:border-white/20"
                      }`}
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
