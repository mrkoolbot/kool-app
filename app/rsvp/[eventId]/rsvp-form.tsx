"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface RsvpQuestion {
  id: string;
  label: string;
  type: "textarea" | "yes-no" | "yes-no-with-name" | "text" | "dropdown";
  enabled: boolean;
  required: boolean;
  options?: string[];
}

const DEFAULT_QUESTIONS: RsvpQuestion[] = [
  { id: "dietary", label: "do you have any food allergies or dietary restrictions?", type: "textarea", enabled: true, required: false },
  { id: "parking", label: "will you need parking?", type: "yes-no", enabled: true, required: false },
  { id: "ada", label: "do you need any ADA arrangements or special accommodations?", type: "textarea", enabled: true, required: false },
  { id: "plus_one", label: "will you be bringing a guest?", type: "yes-no-with-name", enabled: true, required: false },
];

export default function RSVPForm({
  eventId,
  rsvpQuestions,
}: {
  eventId: string;
  rsvpQuestions?: RsvpQuestion[] | null;
}) {
  const questions: RsvpQuestion[] = rsvpQuestions && rsvpQuestions.length > 0 ? rsvpQuestions : DEFAULT_QUESTIONS;
  const enabledQuestions = questions.filter((q) => q.enabled);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    rsvp_status: "attending" as "attending" | "declined" | "maybe",
    notes: "",
  });

  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [plusOneName, setPlusOneName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  function setAnswer(id: string, value: string | boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const plusOneQ = enabledQuestions.find((q) => q.type === "yes-no-with-name");
    const plusOneAttending = plusOneQ ? answers[plusOneQ.id] === true : false;

    const insertData: Record<string, unknown> = {
      event_id: eventId,
      first_name: form.first_name,
      last_name: form.last_name || null,
      email: form.email || null,
      rsvp_status: form.rsvp_status,
      plus_one: plusOneAttending,
      plus_one_name: plusOneAttending ? plusOneName || null : null,
      plus_one_attending: plusOneAttending,
      rsvp_answers: answers,
      notes: form.notes || null,
      responded_at: new Date().toISOString(),
    };

    // Also map dietary to legacy column for backwards compat
    const dietaryQ = enabledQuestions.find((q) => q.id === "dietary");
    if (dietaryQ && answers[dietaryQ.id]) {
      insertData.dietary_restrictions = answers[dietaryQ.id] as string;
    }

    const { error: insertError } = await supabase.from("guests").insert(insertData);
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{"✓"}</div>
        <h3 className="text-xl font-black mb-2">
          {form.rsvp_status === "attending"
            ? "you're in!"
            : form.rsvp_status === "maybe"
            ? "got it."
            : "we'll miss you."}
        </h3>
        <p className="text-gray-500 text-sm">
          {form.rsvp_status === "attending"
            ? "we can't wait to celebrate with you."
            : form.rsvp_status === "maybe"
            ? "thanks for letting us know. we hope you can make it!"
            : "thanks for letting us know."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-600">first name *</label>
          <input
            required
            value={form.first_name}
            onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-gray-600">last name</label>
          <input
            value={form.last_name}
            onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
            className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-600">email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red"
        />
      </div>

      {/* RSVP choice */}
      <div>
        <label className="block text-xs font-semibold mb-3 text-gray-600">will you attend? *</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "attending", label: "yes, i'll be there" },
            { value: "maybe", label: "maybe" },
            { value: "declined", label: "can't make it" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((p) => ({ ...p, rsvp_status: opt.value as "attending" | "declined" | "maybe" }))}
              className={`px-3 py-3 rounded-sm text-xs font-semibold text-center transition-colors border ${
                form.rsvp_status === opt.value
                  ? "bg-kool-red text-white border-kool-red"
                  : "border-gray-200 text-gray-600 hover:border-kool-black"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic questions — show for attending/maybe */}
      {form.rsvp_status !== "declined" && enabledQuestions.length > 0 && (
        <div className="space-y-4 pt-1">
          <div className="border-t border-gray-100 pt-4" />
          {enabledQuestions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers[q.id]}
              plusOneName={q.type === "yes-no-with-name" ? plusOneName : ""}
              onChange={(val) => setAnswer(q.id, val)}
              onPlusOneNameChange={(name) => setPlusOneName(name)}
            />
          ))}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-gray-600">
          message <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          rows={2}
          placeholder="leave a message for the host..."
          className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-kool-red text-white py-3.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50"
      >
        {loading ? "sending..." : "submit rsvp"}
      </button>
    </form>
  );
}

function QuestionField({
  question,
  value,
  plusOneName,
  onChange,
  onPlusOneNameChange,
}: {
  question: RsvpQuestion;
  value: string | boolean | undefined;
  plusOneName: string;
  onChange: (val: string | boolean) => void;
  onPlusOneNameChange: (name: string) => void;
}) {
  const labelClass = "block text-xs font-semibold mb-1.5 text-gray-600";
  const inputClass = "w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red";
  const radioBtn = (checked: boolean, label: string, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-sm text-xs font-semibold border transition-colors ${
        checked ? "bg-kool-red text-white border-kool-red" : "border-gray-200 text-gray-600 hover:border-kool-black"
      }`}
    >
      {label}
    </button>
  );

  if (question.type === "textarea") {
    return (
      <div>
        <label className={labelClass}>
          {question.label}
          {!question.required && <span className="font-normal text-gray-400 ml-1">(optional)</span>}
        </label>
        <textarea
          required={question.required}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div>
        <label className={labelClass}>
          {question.label}
          {!question.required && <span className="font-normal text-gray-400 ml-1">(optional)</span>}
        </label>
        <input
          required={question.required}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  if (question.type === "yes-no") {
    return (
      <div>
        <label className={labelClass}>{question.label}</label>
        <div className="flex gap-2">
          {radioBtn(value === true, "yes", () => onChange(true))}
          {radioBtn(value === false, "no", () => onChange(false))}
        </div>
      </div>
    );
  }

  if (question.type === "yes-no-with-name") {
    const isYes = value === true;
    return (
      <div className="space-y-3">
        <div>
          <label className={labelClass}>{question.label}</label>
          <div className="flex gap-2">
            {radioBtn(isYes, "yes", () => onChange(true))}
            {radioBtn(value === false, "no", () => onChange(false))}
          </div>
        </div>
        {isYes && (
          <div>
            <label className={labelClass}>
              +1 name <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              value={plusOneName}
              onChange={(e) => onPlusOneNameChange(e.target.value)}
              placeholder="guest's name"
              className={inputClass}
            />
          </div>
        )}
      </div>
    );
  }

  if (question.type === "dropdown" && question.options) {
    return (
      <div>
        <label className={labelClass}>
          {question.label}
          {!question.required && <span className="font-normal text-gray-400 ml-1">(optional)</span>}
        </label>
        <select
          required={question.required}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} bg-white`}
        >
          <option value="">select an option</option>
          {question.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return null;
}
