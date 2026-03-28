"use client";
import { KoolLogo } from "@/components/kool-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Eye, Save } from "lucide-react";

interface RsvpQuestion {
  id: string;
  label: string;
  type: "textarea" | "yes-no" | "yes-no-with-name" | "text" | "dropdown";
  enabled: boolean;
  required: boolean;
  options?: string[];
  isDefault?: boolean;
}

const DEFAULT_QUESTIONS: RsvpQuestion[] = [
  {
    id: "dietary",
    label: "do you have any food allergies or dietary restrictions?",
    type: "textarea",
    enabled: true,
    required: false,
    isDefault: true,
  },
  {
    id: "parking",
    label: "will you need parking?",
    type: "yes-no",
    enabled: true,
    required: false,
    isDefault: true,
  },
  {
    id: "ada",
    label: "do you need any ADA arrangements or special accommodations?",
    type: "textarea",
    enabled: true,
    required: false,
    isDefault: true,
  },
  {
    id: "plus_one",
    label: "will you be bringing a guest?",
    type: "yes-no-with-name",
    enabled: true,
    required: false,
    isDefault: true,
  },
];

const TYPE_LABELS: Record<string, string> = {
  text: "short text",
  textarea: "long text",
  "yes-no": "yes / no",
  "yes-no-with-name": "yes / no + name",
  dropdown: "dropdown",
};

export default function RsvpSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [questions, setQuestions] = useState<RsvpQuestion[]>(DEFAULT_QUESTIONS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newQuestion, setNewQuestion] = useState<{ label: string; type: RsvpQuestion["type"]; options: string }>({
    label: "",
    type: "text",
    options: "",
  });
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
  }, []);

  async function loadData(id: string) {
    const { data: event } = await supabase
      .from("events")
      .select("name, rsvp_questions")
      .eq("id", id)
      .single();
    if (event) {
      setEventName(event.name || "");
      if (event.rsvp_questions && Array.isArray(event.rsvp_questions) && event.rsvp_questions.length > 0) {
        // Merge: preserve default markers for default IDs
        const loaded = event.rsvp_questions.map((q: RsvpQuestion) => ({
          ...q,
          isDefault: ["dietary", "parking", "ada", "plus_one"].includes(q.id),
        }));
        setQuestions(loaded);
      }
    }
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    const toSave = questions.map(({ isDefault: _isDefault, ...q }) => q);
    await supabase.from("events").update({ rsvp_questions: toSave }).eq("id", eventId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleQuestion(id: string) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, enabled: !q.enabled } : q)));
  }

  function toggleRequired(id: string) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, required: !q.required } : q)));
  }

  function updateLabel(id: string, label: string) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, label } : q)));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    setQuestions((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }

  function moveDown(idx: number) {
    setQuestions((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function addQuestion() {
    if (!newQuestion.label.trim()) return;
    const customCount = questions.filter((q) => !q.isDefault).length;
    if (customCount >= 10) {
      alert("maximum of 10 custom questions reached.");
      return;
    }
    const id = `custom_${Date.now()}`;
    const q: RsvpQuestion = {
      id,
      label: newQuestion.label.trim(),
      type: newQuestion.type,
      enabled: true,
      required: false,
      isDefault: false,
    };
    if (newQuestion.type === "dropdown" && newQuestion.options.trim()) {
      q.options = newQuestion.options.split(",").map((o) => o.trim()).filter(Boolean);
    }
    setQuestions((prev) => [...prev, q]);
    setNewQuestion({ label: "", type: "text", options: "" });
  }

  const totalEnabled = questions.filter((q) => q.enabled).length;
  const customCount = questions.filter((q) => !q.isDefault).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">rsvp settings</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">rsvp settings.</h1>
            <p className="text-gray-500 text-sm mt-1">
              {eventName && <span className="font-medium">{eventName} · </span>}
              {totalEnabled} question{totalEnabled !== 1 ? "s" : ""} enabled
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2.5 rounded-sm hover:border-kool-black transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "hide preview" : "preview form"}
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "saving..." : saved ? "saved!" : "save changes"}
            </button>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white border border-kool-red rounded-sm p-6 mb-8">
            <h3 className="text-xs font-bold text-kool-red tracking-widest mb-4">form preview</h3>
            <div className="space-y-4">
              {questions.filter((q) => q.enabled).map((q) => (
                <PreviewQuestion key={q.id} question={q} />
              ))}
              {questions.filter((q) => q.enabled).length === 0 && (
                <p className="text-gray-400 text-sm">no questions enabled.</p>
              )}
            </div>
          </div>
        )}

        {/* Default questions */}
        <div className="bg-white border border-gray-100 rounded-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-sm">default questions</h2>
            <p className="text-xs text-gray-400 mt-0.5">built-in questions — toggle on/off or edit the label</p>
          </div>
          <div className="divide-y divide-gray-50">
            {questions.filter((q) => q.isDefault).map((q, idx) => {
              const globalIdx = questions.findIndex((gq) => gq.id === q.id);
              return (
                <QuestionRow
                  key={q.id}
                  question={q}
                  idx={globalIdx}
                  total={questions.length}
                  onToggle={() => toggleQuestion(q.id)}
                  onToggleRequired={() => toggleRequired(q.id)}
                  onUpdateLabel={(label) => updateLabel(q.id, label)}
                  onMoveUp={() => moveUp(globalIdx)}
                  onMoveDown={() => moveDown(globalIdx)}
                  onRemove={undefined}
                />
              );
            })}
          </div>
        </div>

        {/* Custom questions */}
        <div className="bg-white border border-gray-100 rounded-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-sm">custom questions</h2>
                <p className="text-xs text-gray-400 mt-0.5">{customCount}/10 custom questions</p>
              </div>
            </div>
          </div>

          {questions.filter((q) => !q.isDefault).length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">
              no custom questions yet. add one below.
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {questions.filter((q) => !q.isDefault).map((q) => {
                const globalIdx = questions.findIndex((gq) => gq.id === q.id);
                return (
                  <QuestionRow
                    key={q.id}
                    question={q}
                    idx={globalIdx}
                    total={questions.length}
                    onToggle={() => toggleQuestion(q.id)}
                    onToggleRequired={() => toggleRequired(q.id)}
                    onUpdateLabel={(label) => updateLabel(q.id, label)}
                    onMoveUp={() => moveUp(globalIdx)}
                    onMoveDown={() => moveDown(globalIdx)}
                    onRemove={() => removeQuestion(q.id)}
                  />
                );
              })}
            </div>
          )}

          {/* Add question form */}
          {customCount < 10 && (
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50">
              <p className="text-xs font-semibold text-gray-500 mb-3">add custom question</p>
              <div className="space-y-3">
                <input
                  value={newQuestion.label}
                  onChange={(e) => setNewQuestion((p) => ({ ...p, label: e.target.value }))}
                  placeholder="question label..."
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                />
                <div className="flex gap-3">
                  <select
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion((p) => ({ ...p, type: e.target.value as RsvpQuestion["type"] }))}
                    className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                  >
                    {Object.entries(TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                  {newQuestion.type === "dropdown" && (
                    <input
                      value={newQuestion.options}
                      onChange={(e) => setNewQuestion((p) => ({ ...p, options: e.target.value }))}
                      placeholder="options, comma separated"
                      className="flex-1 border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                    />
                  )}
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-1.5 bg-kool-red text-white px-4 py-2 rounded-sm text-sm font-semibold hover:bg-kool-crimson transition-colors"
                  >
                    <Plus className="w-4 h-4" /> add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-kool-red text-white px-6 py-3 rounded-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "saving..." : saved ? "saved!" : "save changes"}
          </button>
        </div>
      </main>
    </div>
  );
}

function QuestionRow({
  question,
  idx,
  total,
  onToggle,
  onToggleRequired,
  onUpdateLabel,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  question: RsvpQuestion;
  idx: number;
  total: number;
  onToggle: () => void;
  onToggleRequired: () => void;
  onUpdateLabel: (label: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove?: () => void;
}) {
  const [editingLabel, setEditingLabel] = useState(false);
  const [labelVal, setLabelVal] = useState(question.label);

  return (
    <div className={`px-6 py-4 ${!question.enabled ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Toggle */}
        <button
          type="button"
          onClick={onToggle}
          className={`mt-0.5 shrink-0 w-10 h-6 rounded-full transition-colors relative ${
            question.enabled ? "bg-kool-red" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
              question.enabled ? "left-5" : "left-1"
            }`}
          />
        </button>

        {/* Label & meta */}
        <div className="flex-1 min-w-0">
          {editingLabel ? (
            <input
              autoFocus
              value={labelVal}
              onChange={(e) => setLabelVal(e.target.value)}
              onBlur={() => { onUpdateLabel(labelVal); setEditingLabel(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") { onUpdateLabel(labelVal); setEditingLabel(false); } }}
              className="w-full text-sm font-medium border-b border-kool-red focus:outline-none pb-0.5 bg-transparent"
            />
          ) : (
            <p
              className="text-sm font-medium cursor-text hover:text-kool-red transition-colors"
              onClick={() => setEditingLabel(true)}
              title="click to edit"
            >
              {question.label}
            </p>
          )}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-sm">
              {TYPE_LABELS[question.type] || question.type}
            </span>
            <button
              type="button"
              onClick={onToggleRequired}
              className={`text-xs px-2 py-0.5 rounded-sm transition-colors ${
                question.required
                  ? "bg-kool-red/10 text-kool-red"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {question.required ? "required" : "optional"}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={idx === 0}
            className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
            title="move up"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={idx >= total - 1}
            className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-20 transition-colors"
            title="move down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
              title="remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewQuestion({ question }: { question: RsvpQuestion }) {
  const labelClass = "block text-xs font-semibold mb-1.5 text-gray-600";
  const inputClass = "w-full border border-gray-200 rounded-sm px-3 py-2 text-sm bg-gray-50 text-gray-400";

  return (
    <div>
      <label className={labelClass}>
        {question.label}
        {!question.required && <span className="font-normal text-gray-400 ml-1">(optional)</span>}
        {question.required && <span className="text-kool-red ml-1">*</span>}
      </label>
      {question.type === "textarea" && (
        <textarea rows={2} disabled placeholder="guest's answer..." className={`${inputClass} resize-none`} />
      )}
      {question.type === "text" && (
        <input disabled placeholder="guest's answer..." className={inputClass} />
      )}
      {(question.type === "yes-no" || question.type === "yes-no-with-name") && (
        <div className="flex gap-2">
          <div className="px-4 py-2 border border-gray-200 rounded-sm text-xs text-gray-400">yes</div>
          <div className="px-4 py-2 border border-gray-200 rounded-sm text-xs text-gray-400">no</div>
        </div>
      )}
      {question.type === "dropdown" && (
        <select disabled className={`${inputClass} bg-gray-50`}>
          <option>select an option</option>
          {question.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      )}
    </div>
  );
}
