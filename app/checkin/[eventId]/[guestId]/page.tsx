"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, Calendar, MapPin, AlertCircle } from "lucide-react";
import { KoolLogo } from "@/components/kool-logo";
import Link from "next/link";

export default function GuestCheckinPage({ params }: { params: Promise<{ eventId: string; guestId: string }> }) {
  const [status, setStatus] = useState<"loading" | "success" | "already" | "error">("loading");
  const [guestName, setGuestName] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const supabase = createClient();

  useEffect(() => {
    params.then(({ eventId, guestId }) => {
      handleCheckin(eventId, guestId);
    });
  }, []);

  async function handleCheckin(eventId: string, guestId: string) {
    try {
      // Fetch event info (public)
      const { data: event } = await supabase
        .from("events")
        .select("name, event_date, location, venue_name, is_public")
        .eq("id", eventId)
        .single();

      if (!event) {
        setStatus("error");
        return;
      }

      setEventName(event.name || "");
      setEventDate(event.event_date || "");
      setEventLocation(event.venue_name ? `${event.venue_name} · ${event.location || ""}` : (event.location || ""));

      // Fetch guest
      const { data: guest } = await supabase
        .from("guests")
        .select("id, first_name, last_name, checked_in, checked_in_at, event_id")
        .eq("id", guestId)
        .eq("event_id", eventId)
        .single();

      if (!guest) {
        setStatus("error");
        return;
      }

      const name = `${guest.first_name}${guest.last_name ? " " + guest.last_name : ""}`;
      setGuestName(name);

      if (guest.checked_in) {
        setStatus("already");
        return;
      }

      // Check them in
      const { error } = await supabase
        .from("guests")
        .update({ checked_in: true, checked_in_at: new Date().toISOString() })
        .eq("id", guestId);

      if (error) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <KoolLogo />
        </div>

        {status === "loading" && (
          <div className="bg-white border border-gray-100 rounded-sm p-10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-kool-red border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500 text-sm">checking you in...</p>
          </div>
        )}

        {(status === "success" || status === "already") && (
          <div className="bg-white border border-gray-100 rounded-sm p-8 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
              status === "success" ? "bg-green-50" : "bg-kool-red/10"
            }`}>
              <Check className={`w-8 h-8 ${status === "success" ? "text-green-600" : "text-kool-red"}`} />
            </div>

            <h1 className="text-2xl font-black tracking-tight mb-1">
              {status === "success" ? "welcome!" : "already checked in."}
            </h1>
            {guestName && (
              <p className={`text-sm font-medium mb-5 ${status === "success" ? "text-kool-red" : "text-gray-500"}`}>
                {guestName}
              </p>
            )}

            {eventName && (
              <div className="bg-kool-black rounded-sm p-5 text-left mb-5">
                <p className="text-kool-red text-xs font-bold tracking-widest mb-2">event</p>
                <p className="text-white font-black text-lg">{eventName}</p>
                {eventDate && (
                  <div className="flex items-center gap-2 mt-2 text-white/60 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(eventDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </div>
                )}
                {eventLocation && (
                  <div className="flex items-center gap-2 mt-1.5 text-white/60 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {eventLocation}
                  </div>
                )}
              </div>
            )}

            <p className="text-gray-500 text-sm">
              {status === "success"
                ? "you're all set. enjoy the event!"
                : "you've already been checked in. enjoy!"}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-white border border-gray-100 rounded-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-2">oops.</h1>
            <p className="text-gray-500 text-sm">we couldn't find that check-in link. please contact the event organizer.</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          powered by{" "}
          <Link href="/" className="text-kool-red font-semibold hover:underline">kool.</Link>
          {" "}by the koolture group
        </p>
      </div>
    </div>
  );
}
