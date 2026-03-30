"use client";
import { KoolLogo } from "@/components/kool-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft, Mail, Clock, Users, Eye, Edit2, Save, X,
  AlertTriangle, Calendar, CheckCircle, Send, Zap
} from "lucide-react";
import {
  DEFAULT_EMAIL_SEQUENCES,
  getTriggerLabel,
  getAudienceLabel,
  type EmailSequenceItem,
} from "@/lib/email-sequences";

const sequenceLabels: Record<string, string> = {
  save_the_date: "save the date",
  invitation: "formal invitation",
  rsvp_reminder: "RSVP reminder",
  week_reminder: "1-week reminder",
  day_before: "day-before reminder",
  thank_you: "post-event thank you",
};

function formatEventDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    // dateStr is typically "YYYY-MM-DD"
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

function formatEventTime(timeStr: string): string {
  if (!timeStr) return "";
  try {
    // timeStr is typically "HH:MM" or "HH:MM:SS"
    const [hourStr, minStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const min = minStr || "00";
    const ampm = hour >= 12 ? "pm" : "am";
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    return min === "00" ? `${hour}:00 ${ampm}` : `${hour}:${min} ${ampm}`;
  } catch {
    return timeStr;
  }
}

function buildPreviewHtml(sequenceId: string, event: any, eventId: string): string {
  // Find the sequence template
  const seq = DEFAULT_EMAIL_SEQUENCES.find((s) => s.id === sequenceId);
  if (!seq) return "<p>Template not found.</p>";

  const guestName = "your guest";
  const eventName = event.name || "your event";
  const eventDate = formatEventDate(event.event_date);
  const eventTime = event.event_time ? formatEventTime(event.event_time) : "";
  const timeDisplay = eventTime ? ` at ${eventTime}` : "";
  const venueName = event.venue_name || "";
  const location = event.location || "";
  const dresscode = event.dress_code || "";
  const rsvpUrl = `https://koolevents.app/rsvp/${eventId}`;
  const accentColor = event.accent_color || "#D90000";
  const heroImageUrl = event.landing_image_url || null;
  const landingPageUrl = event.slug ? `https://koolevents.app/event/${event.slug}` : null;

  let locationLine = "";
  if (venueName && location) {
    locationLine = `${venueName} · ${location}`;
  } else if (venueName) {
    locationLine = venueName;
  } else if (location) {
    locationLine = location;
  }

  const locationDisplay = locationLine
    ? `<p style="color:#aaa;font-size:13px;margin:4px 0 0;">${locationLine}</p>`
    : "";

  const dresscodeDisplay = dresscode
    ? `<p style="color:#aaa;font-size:13px;margin:4px 0 0;">dress code: ${dresscode}</p>`
    : "";

  let html = seq.bodyHtml;
  html = html.replace(/\{\{guest_name\}\}/g, guestName);
  html = html.replace(/\{\{event_name\}\}/g, eventName);
  html = html.replace(/\{\{event_date\}\}/g, eventDate);
  html = html.replace(/\{\{event_time_display\}\}/g, timeDisplay);
  html = html.replace(/\{\{event_location_display\}\}/g, locationDisplay + dresscodeDisplay);
  html = html.replace(/\{\{rsvp_url\}\}/g, rsvpUrl);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .email-wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
  .email-header { background: #0a0a0a; padding: 24px 32px; }

  .email-body { padding: 0; }
  .email-footer { background: #0a0a0a; padding: 16px 32px; text-align: center; }
  .email-footer p { color: #666; font-size: 11px; margin: 0; }
  .email-footer a { color: ${accentColor}; text-decoration: none; }
</style>
</head>
<body>
<div class="email-wrapper">
  <div class="email-header">
    <img src="https://koolevents.app/kool-logo-official-v2.svg" alt="kool events" width="140" height="70" style="display:inline-block;border:0;" />
  </div>
  ${heroImageUrl ? `
  <div style="width:100%;max-height:280px;overflow:hidden;">
    <img src="${heroImageUrl}" alt="${eventName}" style="width:100%;height:280px;object-fit:cover;display:block;" />
  </div>` : ""}
  <div class="email-body">
    ${html}
    ${landingPageUrl ? `
    <p style="text-align:center;margin:0 0 24px;">
      <a href="${landingPageUrl}" style="color:${accentColor};font-size:13px;text-decoration:none;">view event page →</a>
    </p>` : ""}
  </div>
  <div style="height:3px;background:${accentColor};"></div>
  <div class="email-footer">
    <p>powered by <a href="https://koolevents.app">the koolture group (TKG)</a> · all rights reserved</p>
  </div>
</div>
</body>
</html>`;
}

export default function EmailSequencesPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [event, setEvent] = useState<any>(null);
  const [sequences, setSequences] = useState<EmailSequenceItem[]>(DEFAULT_EMAIL_SEQUENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewSeq, setPreviewSeq] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<EmailSequenceItem | null>(null);
  const [sendModal, setSendModal] = useState<EmailSequenceItem | null>(null);
  const [sendHistory, setSendHistory] = useState<Record<string, number>>({});
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);
  const [togglingAutoSend, setTogglingAutoSend] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
  }, []);

  async function loadData(id: string) {
    const { data: eventData } = await supabase
      .from("events")
      .select("name, email_sequences, event_date, event_time, location, venue_name, dress_code, accent_color, landing_image_url, slug, auto_send_invitation")
      .eq("id", id)
      .single();
    if (eventData) {
      setEventName(eventData.name || "");
      setEvent(eventData);
      setAutoSendEnabled(!!eventData.auto_send_invitation);
      if (eventData.email_sequences && Array.isArray(eventData.email_sequences) && eventData.email_sequences.length > 0) {
        const savedMap = new Map<string, EmailSequenceItem>(
          (eventData.email_sequences as EmailSequenceItem[]).map((s) => [s.id, s])
        );
        const merged = DEFAULT_EMAIL_SEQUENCES.map((def) => savedMap.get(def.id) || def);
        setSequences(merged);
      }
    }

    // Load send history counts
    const { data: sends } = await supabase
      .from("email_sends")
      .select("sequence_id")
      .eq("event_id", id);
    if (sends) {
      const counts: Record<string, number> = {};
      for (const row of sends) {
        counts[row.sequence_id] = (counts[row.sequence_id] || 0) + 1;
      }
      setSendHistory(counts);
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

  async function toggleAutoSend() {
    setTogglingAutoSend(true);
    const newVal = !autoSendEnabled;
    setAutoSendEnabled(newVal);
    await supabase.from("events").update({ auto_send_invitation: newVal }).eq("id", eventId);
    setTogglingAutoSend(false);
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
        <KoolLogo size="sm" inverted={true} />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">email sequences</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">email sequences</h1>
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

        {/* Event Branding Status Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {event?.accent_color && (
              <div className="w-5 h-5 rounded-full border border-gray-200 shrink-0" style={{ background: event.accent_color }} />
            )}
            {event?.landing_image_url && (
              <img src={event.landing_image_url} alt="" className="w-10 h-7 object-cover rounded-sm shrink-0" />
            )}
            <div>
              <p className="text-sm font-semibold">
                {event?.accent_color || event?.landing_image_url ? "event branding active" : "no event branding set"}
              </p>
              <p className="text-xs text-gray-400">
                {event?.accent_color || event?.landing_image_url
                  ? "your emails will match your landing page"
                  : "set colors and hero image on the landing page tab"}
              </p>
            </div>
          </div>
          <Link href={`/events/${eventId}/landing-page`} className="text-xs text-kool-red hover:underline shrink-0">
            edit branding →
          </Link>
        </div>

        {/* Auto-send toggle */}
        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">auto-send invitation when guest is added</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {autoSendEnabled
                  ? "guests receive the invitation email automatically when added"
                  : "off — you control when invitations go out"}
              </p>
            </div>
            <button
              onClick={() => toggleAutoSend()}
              disabled={togglingAutoSend}
              className={`relative w-12 h-6 rounded-full transition-colors disabled:opacity-60 ${autoSendEnabled ? "bg-kool-red" : "bg-gray-200"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoSendEnabled ? "left-7" : "left-1"}`} />
            </button>
          </div>
        </div>

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
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm">{seq.name}</p>
                          {sendHistory[seq.id] ? (
                            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                              sent {sendHistory[seq.id]}×
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{seq.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setPreviewSeq(seq.id)}
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
                        {seq.enabled && (
                          <button
                            onClick={() => setSendModal(seq)}
                            className="flex items-center gap-1 text-xs bg-kool-red text-white px-2.5 py-1.5 rounded-sm hover:bg-kool-crimson transition-colors font-semibold"
                          >
                            <Zap className="w-3.5 h-3.5" /> send now
                          </button>
                        )}
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

        <p className="text-xs text-gray-400 text-center mt-8">
          email sending is optional — use KOOL for event management only if you prefer to send invitations through your own email.
        </p>
      </main>

      {/* Preview Modal */}
      {previewSeq && event && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPreviewSeq(null)}>
          <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-sm">email preview</h2>
                <p className="text-xs text-gray-400 mt-0.5">{sequenceLabels[previewSeq] ?? previewSeq} · as seen by your guests</p>
              </div>
              <button onClick={() => setPreviewSeq(null)} className="text-gray-400 hover:text-kool-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
              <iframe
                srcDoc={buildPreviewHtml(previewSeq, event, eventId)}
                className="w-full rounded-sm border border-gray-200"
                style={{ minHeight: "600px", background: "white" }}
                title="email preview"
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400">this is exactly what your guests will receive</p>
              <button
                onClick={() => setPreviewSeq(null)}
                className="text-sm bg-kool-red text-white px-4 py-2 rounded-sm hover:bg-kool-crimson"
              >
                close preview
              </button>
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

      {/* Send Now Modal (3-step) */}
      {sendModal && event && (
        <SendNowModal
          item={sendModal}
          eventId={eventId}
          event={event}
          onClose={() => setSendModal(null)}
          onSent={(seqId) => {
            setSendHistory((prev) => ({ ...prev, [seqId]: (prev[seqId] || 0) + 1 }));
            setSendModal(null);
          }}
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

function SendNowModal({
  item,
  eventId,
  event,
  onClose,
  onSent,
}: {
  item: EmailSequenceItem;
  eventId: string;
  event: any;
  onClose: () => void;
  onSent: (seqId: string) => void;
}) {
  const [sendStep, setSendStep] = useState<0 | 1 | 2 | 3>(1);
  const [customSubject, setCustomSubject] = useState(item.subject);
  const [customMessage, setCustomMessage] = useState("");
  const [recipientType, setRecipientType] = useState<"all" | "not_responded" | "confirmed">("all");
  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({ all: 0, not_responded: 0, confirmed: 0 });
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; total: number } | null>(null);
  const [error, setError] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchCounts() {
      const { data: all } = await supabase.from("guests").select("id, email, rsvp_status").eq("event_id", eventId);
      if (all) {
        const withEmail = all.filter((g: any) => g.email);
        setGuestCounts({
          all: withEmail.length,
          not_responded: withEmail.filter((g: any) => !g.rsvp_status || g.rsvp_status === "pending").length,
          confirmed: withEmail.filter((g: any) => g.rsvp_status === "attending").length,
        });
      }
      setLoadingCounts(false);
    }
    fetchCounts();
  }, [eventId]);

  const previewHtml = buildPreviewHtml(item.id, event, eventId);

  async function handleSend() {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          sequenceId: item.id,
          recipientType,
          overrideSubject: customSubject !== item.subject ? customSubject : undefined,
          overrideMessage: customMessage || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "something went wrong");
      } else {
        setResult(data);
        setTimeout(() => onSent(item.id), 2000);
      }
    } catch {
      setError("network error — please try again");
    } finally {
      setSending(false);
    }
  }

  const stepLabels = ["", "customize", "preview", "send"];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-white rounded-sm w-full flex flex-col ${sendStep === 2 ? "max-w-2xl max-h-[90vh]" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-sm">send now · {item.name}</p>
            {!result && (
              <div className="flex items-center gap-1.5 mt-1.5">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      sendStep === s ? "bg-kool-red text-white" : sendStep > s ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}>{sendStep > s ? "✓" : s}</div>
                    <span className={`text-[10px] ${sendStep === s ? "text-kool-red font-semibold" : "text-gray-400"}`}>{stepLabels[s]}</span>
                    {s < 3 && <div className="w-4 h-px bg-gray-200" />}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-kool-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step content */}
        {result ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-bold text-lg">sent to {result.sent} guests ✅</p>
            {result.total > result.sent && (
              <p className="text-xs text-gray-400 mt-1">{result.total - result.sent} guests had no email address</p>
            )}
          </div>
        ) : sendStep === 1 ? (
          /* Step 1: Customize */
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-600">subject line</label>
              <input
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
                placeholder="email subject..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-600">
                personal message <span className="text-gray-400 font-normal">(optional — appears above the email body)</span>
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red resize-none"
                placeholder="add a personal note to your guests..."
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setSendStep(2)}
                disabled={!customSubject.trim()}
                className="flex-1 bg-kool-red text-white py-2.5 rounded-sm font-bold text-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
              >
                next: preview →
              </button>
              <button onClick={onClose} className="border border-gray-200 px-5 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
                cancel
              </button>
            </div>
          </div>
        ) : sendStep === 2 ? (
          /* Step 2: Preview */
          <>
            <div className="overflow-y-auto flex-1 p-4 bg-gray-50">
              <iframe
                srcDoc={previewHtml}
                className="w-full rounded-sm border border-gray-200"
                style={{ minHeight: "500px", background: "white" }}
                title="email preview"
              />
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setSendStep(1)} className="border border-gray-200 px-5 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
                ← back
              </button>
              <button
                onClick={() => setSendStep(3)}
                className="flex-1 bg-kool-red text-white py-2.5 rounded-sm font-bold text-sm hover:bg-kool-crimson transition-colors"
              >
                next: choose recipients →
              </button>
            </div>
          </>
        ) : sendStep === 3 ? (
          /* Step 3: Send */
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2 text-gray-600">send to</label>
              <div className="space-y-2">
                {(["all", "not_responded", "confirmed"] as const).map((type) => {
                  const labels: Record<string, string> = {
                    all: "all guests",
                    not_responded: "haven't responded",
                    confirmed: "confirmed / attending",
                  };
                  return (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${recipientType === type ? "border-kool-red" : "border-gray-300 group-hover:border-gray-400"}`}>
                        {recipientType === type && <div className="w-2 h-2 rounded-full bg-kool-red" />}
                      </div>
                      <input type="radio" className="sr-only" checked={recipientType === type} onChange={() => setRecipientType(type)} />
                      <span className="text-sm text-gray-700 flex-1">{labels[type]}</span>
                      <span className="text-xs text-gray-400 font-medium">
                        {loadingCounts ? "..." : `${guestCounts[type]} with email`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-sm px-3 py-2">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button onClick={() => setSendStep(2)} className="border border-gray-200 px-4 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
                ← back
              </button>
              <button
                onClick={handleSend}
                disabled={sending || guestCounts[recipientType] === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-kool-red text-white py-2.5 rounded-sm font-bold text-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                {sending ? "sending..." : `send to ${loadingCounts ? "..." : guestCounts[recipientType]} guests`}
              </button>
              <button onClick={onClose} className="border border-gray-200 px-4 py-2.5 rounded-sm text-sm hover:border-gray-400 transition-colors">
                cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
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
