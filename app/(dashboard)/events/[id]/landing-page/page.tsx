"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Plus, Trash2, Copy, Check, Globe, Lock, Eye, Upload, X } from "lucide-react";

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export default function LandingPageEditor({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [accentColor, setAccentColor] = useState("#D90000");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [savedSlug, setSavedSlug] = useState("");
  const [pendingImageUrl, setPendingImageUrl] = useState("");
  const hasLoaded = useRef(false);

  const supabase = createClient();

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      loadData(id);
    });
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!eventId) {
      setUploadError("please wait, loading...");
      return;
    }
    setUploading(true);
    setUploadError("");
    // Show preview immediately from local file
    const localPreview = URL.createObjectURL(file);
    setImageUrl(localPreview);
    setPendingImageUrl(localPreview);
    const ext = file.name.split(".").pop();
    const path = `event-heroes/${eventId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("event-assets").upload(path, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from("event-assets").getPublicUrl(path);
      setImageUrl(urlData.publicUrl); // replace local blob with permanent URL
      setPendingImageUrl(urlData.publicUrl);
    } else {
      setUploadError("upload failed: " + error.message);
      // keep local preview — pendingImageUrl already set to localPreview above
    }
    setUploading(false);
  }

  async function loadData(id: string) {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    // Try with accent_color first; fall back without it if column missing
    let result = await supabase.from("events").select(
      "name, slug, landing_description, landing_image_url, dress_code, is_public, agenda, accent_color"
    ).eq("id", id).single();
    if (result.error?.message?.includes("accent_color")) {
      result = await supabase.from("events").select(
        "name, slug, landing_description, landing_image_url, dress_code, is_public, agenda"
      ).eq("id", id).single();
    }
    const data = result.data;
    if (data) {
      setEventName(data.name || "");
      const loadedSlug = data.slug || "";
      setSlug(loadedSlug);
      setSavedSlug(loadedSlug);
      setDescription(data.landing_description || "");
      // Only set imageUrl from DB if not already set by a pending upload
      setImageUrl((prev) => prev || data.landing_image_url || "");
      setDressCode(data.dress_code || "");
      setIsPublic(data.is_public || false);
      setAccentColor((data as Record<string, string>).accent_color || "#D90000");
      setAgenda(Array.isArray(data.agenda) ? data.agenda : []);
    }
    setLoading(false);
  }

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function save() {
    setSaving(true);
    const imageToSave = pendingImageUrl || imageUrl || null;
    const updateData: Record<string, unknown> = {
      slug: slug || generateSlug(eventName),
      landing_description: description || null,
      landing_image_url: imageToSave,
      dress_code: dressCode || null,
      is_public: isPublic,
      agenda: agenda,
      accent_color: accentColor,
    };
    const { error: saveError } = await supabase.from("events").update(updateData).eq("id", eventId);
    if (saveError) {
      console.error("SAVE ERROR:", saveError.message, saveError.code);
      alert("save error: " + saveError.message);
    }
    setSaving(false);
    setSaved(!saveError);
    setSavedSlug(slug || generateSlug(eventName));
    setTimeout(() => setSaved(false), 2000);
  }

  function addAgendaItem() {
    setAgenda((prev) => [...prev, { time: "", title: "", description: "" }]);
  }

  function updateAgendaItem(index: number, field: keyof AgendaItem, value: string) {
    setAgenda((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  }

  function removeAgendaItem(index: number) {
    setAgenda((prev) => prev.filter((_, i) => i !== index));
  }

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : "https://koolevents.app"}/event/${slug}`;

  function copyUrl() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">loading...</div>
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
        <span className="text-sm font-medium text-gray-500">landing page</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">event landing page.</h1>
            <p className="text-gray-500 text-sm mt-1">customize the public page guests see when you share your event.</p>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-5 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            {saving ? "saving..." : saved ? "saved!" : "save changes"}
          </button>
        </div>

        {/* Visibility toggle */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPublic ? <Globe className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-gray-400" />}
              <div>
                <div className="font-semibold text-sm">{isPublic ? "public — anyone with the link can view" : "private — only you can view"}</div>
                <div className="text-xs text-gray-400 mt-0.5">toggle to make this page visible to guests</div>
              </div>
            </div>
            <button
              onClick={() => setIsPublic((p) => !p)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isPublic ? "bg-green-500" : "bg-gray-200"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isPublic ? "left-7" : "left-1"}`} />
            </button>
          </div>

          {isPublic && savedSlug && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
              <div className="flex-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-sm px-3 py-2 font-mono truncate">
                {`https://koolevents.app/event/${savedSlug}`}
              </div>
              <button
                onClick={copyUrl}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 border border-gray-200 rounded-sm hover:border-kool-black transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "copied!" : "copy link"}
              </button>
              <Link
                href={`/event/${savedSlug}`}
                target="_blank"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 border border-gray-200 rounded-sm hover:border-kool-black transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> preview
              </Link>
            </div>
          )}
        </div>

        {/* URL slug */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <h3 className="font-bold text-sm mb-4">page url</h3>
          <div className="flex items-center gap-0">
            <span className="text-sm text-gray-400 border border-gray-200 border-r-0 rounded-l-sm px-3 py-2 bg-gray-50">
              /event/
            </span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              className="flex-1 border border-gray-200 rounded-r-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
              placeholder="my-event-name"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">only lowercase letters, numbers, and hyphens</p>
        </div>

        {/* Hero image */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <h3 className="font-bold text-sm mb-4">hero image</h3>
          {imageUrl ? (
            <div className="relative rounded-sm overflow-hidden" style={{ height: "160px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="hero preview" className="w-full h-full object-cover" />
              <button
                onClick={() => { setImageUrl(""); setPendingImageUrl(""); }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-200 rounded-sm py-8 cursor-pointer hover:border-kool-red transition-colors">
              <Upload className="w-6 h-6 text-gray-300 mb-2" />
              <span className="text-sm text-gray-400">{uploading ? "uploading..." : "click to upload photo"}</span>
              <span className="text-xs text-gray-300 mt-1">jpg, png, webp — max 10mb</span>
              {uploadError && <span className="text-xs text-red-500 mt-2">{uploadError}</span>}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Description */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <h3 className="font-bold text-sm mb-4">event description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red resize-none"
            placeholder="tell your guests what to expect. keep it personal and warm."
          />
        </div>

        {/* Dress code */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <h3 className="font-bold text-sm mb-4">dress code</h3>
          <input
            value={dressCode}
            onChange={(e) => setDressCode(e.target.value)}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red"
            placeholder="e.g. black tie, cocktail attire, casual chic"
          />
        </div>

        {/* Agenda */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">agenda</h3>
            <button
              onClick={addAgendaItem}
              className="flex items-center gap-1.5 text-xs font-semibold text-kool-red border border-kool-red px-3 py-1.5 rounded-sm hover:bg-kool-red hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> add item
            </button>
          </div>
          {agenda.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">no agenda items yet. add some to show guests what to expect.</p>
          ) : (
            <div className="space-y-4">
              {agenda.map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-sm">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <input
                      value={item.time}
                      onChange={(e) => updateAgendaItem(i, "time", e.target.value)}
                      className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                      placeholder="7:00 pm"
                    />
                    <input
                      value={item.title}
                      onChange={(e) => updateAgendaItem(i, "title", e.target.value)}
                      className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                      placeholder="ceremony"
                    />
                    <input
                      value={item.description}
                      onChange={(e) => updateAgendaItem(i, "description", e.target.value)}
                      className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-kool-red bg-white"
                      placeholder="optional detail"
                    />
                  </div>
                  <button
                    onClick={() => removeAgendaItem(i)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accent color */}
        <div className="bg-white border border-gray-100 rounded-sm p-6 mb-8">
          <h3 className="font-bold text-sm mb-4">accent color</h3>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-12 h-12 rounded-sm border border-gray-200 cursor-pointer p-0.5"
            />
            <div>
              <div className="text-sm font-mono font-semibold">{accentColor}</div>
              <div className="text-xs text-gray-400 mt-0.5">kool red default · changes apply on public page</div>
            </div>
            <button
              onClick={() => setAccentColor("#D90000")}
              className="text-xs text-kool-red font-semibold hover:underline"
            >
              reset to kool red
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-kool-red text-white text-sm px-6 py-3 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            {saving ? "saving..." : saved ? "saved!" : "save changes"}
          </button>
          <Link
            href={isPublic ? `/event/${slug}` : "#"}
            target={isPublic ? "_blank" : undefined}
            onClick={isPublic ? undefined : (e) => e.preventDefault()}
            className={`flex items-center gap-2 text-sm px-6 py-3 rounded-sm transition-colors ${
              isPublic
                ? "bg-kool-red text-white hover:bg-kool-crimson"
                : "border border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
            title={isPublic ? "view live page" : "toggle public page first"}
          >
            <Eye className="w-4 h-4" /> go live
          </Link>
        </div>
      </main>
    </div>
  );
}
