import { KoolLogo } from "@/components/kool-logo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { formatDate, daysUntil, formatCurrency } from "@/lib/utils";
import { Calendar, MapPin, Users, DollarSign, CheckSquare, Clock, Truck, ArrowRight, ArrowLeft } from "lucide-react";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: event } = await supabase.from("events").select("*").eq("id", id).eq("user_id", user.id).single();
  if (!event) notFound();

  const [{ data: guests }, { data: checklist }, { data: vendors }, { data: budget }] = await Promise.all([
    supabase.from("guests").select("*").eq("event_id", id),
    supabase.from("checklist_items").select("*").eq("event_id", id),
    supabase.from("vendors").select("*").eq("event_id", id),
    supabase.from("budget_items").select("*").eq("event_id", id),
  ]);

  const completedTasks = (checklist || []).filter((c) => c.is_completed).length;
  const totalTasks = (checklist || []).length;
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const attending = (guests || []).filter((g) => g.rsvp_status === "attending").length;
  const pending = (guests || []).filter((g) => g.rsvp_status === "pending").length;

  const totalBudget = event.budget_total || 0;
  const estimated = (budget || []).reduce((sum: number, b) => sum + (b.estimated_cost || 0), 0);
  const actual = (budget || []).reduce((sum: number, b) => sum + (b.actual_cost || 0), 0);

  const confirmedVendors = (vendors || []).filter((v) => v.status === "confirmed" || v.status === "booked").length;

  const tabs = [
    { label: "checklist", href: `/events/${id}/checklist`, icon: <CheckSquare className="w-4 h-4" /> },
    { label: "guests", href: `/events/${id}/guests`, icon: <Users className="w-4 h-4" /> },
    { label: "vendors", href: `/events/${id}/vendors`, icon: <Truck className="w-4 h-4" /> },
    { label: "budget", href: `/events/${id}/budget`, icon: <DollarSign className="w-4 h-4" /> },
    { label: "timeline", href: `/events/${id}/timeline`, icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Link href="/" className="text-xl font-black tracking-tight text-kool-black">
          <KoolLogo />
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Event header */}
        <div className="bg-white border border-gray-100 rounded-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-kool-red tracking-[0.2em] uppercase">
                {event.event_type.replace(/_/g, " ")}
              </span>
              <h1 className="text-3xl font-black tracking-tight mt-1">{event.name}</h1>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-sm ${
              event.status === "completed" ? "bg-gray-100 text-gray-500" :
              event.status === "confirmed" ? "bg-green-50 text-green-700" :
              "bg-kool-red/10 text-kool-red"
            }`}>
              {event.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            {event.event_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-kool-red" />
                <span>{formatDate(event.event_date)}</span>
                {daysUntil(event.event_date) >= 0 && (
                  <span className="text-kool-red font-bold">
                    ({daysUntil(event.event_date) === 0 ? "today!" : `${daysUntil(event.event_date)} days away`})
                  </span>
                )}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-kool-red" />
                <span>{event.venue_name ? `${event.venue_name} · ` : ""}{event.location}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {totalTasks > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{completedTasks} of {totalTasks} tasks complete</span>
                <span className="font-bold text-kool-red">{completionPct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-kool-red rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "guests attending", value: attending, sub: `${pending} pending`, icon: <Users className="w-5 h-5" /> },
            { label: "tasks done", value: `${completionPct}%`, sub: `${completedTasks}/${totalTasks}`, icon: <CheckSquare className="w-5 h-5" /> },
            { label: "vendors confirmed", value: confirmedVendors, sub: `of ${(vendors || []).length} total`, icon: <Truck className="w-5 h-5" /> },
            { label: "budget used", value: formatCurrency(actual), sub: `of ${formatCurrency(totalBudget)}`, icon: <DollarSign className="w-5 h-5" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-sm p-5">
              <div className="text-kool-red mb-2">{stat.icon}</div>
              <div className="text-2xl font-black mb-0.5">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
              <div className="text-xs text-gray-300 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Navigation tabs */}
        <div className="bg-white border border-gray-100 rounded-sm p-2 flex flex-wrap gap-1 mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-semibold text-gray-500 hover:text-kool-black hover:bg-gray-50 transition-colors"
            >
              {tab.icon}
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link href={`/events/${id}/checklist`}
            className="bg-white border border-gray-100 rounded-sm p-6 hover:border-kool-red transition-colors group flex items-center justify-between">
            <div>
              <div className="font-bold mb-1">view checklist</div>
              <div className="text-sm text-gray-400">{totalTasks - completedTasks} tasks remaining</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-kool-red transition-colors" />
          </Link>
          <Link href={`/events/${id}/guests`}
            className="bg-white border border-gray-100 rounded-sm p-6 hover:border-kool-red transition-colors group flex items-center justify-between">
            <div>
              <div className="font-bold mb-1">manage guests</div>
              <div className="text-sm text-gray-400">{(guests || []).length} guests · {attending} confirmed</div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-kool-red transition-colors" />
          </Link>
        </div>

        {/* TKG CTA */}
        <div className="bg-kool-black rounded-sm p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-kool-red text-xs font-bold tracking-[0.2em] uppercase mb-1">the koolture group</p>
            <p className="font-bold">want TKG to take this event to the next level?</p>
            <p className="text-white/50 text-sm mt-0.5">full event production, vendor management, day-of coordination.</p>
          </div>
          <Link href="https://www.thekoolturegroup.com/contact" target="_blank"
            className="shrink-0 bg-kool-red text-white px-5 py-2.5 rounded-sm font-bold text-sm hover:bg-kool-crimson transition-colors inline-flex items-center gap-2">
            book a call <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
