// Run supabase/migrations/006_email_sends.sql before using
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { eventId, sequenceId, recipientType } = await request.json();
  // recipientType: "all" | "not_responded" | "confirmed" | "attending"

  // Get event data (including branding)
  const { data: event } = await supabase.from("events")
    .select("*, landing_image_url, accent_color, slug")
    .eq("id", eventId).single();
  if (!event) return NextResponse.json({ error: "event not found" }, { status: 404 });

  // Get sequence config
  const { data: seqData } = await supabase.from("email_sequences")
    .select("*").eq("event_id", eventId).eq("sequence_id", sequenceId).single();

  // Get guests based on recipient type
  let guestsQuery = supabase.from("guests").select("*").eq("event_id", eventId);
  if (recipientType === "not_responded") guestsQuery = guestsQuery.is("rsvp_status", null);
  if (recipientType === "confirmed") guestsQuery = guestsQuery.eq("rsvp_status", "attending");

  const { data: guests } = await guestsQuery;
  if (!guests || guests.length === 0) return NextResponse.json({ sent: 0 });

  // Build email from template with event data
  const rsvpUrl = `https://koolevents.app/rsvp/${eventId}`;
  const eventDate = event.event_date
    ? new Date(event.event_date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const eventTime = event.event_time || "";

  const subject = (seqData?.custom_subject || getDefaultSubject(sequenceId, event.name))
    .replace("{{event_name}}", event.name)
    .replace("{{event_date}}", eventDate);

  const accentColor = event.accent_color || "#D90000";
  const heroImageUrl = event.landing_image_url || null;
  const landingPageUrl = event.slug ? `https://koolevents.app/event/${event.slug}` : null;

  const htmlBody = buildEmailHtml({
    sequenceId,
    eventName: event.name,
    eventDate,
    eventTime,
    location: event.location || "",
    venueName: event.venue_name || "",
    dressCode: event.dress_code || "",
    rsvpUrl,
    customBody: seqData?.custom_body || "",
    accentColor,
    heroImageUrl,
    landingPageUrl,
  });

  // Send to all guests with email addresses
  const guestsWithEmail = guests.filter((g: any) => g.email);
  let sent = 0;

  for (const guest of guestsWithEmail) {
    try {
      await resend.emails.send({
        from: "KOOL Events <events@koolevents.app>",
        to: guest.email,
        subject,
        html: htmlBody.replace("{{guest_name}}", guest.name || "guest"),
      });
      sent++;
    } catch (e) {
      console.error("send error for", guest.email, e);
    }
  }

  // Log the send
  try {
    await supabase.from("email_sends").insert({
      event_id: eventId,
      sequence_id: sequenceId,
      sent_count: sent,
      sent_at: new Date().toISOString(),
      sent_by: user.id,
    });
  } catch {
    // table may not exist yet
  }

  return NextResponse.json({ sent, total: guestsWithEmail.length });
}

function getDefaultSubject(sequenceId: string, eventName: string): string {
  const subjects: Record<string, string> = {
    save_the_date: `save the date — ${eventName}`,
    invitation: `you're invited — ${eventName}`,
    rsvp_reminder: `reminder: RSVP for ${eventName}`,
    week_reminder: `one week away — ${eventName}`,
    day_before: `see you tomorrow — ${eventName}`,
    post_event: `thank you for being part of ${eventName}`,
  };
  return subjects[sequenceId] || `update about ${eventName}`;
}

function buildEmailHtml({
  sequenceId,
  eventName,
  eventDate,
  eventTime,
  location,
  venueName,
  dressCode,
  rsvpUrl,
  customBody,
  accentColor = "#D90000",
  heroImageUrl = null,
  landingPageUrl = null,
}: {
  sequenceId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  venueName: string;
  dressCode: string;
  rsvpUrl: string;
  customBody: string;
  accentColor?: string;
  heroImageUrl?: string | null;
  landingPageUrl?: string | null;
}): string {
  const location_display = venueName
    ? `${venueName}${location ? " · " + location : ""}`
    : location;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:4px;overflow:hidden;">
    <!-- Header -->
    <div style="background:#0a0a0a;padding:32px 40px;text-align:center;">
      <span style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">kool</span><span style="font-size:22px;color:${accentColor};font-weight:900;">♥</span>
      <div style="font-size:10px;color:#ffffff;letter-spacing:0.25em;opacity:0.7;margin-top:2px;">events</div>
    </div>
    ${heroImageUrl ? `
    <!-- Hero Image -->
    <div style="width:100%;max-height:280px;overflow:hidden;">
      <img src="${heroImageUrl}" alt="${eventName}" style="width:100%;height:280px;object-fit:cover;display:block;" />
    </div>` : ""}
    <!-- Body -->
    <div style="padding:40px;">
      <p style="font-size:15px;color:#333;line-height:1.6;">hi {{guest_name}},</p>
      ${customBody ? `<p style="font-size:15px;color:#333;line-height:1.6;">${customBody}</p>` : getDefaultBody(sequenceId, eventName)}
      <!-- Event details -->
      <div style="background:#f8f8f8;border-radius:4px;padding:20px;margin:24px 0;">
        <p style="font-size:18px;font-weight:800;color:#0a0a0a;margin:0 0 12px;">${eventName}</p>
        ${eventDate ? `<p style="font-size:13px;color:#555;margin:4px 0;">📅 ${eventDate}${eventTime ? " · " + eventTime : ""}</p>` : ""}
        ${location_display ? `<p style="font-size:13px;color:#555;margin:4px 0;">📍 ${location_display}</p>` : ""}
        ${dressCode ? `<p style="font-size:13px;color:#555;margin:4px 0;">👔 dress code: ${dressCode}</p>` : ""}
      </div>
      ${sequenceId !== "post_event" ? `
      <div style="text-align:center;margin:32px 0;">
        <a href="${rsvpUrl}" style="background:${accentColor};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:700;font-size:14px;display:inline-block;">
          ${sequenceId === "rsvp_reminder" ? "rsvp now →" : "view event →"}
        </a>
        ${landingPageUrl ? `
        <p style="text-align:center;margin-top:12px;">
          <a href="${landingPageUrl}" style="color:${accentColor};font-size:13px;text-decoration:none;">view event page →</a>
        </p>` : ""}
      </div>` : ""}
    </div>
    <!-- Accent bar -->
    <div style="height:3px;background:${accentColor};"></div>
    <!-- Footer -->
    <div style="border-top:1px solid #eee;padding:20px 40px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">powered by <a href="https://koolevents.app" style="color:${accentColor};text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
    </div>
  </div>
</body>
</html>`;
}

function getDefaultBody(sequenceId: string, eventName: string): string {
  const bodies: Record<string, string> = {
    save_the_date: `<p style="font-size:15px;color:#333;line-height:1.6;">we wanted to reach out early so you can save the date for <strong>${eventName}</strong>. formal invitation with all the details coming soon.</p>`,
    invitation: `<p style="font-size:15px;color:#333;line-height:1.6;">you are cordially invited to <strong>${eventName}</strong>. we would be honored to have you join us for this special occasion. please RSVP at your earliest convenience.</p>`,
    rsvp_reminder: `<p style="font-size:15px;color:#333;line-height:1.6;">just a friendly reminder — we haven't received your RSVP for <strong>${eventName}</strong> yet. we'd love to know if you can make it. please let us know at your earliest convenience.</p>`,
    week_reminder: `<p style="font-size:15px;color:#333;line-height:1.6;"><strong>${eventName}</strong> is one week away — we are so excited to see you! here's a quick reminder of the details below.</p>`,
    day_before: `<p style="font-size:15px;color:#333;line-height:1.6;">we can't wait to see you tomorrow at <strong>${eventName}</strong>! please review the event details below to make sure you're all set.</p>`,
    post_event: `<p style="font-size:15px;color:#333;line-height:1.6;">thank you so much for being part of <strong>${eventName}</strong>. it was a pleasure having you with us. we hope you had a wonderful time and look forward to seeing you again.</p>`,
  };
  return bodies[sequenceId] || `<p style="font-size:15px;color:#333;line-height:1.6;">here's an update about <strong>${eventName}</strong>.</p>`;
}
