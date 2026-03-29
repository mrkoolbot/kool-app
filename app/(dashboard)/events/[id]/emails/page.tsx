"use client";
import { KoolLogo } from "@/components/kool-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft, Mail, Clock, Users, Eye, Edit2, Save, X,
  AlertTriangle, Calendar, CheckCircle, Send
} from "lucide-react";
import {
  DEFAULT_EMAIL_SEQUENCES,
  getTriggerLabel,
  getAudienceLabel,
  type EmailSequenceItem,
} from "@/lib/email-sequences";

export default function EmailSequencesPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [sequences, setSequences] = useState<EmailSequenceItem[]>(DEFAULT_EMAIL_SEQUENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewItem, setPreviewItem] = useState<EmailSequenceItem | null>(null);
  const [editItem, setEditItem] = useState<EmailSequenceItem | null>(null);
  const [hasResendKey, setHasResendKey] = useState<boolean | null>(null);
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
    // Check if Resend key is configured (via a lightweight API ping)
    fetch("/api/check-resend").then((r) => setHasResendKey(r.ok)).catch(() => setHasResendKey(false));
  }, []);

  async function loadData(id: string) {
    const { data: event } = await supabase
      .from("events")
      .select("name, email_sequences")
      .eq("id", id)
      .single();
    if (event) {
      setEventName(event.name || "");
      if (event.email_sequences && Array.isArray(event.email_sequences) && event.email_sequences.length > 0) {
        // Merge saved config with defaults (to pick up any new sequences added to defaults)
        const savedMap = new Map<string, EmailSequenceItem>(
          (event.email_sequences as EmailSequenceItem[]).map((s) => [s.id, s])
        );
        const merged = DEFAULT_EMAIL_SEQUENCES.map((def) => savedMap.get(def.id) || def);
        setSequences(merged);
      }
    }
    setLoading(false);
  }

  async function save(seqs?: EmailSequenceItem[]) {
    setSaving(true);
    const toSave = seqs || sequences;
    await supabase.from("events").update({ email_sequences: toSave }).eq("id", eventId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleSequence(id: string) {
    setSequences((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }

  function updateTriggerValue(id: string, value: number) {
    setSequences((prev) => prev.map((s) => s.id === id ? { ...s, triggerValue: value } : s));
  }

  function applyEdit(updated: EmailSequenceItem) {
    const newSeqs = sequences.map((s) => s.id === updated.id ? updated : s);
    setSequences(newSeqs);
    setEditItem(null);
    save(newSeqs);
  }

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
        <KoolLogo size="sm" />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">email sequences</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">email sequences.</h1>
            <p className="text-gray-500 text-sm mt-1">
              {eventName && <span className="font-medium">{eventName} · </span>}
              {sequences.filter((s) => s.enabled).length} sequences active
            </p>
          </div>
          <button
            onClick={() => save()}
            disabled={saving}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "saving..." : saved ? "saved!" : "save changes"}
          </button>
        </div>

        {/* Resend key banner */}
        {hasResendKey === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">email sending not active</p>
              <p className="text-xs text-amber-700 mt-1">
                to activate email sending, add <code className="bg-amber-100 px-1 rounded">RESEND_API_KEY</code> to your environment variables.
                {" "}<a href="https://resend.com" target="_blank" className="underline">get a free Resend API key →</a>
              </p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="space-y-4">
          {sequences.map((seq, i) => (
            <div key={seq.id} className="relative">
              {/* Vertical line connector */}
              {i < sequences.length - 1 && (
                <div className="absolute left-5 top-16 bottom-0 w-px bg-gray-100 -mb-4 z-0" />
              )}

              <div className={`bg-white border rounded-sm p-5 relative z-10 transition-colors ${seq.enabled ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
                <div className="flex items-start gap-4">
                  {/* Icon & Toggle */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${seq.enabled ? "bg-kool-red/10" : "bg-gray-100"}`}>
                      <SequenceIcon seqId={seq.id} enabled={seq.enabled} />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSequence(seq.id)}
                      className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${seq.enabled ? "bg-kool-red" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${seq.enabled ? "left-4" : "left-0.5"}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-sm">{seq.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{seq.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setPreviewItem(seq)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-kool-black border border-gray-200 px-2.5 py-1.5 rounded-sm transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> preview
                        </button>
                        <button
                          onClick={() => setEditItem({ ...seq })}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-kool-black border border-gray-200 px-2.5 py-1.5 rounded-sm transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> edit
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {/* Trigger */}
                      <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-kool-red" />
                        {seq.triggerType !== "on_guest_added" ? (
                          <span className="flex items-center gap-1">
                            <input
                              type="number"
                              min={1}
                              max={365}
                              value={seq.triggerValue}
                              onChange={(e) => updateTriggerValue(seq.id, Number(e.target.value))}
                              className="w-12 border border-gray-200 rounded px-1 py-0.5 text-xs text-center focus:outline-none focus:border-kool-red"
                            />
                            {seq.triggerType === "days_before" ? "days before event" : "hours after event"}
                          </span>
                        ) : (
                          <span>when guest is added</span>
                        )}
                      </div>
                      {/* Audience */}
                      <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm text-gray-600">
                        <Users className="w-3.5 h-3.5 text-kool-red" />
                        {getAudienceLabel(seq.audience)}
                      </div>
                      {/* Subject preview */}
                      <div className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-sm text-gray-500 italic truncate max-w-xs">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{seq.subject}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => save()}
            disabled={saving}
            className="flex items-center gap-2 bg-kool-red text-white px-6 py-3 rounded-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "saving..." : saved ? "saved!" : "save changes"}
          </button>
        </div>
      </main>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPreviewItem(null)}>
          <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <p className="font-bold">{previewItem.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">subject: {previewItem.subject}</p>
              </div>
              <button onClick={() => setPreviewItem(null)} className="text-gray-400 hover:text-kool-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div
                className="border border-gray-100 rounded-sm overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: previewItem.bodyHtml
                    .replace(/{{guest_name}}/g, "Jane Smith")
                    .replace(/{{event_name}}/g, eventName || "Your Event")
                    .replace(/{{event_date}}/g, "Saturday, July 12, 2025")
                    .replace(/{{event_time_display}}/g, " at 7:00 PM")
                    .replace(/{{event_location_display}}/g, '<p style="color:#aaa;font-size:13px;margin:4px 0 0;">Grand Ballroom · Miami, FL</p>')
                    .replace(/{{rsvp_url}}/g, "#"),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <EditEmailModal
          item={editItem}
          onSave={applyEdit}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}

function SequenceIcon({ seqId, enabled }: { seqId: string; enabled: boolean }) {
  const color = enabled ? "text-kool-red" : "text-gray-400";
  if (seqId === "save_the_date") return <Calendar className={`w-5 h-5 ${color}`} />;
  if (seqId === "invitation") return <Send className={`w-5 h-5 ${color}`} />;
  if (seqId === "rsvp_reminder") return <Clock className={`w-5 h-5 ${color}`} />;
  if (seqId === "week_reminder") return <Calendar className={`w-5 h-5 ${color}`} />;
  if (seqId === "day_before") return <AlertTriangle className={`w-5 h-5 ${color}`} />;
  if (seqId === "thank_you") return <CheckCircle className={`w-5 h-5 ${color}`} />;
  return <Mail className={`w-5 h-5 ${color}`} />;
}

function EditEmailModal({
  item,
  onSave,
  onClose,
}: {
  item: EmailSequenceItem;
  onSave: (item: EmailSequenceItem) => void;
  onClose: () => void;
}) {
  const [subject, setSubject] = useState(item.subject);
  const [bodyHtml, setBodyHtml] = useState(item.bodyHtml);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <p className="font-bold">edit: {item.name}</p>
          <button onClick={onClose} className="text-gray-400 hover:text-kool-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-600">subject line</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
            />
            <p className="text-xs text-gray-400 mt-1">use {"{{event_name}}"}, {"{{guest_name}}"} as variables</p>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-600">email body (html)</label>
            <textarea
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
              rows={12}
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red font-mono resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              variables: {"{{guest_name}}"} {"{{event_name}}"} {"{{event_date}}"} {"{{event_time_display}}"} {"{{event_location_display}}"} {"{{rsvp_url}}"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-gray-100">
          <button
            onClick={() => onSave({ ...item, subject, bodyHtml })}
            className="flex items-center gap-2 bg-kool-red text-white px-5 py-2.5 rounded-sm font-semibold text-sm hover:bg-kool-crimson transition-colors"
          >
            <Save className="w-4 h-4" /> save changes
          </button>
          <button onClick={onClose} className="border border-gray-200 px-5 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
