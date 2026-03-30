import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Shirt } from "lucide-react";

interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export default async function PublicEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();

  if (!event) notFound();

  const agenda: AgendaItem[] = Array.isArray(event.agenda) ? event.agenda : [];
  const accent = event.accent_color || "#D90000";

  function formatEventDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }

  function formatEventTime(timeStr: string) {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff", fontFamily: "var(--font-galano, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif)" }}>
      {/* Hero */}
      <div className="relative">
        {event.landing_image_url ? (
          <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.landing_image_url}
              alt={event.name}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 60%, rgba(255,255,255,1) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-12 md:pb-14">
              <HeroContent event={event} formatEventDate={formatEventDate} formatEventTime={formatEventTime} accent={accent} />
            </div>
          </div>
        ) : (
          <div className="px-6 pt-16 pb-10 md:px-12 md:pt-20 md:pb-14" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <HeroContent event={event} formatEventDate={formatEventDate} formatEventTime={formatEventTime} accent={accent} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-12 md:px-8">
        {/* RSVP CTA */}
        <div className="mb-12 text-center">
          <Link
            href={`/rsvp/${event.id}`}
            className="inline-block text-white font-bold text-base px-10 py-4 rounded-sm transition-colors hover:opacity-80"
            style={{ backgroundColor: accent }}
          >
            rsvp now →
          </Link>
          <p className="text-sm mt-3" style={{ color: "#888888" }}>let us know if you can make it</p>
        </div>

        {/* Description */}
        {event.landing_description && (
          <section className="mb-10">
            <h2 className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: accent }}>about this event</h2>
            <p className="text-base leading-relaxed" style={{ color: "#333333" }}>
              {event.landing_description}
            </p>
          </section>
        )}

        {/* Details grid */}
        <section className="mb-10 p-6 rounded-sm" style={{ backgroundColor: "#f8f8f8", border: "1px solid #eeeeee" }}>
          <div className="space-y-4">
            {event.event_date && (
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{formatEventDate(event.event_date)}</div>
                  {event.event_time && (
                    <div className="text-sm mt-0.5" style={{ color: "#666666" }}>{formatEventTime(event.event_time)}</div>
                  )}
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                <div>
                  {event.venue_name && <div className="text-sm font-semibold text-gray-900">{event.venue_name}</div>}
                  <div className="text-sm" style={{ color: event.venue_name ? "#666666" : "#111111" }}>{event.location}</div>
                </div>
              </div>
            )}
            {event.dress_code && (
              <div className="flex items-start gap-3">
                <Shirt className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#666666" }}>dress code</div>
                  <div className="text-sm text-gray-900">{event.dress_code}</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Agenda */}
        {agenda.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-bold tracking-[0.2em] mb-6" style={{ color: accent }}>agenda</h2>
            <div className="space-y-4">
              {agenda.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-16 text-right">
                    <span className="text-xs font-semibold" style={{ color: "#888888" }}>{item.time}</span>
                  </div>
                  <div className="flex gap-3 flex-1">
                    <div className="flex flex-col items-center">
                      <div className="w-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />
                      <div className="w-2 h-2 rounded-full shrink-0 my-1" style={{ backgroundColor: accent }} />
                      {i < agenda.length - 1 && <div className="w-px flex-1" style={{ backgroundColor: "#e5e5e5" }} />}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      {item.description && (
                        <div className="text-xs mt-1" style={{ color: "#555555" }}>{item.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom RSVP */}
        <div className="text-center py-8" style={{ borderTop: "1px solid #eeeeee" }}>
          <Link
            href={`/rsvp/${event.id}`}
            className="inline-block text-white font-bold text-base px-10 py-4 rounded-sm transition-colors"
            style={{ backgroundColor: accent }}
          >
            rsvp now →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10" style={{ borderTop: "1px solid #eeeeee" }}>
        <a href="https://koolevents.app" className="inline-block opacity-40 hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="140" height="70" aria-label="kool events">
            <text fontFamily="GalanoGrotesque-Bold, 'Galano Grotesque', Arial Black, sans-serif" fontSize="110" fontWeight="700" fill="#ffffff" transform="translate(82 125.9)"><tspan x="0" y="0">kool</tspan></text>
            <path fill="#d90000" d="M200,100s8.2-11,14.86-11c3.07,0,5.64,2.5,5.64,5.5,0,2.3-1.43,4.3-3.49,5.5,2.05,1.2,3.49,3.2,3.49,5.5,0,3-2.56,5.5-5.64,5.5-6.66,0-14.86-11-14.86-11Z"/>
            <text fontFamily="GalanoGrotesque-Medium, 'Galano Grotesque', Arial, sans-serif" fontSize="21" fontWeight="500" letterSpacing="29" fill="#ffffff" transform="translate(88.38 151.94) scale(.99 1)"><tspan x="0" y="0">events</tspan></text>
          </svg>
        </a>
        <p className="text-xs mt-3" style={{ color: "#333333" }}>intellectual property of the koolture group (TKG). intellectual property of the koolture group (TKG). all rights reserved..</p>
      </footer>
    </div>
  );
}

interface HeroEvent {
  event_type?: string;
  name: string;
  event_date?: string;
  event_time?: string;
  location?: string;
  venue_name?: string;
}

function HeroContent({ event, formatEventDate, formatEventTime, accent }: {
  event: HeroEvent;
  formatEventDate: (d: string) => string;
  formatEventTime: (t: string) => string;
  accent: string;
}) {
  return (
    <>
      <div className="text-xs font-bold tracking-[0.2em] mb-3 lowercase" style={{ color: accent }}>
        {(event.event_type || "").replace(/_/g, " ")}
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-4">
        {event.name}
      </h1>
      <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#aaaaaa" }}>
        {event.event_date ? (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: accent }} />
            {formatEventDate(event.event_date)}
            {event.event_time ? ` · ${formatEventTime(event.event_time)}` : null}
          </span>
        ) : null}
        {event.location ? (
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
            {event.venue_name ? event.venue_name : event.location}
          </span>
        ) : null}
      </div>
    </>
  );
}
