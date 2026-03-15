"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, DollarSign } from "lucide-react";
import { formatCurrency, BUDGET_CATEGORIES } from "@/lib/utils";
import type { BudgetItem } from "@/types";

export default function BudgetPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  const [form, setForm] = useState({
    category: "venue", item_name: "", estimated_cost: "", actual_cost: "", is_paid: false, notes: "",
  });

  useEffect(() => {
    params.then(({ id }) => { setEventId(id); loadData(id); });
  }, []);

  async function loadData(id: string) {
    const { data: event } = await supabase.from("events").select("budget_total").eq("id", id).single();
    setTotalBudget(event?.budget_total || 0);
    const { data } = await supabase.from("budget_items").select("*").eq("event_id", id).order("category");
    setItems(data || []);
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const { data } = await supabase.from("budget_items").insert({
      event_id: eventId,
      category: form.category,
      item_name: form.item_name,
      estimated_cost: parseFloat(form.estimated_cost) || 0,
      actual_cost: parseFloat(form.actual_cost) || 0,
      is_paid: form.is_paid,
      notes: form.notes || null,
    }).select().single();
    if (data) setItems((prev) => [...prev, data]);
    setForm({ category: "venue", item_name: "", estimated_cost: "", actual_cost: "", is_paid: false, notes: "" });
    setShowForm(false);
  }

  async function togglePaid(item: BudgetItem) {
    await supabase.from("budget_items").update({ is_paid: !item.is_paid }).eq("id", item.id);
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_paid: !i.is_paid } : i));
  }

  async function deleteItem(id: string) {
    await supabase.from("budget_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const totalEstimated = items.reduce((s, i) => s + i.estimated_cost, 0);
  const totalActual = items.reduce((s, i) => s + i.actual_cost, 0);
  const remaining = totalBudget - totalActual;
  const pct = totalBudget > 0 ? Math.min(100, Math.round((totalActual / totalBudget) * 100)) : 0;

  const grouped: Record<string, BudgetItem[]> = {};
  items.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-black text-kool-black text-xl">kool<span className="text-kool-red">.</span></span>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">budget</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black tracking-tight">budget tracker.</h1>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors">
            <Plus className="w-4 h-4" /> add item
          </button>
        </div>

        {/* Budget summary */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-kool-black">{formatCurrency(totalBudget)}</div>
              <div className="text-xs text-gray-400 mt-1">total budget</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-kool-red">{formatCurrency(totalActual)}</div>
              <div className="text-xs text-gray-400 mt-1">actual spent</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-black ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(remaining)}
              </div>
              <div className="text-xs text-gray-400 mt-1">{remaining >= 0 ? "remaining" : "over budget"}</div>
            </div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${pct > 90 ? "bg-red-500" : "bg-kool-red"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{pct}% of budget used</span>
            <span>estimated total: {formatCurrency(totalEstimated)}</span>
          </div>
        </div>

        {/* Add item form */}
        {showForm && (
          <div className="bg-white border border-kool-red rounded-sm p-5 mb-6">
            <form onSubmit={addItem} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))}
                  className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red bg-white">
                  {BUDGET_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input required value={form.item_name} onChange={(e) => setForm(p => ({ ...p, item_name: e.target.value }))}
                  placeholder="item name"
                  className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">estimated cost</label>
                  <input type="number" value={form.estimated_cost} onChange={(e) => setForm(p => ({ ...p, estimated_cost: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">actual cost</label>
                  <input type="number" value={form.actual_cost} onChange={(e) => setForm(p => ({ ...p, actual_cost: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="paid" checked={form.is_paid} onChange={(e) => setForm(p => ({ ...p, is_paid: e.target.checked }))} />
                <label htmlFor="paid" className="text-sm">already paid</label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-kool-red text-white px-5 py-2 rounded-sm font-semibold text-sm hover:bg-kool-crimson">add</button>
                <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 px-5 py-2 rounded-sm text-sm">cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Items by category */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([category, catItems]) => {
            const catTotal = catItems.reduce((s, i) => s + i.actual_cost, 0);
            return (
              <div key={category} className="bg-white border border-gray-100 rounded-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold capitalize">{category}</span>
                  <span className="text-sm font-bold text-kool-red">{formatCurrency(catTotal)}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {catItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${item.is_paid ? "line-through text-gray-400" : ""}`}>{item.item_name}</span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold">{formatCurrency(item.actual_cost)}</div>
                        {item.estimated_cost !== item.actual_cost && (
                          <div className="text-xs text-gray-400">est. {formatCurrency(item.estimated_cost)}</div>
                        )}
                      </div>
                      <button onClick={() => togglePaid(item)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-sm transition-colors ${item.is_paid ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600"}`}>
                        {item.is_paid ? "paid ✓" : "unpaid"}
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors text-xs">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-sm p-12 text-center">
              <DollarSign className="w-10 h-10 text-gray-200 mx-auto mb-4" />
              <p className="font-bold mb-2">no budget items yet.</p>
              <p className="text-gray-400 text-sm">start tracking your event spending.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
