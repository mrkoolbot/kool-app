"use client";
import { KoolLogo } from "@/components/kool-logo";
import { DashboardFooter } from "@/components/dashboard-footer";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Truck } from "lucide-react";
import { VENDOR_CATEGORIES, formatCurrency } from "@/lib/utils";
import type { Vendor } from "@/types";

const STATUS_COLORS: Record<string, string> = {
  researching: "bg-gray-100 text-gray-500",
  contacted: "bg-blue-50 text-blue-600",
  booked: "bg-yellow-50 text-yellow-600",
  confirmed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

export default function VendorsPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const supabase = createClient();

  const [form, setForm] = useState({
    category: "venue", vendor_name: "", contact_name: "", email: "", phone: "", website: "",
    price_quote: "", deposit_amount: "", notes: "",
  });

  useEffect(() => { params.then(({ id }) => { setEventId(id); loadVendors(id); }); }, []);

  async function loadVendors(id: string) {
    const { data } = await supabase.from("vendors").select("*").eq("event_id", id).order("category");
    setVendors(data || []);
  }

  async function addVendor(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from("vendors").insert({
      event_id: eventId,
      category: form.category,
      vendor_name: form.vendor_name,
      contact_name: form.contact_name || null,
      email: form.email || null,
      phone: form.phone || null,
      website: form.website || null,
      price_quote: form.price_quote ? parseFloat(form.price_quote) : null,
      deposit_amount: form.deposit_amount ? parseFloat(form.deposit_amount) : null,
      notes: form.notes || null,
    }).select().single();
    if (data) setVendors((prev) => [...prev, data]);
    setForm({ category: "venue", vendor_name: "", contact_name: "", email: "", phone: "", website: "", price_quote: "", deposit_amount: "", notes: "" });
    setShowForm(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("vendors").update({ status }).eq("id", id);
    setVendors((prev) => prev.map((v) => v.id === id ? { ...v, status: status as Vendor["status"] } : v));
  }

  async function toggleField(id: string, field: "deposit_paid" | "balance_paid" | "contract_signed", current: boolean) {
    await supabase.from("vendors").update({ [field]: !current }).eq("id", id);
    setVendors((prev) => prev.map((v) => v.id === id ? { ...v, [field]: !current } : v));
  }

  const confirmedCount = vendors.filter((v) => v.status === "confirmed" || v.status === "booked").length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo size="sm" inverted={true} />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">vendors</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black">vendor management</h1>
            <p className="text-gray-500 text-sm mt-1">{confirmedCount} confirmed · {vendors.length} total</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson">
            <Plus className="w-4 h-4" /> add vendor
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-kool-red rounded-sm p-6 mb-6">
            <h3 className="font-bold mb-4">add vendor</h3>
            <form onSubmit={addVendor} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                  className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red bg-white capitalize">
                  {VENDOR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input required value={form.vendor_name} onChange={(e) => setForm(p => ({ ...p, vendor_name: e.target.value }))}
                  placeholder="vendor / business name"
                  className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={form.contact_name} onChange={(e) => setForm(p => ({ ...p, contact_name: e.target.value }))}
                  placeholder="contact person" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="email" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="phone" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                <input value={form.website} onChange={(e) => setForm(p => ({ ...p, website: e.target.value }))}
                  placeholder="website" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.price_quote} onChange={(e) => setForm(p => ({ ...p, price_quote: e.target.value }))}
                  placeholder="price quote ($)" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
                <input type="number" value={form.deposit_amount} onChange={(e) => setForm(p => ({ ...p, deposit_amount: e.target.value }))}
                  placeholder="deposit amount ($)" className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <textarea value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="notes..." rows={2}
                className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red resize-none" />
              <div className="flex gap-3">
                <button type="submit" className="bg-kool-red text-white px-5 py-2 rounded-sm font-semibold text-sm hover:bg-kool-crimson">add vendor</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 px-5 py-2 rounded-sm text-sm">cancel</button>
              </div>
            </form>
          </div>
        )}

        {vendors.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
            <Truck className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="font-bold mb-2">no vendors yet.</p>
            <p className="text-gray-400 text-sm">add your caterer, florist, photographer, and more.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50"
                  onClick={() => setExpanded(expanded === vendor.id ? null : vendor.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-400 lowercase tracking-wide">{vendor.category}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${STATUS_COLORS[vendor.status]}`}>{vendor.status}</span>
                    </div>
                    <div className="font-bold mt-0.5">{vendor.vendor_name}</div>
                    {vendor.contact_name && <div className="text-sm text-gray-400">{vendor.contact_name}</div>}
                  </div>
                  <div className="text-right">
                    {vendor.price_quote && <div className="font-bold text-kool-black">{formatCurrency(vendor.price_quote)}</div>}
                    <div className="flex gap-1 mt-1 justify-end">
                      {vendor.contract_signed && <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">contract ✓</span>}
                      {vendor.deposit_paid && <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">deposit ✓</span>}
                    </div>
                  </div>
                </div>
                {expanded === vendor.id && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      {vendor.email && <a href={`mailto:${vendor.email}`} className="text-kool-red hover:underline">{vendor.email}</a>}
                      {vendor.phone && <a href={`tel:${vendor.phone}`} className="text-gray-600">{vendor.phone}</a>}
                      {vendor.website && <a href={vendor.website} target="_blank" className="text-kool-red hover:underline">website ↗</a>}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button onClick={() => toggleField(vendor.id, "contract_signed", vendor.contract_signed)}
                        className={`text-xs px-3 py-1.5 rounded-sm font-semibold transition-colors ${vendor.contract_signed ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700"}`}>
                        contract signed {vendor.contract_signed ? "✓" : "○"}
                      </button>
                      <button onClick={() => toggleField(vendor.id, "deposit_paid", vendor.deposit_paid)}
                        className={`text-xs px-3 py-1.5 rounded-sm font-semibold transition-colors ${vendor.deposit_paid ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700"}`}>
                        deposit paid {vendor.deposit_paid ? "✓" : "○"}
                      </button>
                      <button onClick={() => toggleField(vendor.id, "balance_paid", vendor.balance_paid)}
                        className={`text-xs px-3 py-1.5 rounded-sm font-semibold transition-colors ${vendor.balance_paid ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700"}`}>
                        balance paid {vendor.balance_paid ? "✓" : "○"}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-gray-500">status:</label>
                      <select value={vendor.status} onChange={(e) => updateStatus(vendor.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-sm border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[vendor.status]} bg-transparent`}>
                        {["researching", "contacted", "booked", "confirmed", "cancelled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    {vendor.notes && <p className="text-sm text-gray-500 mt-3 italic">{vendor.notes}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <DashboardFooter />
    </div>
  );
}
