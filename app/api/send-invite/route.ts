import { NextRequest, NextResponse } from "next/server";

// TODO: Add RESEND_API_KEY to .env.local to enable real email delivery.
// Sign up free at https://resend.com — 3000 emails/month included.
// Then uncomment the Resend import and sendEmail block below.

// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

interface InvitePayload {
  guestId: string;
  guestName: string;
  guestEmail: string;
  eventId: string;
  eventName: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  rsvpUrl: string;
}

function buildEmailHtml(payload: InvitePayload): string {
  const { guestName, eventName, eventDate, eventTime, eventLocation, rsvpUrl } = payload;

  const dateLine = [eventDate, eventTime].filter(Boolean).join(" · ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>you're invited to ${eventName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #ffffff; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
    .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; margin-bottom: 40px; }
    .logo span { color: #D90000; }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: #D90000; text-transform: lowercase; margin-bottom: 16px; }
    .headline { font-size: 32px; font-weight: 900; line-height: 1.1; color: #ffffff; margin-bottom: 12px; letter-spacing: -0.5px; }
    .guest-name { color: #D90000; }
    .divider { width: 40px; height: 3px; background: #D90000; margin: 24px 0; }
    .event-card { background: #111111; border: 1px solid #222222; border-radius: 4px; padding: 24px; margin: 32px 0; }
    .event-name { font-size: 20px; font-weight: 900; color: #ffffff; margin-bottom: 8px; }
    .event-meta { font-size: 14px; color: #888888; line-height: 1.6; }
    .event-meta strong { color: #ffffff; font-weight: 600; }
    .cta { display: block; background: #D90000; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 4px; font-size: 14px; font-weight: 700; text-align: center; letter-spacing: 0.05em; text-transform: lowercase; margin: 32px 0; }
    .cta:hover { background: #B30000; }
    .footer-text { font-size: 12px; color: #444444; line-height: 1.6; margin-top: 40px; }
    .footer-link { color: #666666; }
    .brand { margin-top: 32px; padding-top: 24px; border-top: 1px solid #1a1a1a; font-size: 13px; color: #333333; }
    .brand span { color: #D90000; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">kool<span>♥</span></div>

    <p class="eyebrow">you've been invited</p>
    <h1 class="headline">hey, <span class="guest-name">${guestName.toLowerCase()}</span>.</h1>
    <div class="divider"></div>

    <p style="font-size: 16px; color: #aaaaaa; line-height: 1.7;">
      you've been personally invited to an upcoming event. we'd love to have you there.
    </p>

    <div class="event-card">
      <div class="event-name">${eventName}</div>
      ${dateLine ? `<div class="event-meta"><strong>${dateLine}</strong></div>` : ""}
      ${eventLocation ? `<div class="event-meta" style="margin-top: 6px;">${eventLocation}</div>` : ""}
    </div>

    <a href="${rsvpUrl}" class="cta">rsvp now →</a>

    <p class="footer-text">
      if the button doesn't work, copy and paste this link into your browser:<br />
      <a href="${rsvpUrl}" class="footer-link">${rsvpUrl}</a>
    </p>

    <div class="brand">
      powered by kool<span>♥</span> — event management for the ones who care about the details.
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const payload: InvitePayload = await req.json();
  const { guestId, guestName, guestEmail, eventId, eventName, rsvpUrl } = payload;

  if (!guestEmail) {
    return NextResponse.json({ error: "no email address provided" }, { status: 400 });
  }

  const subject = `you're invited to ${eventName}`;
  const html = buildEmailHtml(payload);

  // TODO: Uncomment when RESEND_API_KEY is set in .env.local
  // const { data, error } = await resend.emails.send({
  //   from: "kool♥ events <invites@koolevents.app>",
  //   to: [guestEmail],
  //   subject,
  //   html,
  // });
  // if (error) {
  //   console.error("[send-invite] resend error:", error);
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // MOCK: Log to console until Resend API key is configured
  console.log(`[send-invite] 📧 MOCK EMAIL`);
  console.log(`  To: ${guestName} <${guestEmail}>`);
  console.log(`  Subject: ${subject}`);
  console.log(`  RSVP URL: ${rsvpUrl}`);
  console.log(`  Guest ID: ${guestId} | Event ID: ${eventId}`);

  return NextResponse.json({ success: true, mock: true });
}
