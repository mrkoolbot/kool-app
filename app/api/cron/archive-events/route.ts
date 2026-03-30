import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Runs daily at 6 AM UTC via Vercel Cron
// Auto-archives (makes private) public event landing pages 30 days after event date

export async function GET(request: Request) {
  // Verify this is called by Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Find all public events where event_date was more than 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const cutoffDate = thirtyDaysAgo.toISOString().split("T")[0];

  const { data: eventsToArchive, error: fetchError } = await supabase
    .from("events")
    .select("id, name, event_date, user_id")
    .eq("is_public", true)
    .lt("event_date", cutoffDate);

  if (fetchError) {
    console.error("archive cron fetch error:", fetchError.message);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!eventsToArchive || eventsToArchive.length === 0) {
    return NextResponse.json({ archived: 0, message: "no events to archive" });
  }

  const ids = eventsToArchive.map((e) => e.id);

  const { error: updateError } = await supabase
    .from("events")
    .update({ is_public: false })
    .in("id", ids);

  if (updateError) {
    console.error("archive cron update error:", updateError.message);
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  console.log(`archived ${ids.length} events:`, eventsToArchive.map((e) => `${e.name} (${e.event_date})`));

  return NextResponse.json({
    archived: ids.length,
    events: eventsToArchive.map((e) => ({ name: e.name, event_date: e.event_date })),
    message: `${ids.length} event landing pages archived (30+ days after event date)`,
  });
}
