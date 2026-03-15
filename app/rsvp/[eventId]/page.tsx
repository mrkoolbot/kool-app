import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import RSVPForm from "./rsvp-form";

export default async function RSVPPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", eventId).eq("is_public", true).single();

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h1 className="text-2xl font-black mb-2">event not found.</h1>
          <p className="text-gray-500">this rsvp link may be invalid or the event is private.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Event hero */}
      <div className="bg-kool-black text-white px-6 py-16 text-center">
        <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-4">
          {event.event_type.replace(/_/g, " ")}
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{event.name}</h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
          {event.event_date && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(event.event_date)}
              {event.event_time && ` · ${event.event_time}`}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.venue_name ? `${event.venue_name} · ` : ""}{event.location}
            </span>
          )}
        </div>
        {event.description && (
          <p className="text-white/50 max-w-lg mx-auto mt-6 leading-relaxed">{event.description}</p>
        )}
      </div>

      {/* RSVP form */}
      <div className="max-w-lg mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-center mb-2">will you be joining us?</h2>
        <p className="text-gray-500 text-center text-sm mb-10">please rsvp below so we can plan accordingly.</p>
        <RSVPForm eventId={eventId} />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-8 text-center">
        <p className="text-gray-400 text-xs">
          rsvp powered by{" "}
          <a href="/" className="font-bold text-kool-black hover:text-kool-red transition-colors">kool</a>
          {" · "}
          <a href="https://www.thekoolturegroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-kool-red transition-colors">the koolture group</a>
        </p>
      </div>
    </div>
  );
}
