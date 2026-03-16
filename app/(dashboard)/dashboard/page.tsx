import { KoolLogo } from "@/components/kool-logo";
import { PaulaVideoAvatar } from "@/components/paula-video";
import Link from "next/link";
import { Plus, Calendar, Users, CheckSquare, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatDate, daysUntil } from "@/lib/utils";
import type { Event } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: events } = await supabase.from("events").select("*").eq("user_id", user.id).order("event_date", { ascending: true });

  const upcomingEvents = (events || []).filter((e: Event) => e.event_date && daysUntil(e.event_date) >= 0);
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-kool-black">
          <KoolLogo />
        </Link>
        <div className="flex items-center gap-4">
          {profile?.plan === "free" && (
            <Link href="/pricing" className="text-xs font-semibold text-kool-red border border-kool-red px-3 py-1.5 rounded-sm hover:bg-kool-red hover:text-white transition-colors">
              upgrade to premium
            </Link>
          )}
          {profile?.plan === "premium" && (
            <span className="text-xs font-bold bg-kool-red text-white px-3 py-1.5 rounded-sm">premium</span>
          )}
          <div className="w-8 h-8 bg-kool-black rounded-full flex items-center justify-center text-white text-xs font-bold">
            {(profile?.full_name || user.email || "U")[0].toUpperCase()}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Paula welcome card */}
        <div className="mb-8">
          <PaulaVideoAvatar />
        </div>

        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">
              hey {firstName}<span className="text-kool-red">.</span>
            </h1>
            <p className="text-gray-500">
              {upcomingEvents.length > 0
                ? `you have ${upcomingEvents.length} upcoming event${upcomingEvents.length > 1 ? "s" : ""}.`
                : "ready to plan your next event?"}
            </p>
          </div>
          <Link
            href="/events/new"
            className="bg-kool-red text-white px-6 py-3 rounded-sm font-bold hover:bg-kool-crimson transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> new event
          </Link>
        </div>

        {/* Events grid */}
        {(events || []).length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-sm p-16 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold mb-2">no events yet.</h2>
            <p className="text-gray-500 mb-8">create your first event to start planning.</p>
            <Link
              href="/events/new"
              className="inline-flex items-center gap-2 bg-kool-red text-white px-8 py-4 rounded-sm font-bold hover:bg-kool-crimson transition-colors"
            >
              <Plus className="w-4 h-4" /> create your first event
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(events || []).map((event: Event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="bg-white border border-gray-100 rounded-sm p-6 hover:border-kool-red transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-sm ${
                    event.status === "completed" ? "bg-gray-100 text-gray-500" :
                    event.status === "confirmed" ? "bg-green-50 text-green-700" :
                    "bg-kool-red/10 text-kool-red"
                  }`}>
                    {event.status}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-kool-red transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-kool-red transition-colors">{event.name}</h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-4">
                  {event.event_type.replace(/_/g, " ")}
                </p>
                {event.event_date && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                )}
                {event.event_date && daysUntil(event.event_date) >= 0 && (
                  <div className="text-kool-red text-xs font-bold mt-3">
                    {daysUntil(event.event_date) === 0 ? "today! 🎉" : `${daysUntil(event.event_date)} days away`}
                  </div>
                )}
              </Link>
            ))}
            {/* Add new event card */}
            <Link
              href="/events/new"
              className="border-2 border-dashed border-gray-200 rounded-sm p-6 hover:border-kool-red transition-colors flex flex-col items-center justify-center gap-3 group min-h-[160px]"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-kool-red flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-gray-300 group-hover:text-kool-red transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-400 group-hover:text-kool-red transition-colors">new event</span>
            </Link>
          </div>
        )}

        {/* TKG CTA */}
        <div className="mt-12 bg-kool-black rounded-sm p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-kool-red text-xs font-bold tracking-[0.2em] uppercase mb-2">the koolture group</p>
            <h3 className="text-xl font-black mb-2">want a professional to run your event?</h3>
            <p className="text-white/60 text-sm">paula mescolin and the TKG team handle everything — from strategy to day-of production.</p>
          </div>
          <Link
            href="https://thekoolturegroup.com/contact"
            target="_blank"
            className="shrink-0 bg-kool-red text-white px-6 py-3 rounded-sm font-bold hover:bg-kool-crimson transition-colors inline-flex items-center gap-2"
          >
            hire tkG <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
