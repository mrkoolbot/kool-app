// Email sequences library for KOOL Events
// Requires RESEND_API_KEY in env to actually send emails

export interface EmailSequenceItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  triggerType: "on_guest_added" | "days_before" | "hours_after_event";
  triggerValue: number; // days or hours
  subject: string;
  bodyHtml: string;
  audience: "all_guests" | "non_responders" | "confirmed_only";
}

export const DEFAULT_EMAIL_SEQUENCES: EmailSequenceItem[] = [
  {
    id: "save_the_date",
    name: "save the date",
    description: "sent immediately when a guest is added to the event",
    enabled: true,
    triggerType: "on_guest_added",
    triggerValue: 0,
    subject: "save the date: {{event_name}}",
    audience: "all_guests",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">save the date.</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">We're excited to invite you to <strong>{{event_name}}</strong>.</p>
  <div style="background:#0a0a0a;border-radius:4px;padding:24px;margin:24px 0;">
    <p style="color:#fff;font-size:20px;font-weight:900;margin:0;">{{event_name}}</p>
    <p style="color:#e53e3e;font-size:14px;margin:8px 0 0;">{{event_date}}{{event_time_display}}</p>
    {{event_location_display}}
  </div>
  <p style="color:#555;font-size:14px;">More details and your official invitation to follow. Mark your calendar!</p>
  <p style="color:#999;font-size:12px;margin-top:32px;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
  {
    id: "invitation",
    name: "invitation",
    description: "formal invitation with rsvp link",
    enabled: true,
    triggerType: "days_before",
    triggerValue: 30,
    subject: "you're invited: {{event_name}}",
    audience: "all_guests",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">you're invited.</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">Please join us for <strong>{{event_name}}</strong>.</p>
  <div style="background:#0a0a0a;border-radius:4px;padding:24px;margin:24px 0;">
    <p style="color:#fff;font-size:20px;font-weight:900;margin:0;">{{event_name}}</p>
    <p style="color:#e53e3e;font-size:14px;margin:8px 0 0;">{{event_date}}{{event_time_display}}</p>
    {{event_location_display}}
  </div>
  <a href="{{rsvp_url}}" style="display:inline-block;background:#e53e3e;color:#fff;padding:12px 28px;border-radius:4px;font-weight:700;text-decoration:none;font-size:14px;">rsvp now</a>
  <p style="color:#999;font-size:12px;margin-top:32px;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
  {
    id: "rsvp_reminder",
    name: "rsvp reminder",
    description: "reminder to guests who haven't responded yet",
    enabled: true,
    triggerType: "days_before",
    triggerValue: 14,
    subject: "reminder: rsvp for {{event_name}}",
    audience: "non_responders",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">just a reminder.</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">We haven't heard from you yet! We'd love to know if you can join us for <strong>{{event_name}}</strong> on {{event_date}}.</p>
  <a href="{{rsvp_url}}" style="display:inline-block;background:#e53e3e;color:#fff;padding:12px 28px;border-radius:4px;font-weight:700;text-decoration:none;font-size:14px;">rsvp now</a>
  <p style="color:#999;font-size:12px;margin-top:32px;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
  {
    id: "week_reminder",
    name: "1-week reminder",
    description: "sent to confirmed guests one week before the event",
    enabled: true,
    triggerType: "days_before",
    triggerValue: 7,
    subject: "one week away: {{event_name}}",
    audience: "confirmed_only",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">one week to go!</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">We're so excited to see you at <strong>{{event_name}}</strong> in just one week!</p>
  <div style="background:#0a0a0a;border-radius:4px;padding:24px;margin:24px 0;">
    <p style="color:#fff;font-size:20px;font-weight:900;margin:0;">{{event_name}}</p>
    <p style="color:#e53e3e;font-size:14px;margin:8px 0 0;">{{event_date}}{{event_time_display}}</p>
    {{event_location_display}}
  </div>
  <p style="color:#999;font-size:12px;margin-top:32px;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
  {
    id: "day_before",
    name: "day-before reminder",
    description: "logistics details sent to confirmed guests the day before",
    enabled: true,
    triggerType: "days_before",
    triggerValue: 1,
    subject: "tomorrow! {{event_name}} — details inside",
    audience: "confirmed_only",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">see you tomorrow!</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">We can't wait to see you at <strong>{{event_name}}</strong> tomorrow!</p>
  <div style="background:#0a0a0a;border-radius:4px;padding:24px;margin:24px 0;">
    <p style="color:#fff;font-size:20px;font-weight:900;margin:0;">{{event_name}}</p>
    <p style="color:#e53e3e;font-size:14px;margin:8px 0 0;">{{event_date}}{{event_time_display}}</p>
    {{event_location_display}}
  </div>
  <p style="color:#555;font-size:14px;">If you have any questions, please don't hesitate to reach out. See you soon!</p>
  <p style="color:#999;font-size:12px;margin-top:32px;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
  {
    id: "thank_you",
    name: "post-event thank you",
    description: "thank you message sent after the event ends",
    enabled: true,
    triggerType: "hours_after_event",
    triggerValue: 2,
    subject: "thank you for celebrating with us!",
    audience: "confirmed_only",
    bodyHtml: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
  <h1 style="font-size:28px;font-weight:900;color:#0a0a0a;">thank you.</h1>
  <p style="color:#555;font-size:16px;">Hi {{guest_name}},</p>
  <p style="color:#555;font-size:16px;">Thank you so much for celebrating with us at <strong>{{event_name}}</strong>. Your presence made it truly special.</p>
  <p style="color:#555;font-size:14px;">We hope you had a wonderful time and look forward to seeing you again soon.</p>
  <p style="color:#999;font-size:12px;margin-top:32px;">with love &amp; gratitude<br/>powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;font-weight:600;">the koolture group (TKG)</a> · all rights reserved</p>
</div>`,
  },
];

export function getTriggerLabel(item: EmailSequenceItem): string {
  if (item.triggerType === "on_guest_added") return "when guest is added";
  if (item.triggerType === "days_before") {
    if (item.triggerValue === 1) return "1 day before event";
    return `${item.triggerValue} days before event`;
  }
  if (item.triggerType === "hours_after_event") {
    if (item.triggerValue === 1) return "1 hour after event";
    return `${item.triggerValue} hours after event ends`;
  }
  return "";
}

export function getAudienceLabel(audience: EmailSequenceItem["audience"]): string {
  if (audience === "all_guests") return "all guests";
  if (audience === "non_responders") return "non-responders only";
  if (audience === "confirmed_only") return "confirmed guests only";
  return audience;
}

// Actual sending logic (requires RESEND_API_KEY)
export async function sendEmailViaResend({
  to,
  subject,
  html,
  fromName = "kool events",
  fromEmail = "events@kool.events",
}: {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  fromEmail?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }

  return res.json();
}

export function buildEmailHtml(
  template: string,
  vars: {
    guest_name: string;
    event_name: string;
    event_date: string;
    event_time?: string;
    event_location?: string;
    venue_name?: string;
    rsvp_url?: string;
  }
): string {
  let html = template;
  html = html.replace(/{{guest_name}}/g, vars.guest_name);
  html = html.replace(/{{event_name}}/g, vars.event_name);
  html = html.replace(/{{event_date}}/g, vars.event_date);
  html = html.replace(/{{rsvp_url}}/g, vars.rsvp_url || "#");

  const timeDisplay = vars.event_time ? ` at ${vars.event_time}` : "";
  html = html.replace(/{{event_time_display}}/g, timeDisplay);

  const locDisplay = vars.event_location
    ? `<p style="color:#aaa;font-size:13px;margin:4px 0 0;">${vars.venue_name ? vars.venue_name + " · " : ""}${vars.event_location}</p>`
    : "";
  html = html.replace(/{{event_location_display}}/g, locDisplay);

  return html;
}
