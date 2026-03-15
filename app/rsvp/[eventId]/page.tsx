import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import RSVPForm from "./rsvp-form";

export default async function RSVPPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase.from("events").select("*").eq("id", eventId).eq("is_public", true).single();
  if (!event) notFound();

  const { count } = await supabase.from("guests").select("*", { count: "exact", head: true })
    .eq("event_id", eventId).eq("rsvp_status", "attending");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Event card */}
        <div className="bg-kool-black text-white rounded-sm p-8 mb-6 text-center">
          <p className="text-kool-red text-xs font-bold tracking-[0.3em] uppercase mb-3">
            {event.event_type.replace(/_/g, " ")}
          </p>
          <h1 className="text-3xl font-black tracking-tight mb-4">{event.name}</h1>
          {event.event_date && (
            <p className="text-white/70 text-sm mb-2">{formatDate(event.event_date)}</p>
          )}
          {event.event_time && (
            <p className="text-white/50 text-sm mb-2">{event.event_time}</p>
          )}
          {event.location && (
            <p className="text-white/50 text-sm">{event.venue_name ? `${event.venue_name} · ` : ""}{event.location}</p>
          )}
          {count !== null && count !== undefined && count > 0 && (
            <p className="text-kool-red text-xs font-bold mt-4">{count} {count === 1 ? "person" : "people"} attending</p>
          )}
        </div>

        {/* RSVP Form */}
        <div className="bg-white border border-gray-100 rounded-sm p-8">
          <h2 className="text-xl font-black mb-6">will you be joining us?</h2>
          <RSVPForm eventId={eventId} />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          powered by <a href="/" className="text-kool-red font-semibold hover:underline">kool.</a>
          {" "}&nbsp; event planning by paula mescolin
        </p>
      </div>
    </div>
  );
}
