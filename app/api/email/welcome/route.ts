import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let email: string;
  let plan = "starter";
  try {
    const body = await request.json();
    email = body.email;
    if (body.plan) plan = body.plan;
  } catch {
    return NextResponse.json({ error: "invalid request body" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const header = `
    <div style="background:#0a0a0a;padding:32px 40px;text-align:left;">
      <img src="https://koolevents.app/kool-logo-white.png" alt="kool events" width="140" style="display:block;border:0;" />
    </div>`;

  const footer = `
    <div style="height:3px;background:#D90000;"></div>
    <div style="border-top:1px solid #eee;padding:20px 40px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">intellectual property of <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;">the koolture group (TKG)</a> &middot; all rights reserved</p>
    </div>`;

  let body = "";

  if (plan === "unlimited") {
    body = `
      <p style="font-size:22px;font-weight:900;color:#0a0a0a;margin:0 0 12px;line-height:1.2;">you went unlimited.<br/>we love that for you.</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 16px;">no caps. no limits. no compromises. you now have the full kool experience at your fingertips &mdash; unlimited events, unlimited guests, and every tool we&rsquo;ve built for people who take events seriously.</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">this is the tier for those who don&rsquo;t just plan events &mdash; they create experiences people talk about for years.</p>
      <div style="background:#f8f8f8;border-left:3px solid #D90000;padding:20px;margin:0 0 24px;">
        <p style="font-weight:800;font-size:15px;margin:0 0 6px;color:#0a0a0a;">&#127381; your exclusive bonus: the event etiquette manual</p>
        <p style="color:#555;font-size:13px;margin:0;line-height:1.6;">25 chapters of professional event etiquette, written by paula mescolin. from formal table settings to multicultural hospitality &mdash; the knowledge that separates good planners from extraordinary ones. yours, because you chose unlimited.</p>
      </div>
      <a href="https://koolevents.app/etiquette" style="background:#D90000;color:#fff;padding:14px 36px;text-decoration:none;font-weight:700;display:inline-block;font-size:14px;letter-spacing:0.03em;">read the manual &rarr;</a>
      <p style="margin-top:32px;font-size:14px;color:#555;line-height:1.6;">ready to build something unforgettable?<br/><a href="https://koolevents.app/dashboard" style="color:#D90000;font-weight:700;text-decoration:none;">go to your dashboard &rarr;</a></p>`;

  } else if (plan === "pro") {
    body = `
      <p style="font-size:22px;font-weight:900;color:#0a0a0a;margin:0 0 12px;line-height:1.2;">welcome to the pro experience.</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 16px;">you just unlocked the tools that professional event planners actually use: smart timelines, automated email sequences, QR check-in, conditional RSVP logic, and custom event branding.</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">kool was built by someone who&rsquo;s spent 20+ years in event production. every feature here exists because a real planner needed it.</p>
      <div style="background:#f8f8f8;border-left:3px solid #D90000;padding:20px;margin:0 0 24px;">
        <p style="font-weight:800;font-size:15px;margin:0 0 6px;color:#0a0a0a;">&#127381; your pro bonus: the event etiquette manual</p>
        <p style="color:#555;font-size:13px;margin:0;line-height:1.6;">25 chapters of professional event etiquette written by paula mescolin &mdash; from formal table settings to navigating multicultural events. the kind of knowledge that elevates every event you touch.</p>
      </div>
      <a href="https://koolevents.app/etiquette" style="background:#D90000;color:#fff;padding:14px 36px;text-decoration:none;font-weight:700;display:inline-block;font-size:14px;letter-spacing:0.03em;">read the manual &rarr;</a>
      <p style="margin-top:32px;font-size:14px;color:#555;line-height:1.6;">your first event is waiting.<br/><a href="https://koolevents.app/dashboard" style="color:#D90000;font-weight:700;text-decoration:none;">go to your dashboard &rarr;</a></p>`;

  } else {
    // starter / free
    body = `
      <p style="font-size:22px;font-weight:900;color:#0a0a0a;margin:0 0 12px;line-height:1.2;">welcome to koolevents.app</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 16px;">you&rsquo;re in. your free account gives you everything you need to start planning your first event &mdash; smart checklists, guest management, budget tracking, vendor lists, and a beautiful public event page.</p>
      <p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">when you&rsquo;re ready to go further &mdash; unlimited events, automated email sequences, QR check-in, custom event branding, and exclusive member content &mdash; your upgrade is one click away.</p>
      <a href="https://koolevents.app/dashboard" style="background:#D90000;color:#fff;padding:14px 36px;text-decoration:none;font-weight:700;display:inline-block;font-size:14px;letter-spacing:0.03em;">start planning &rarr;</a>
      <p style="margin-top:32px;font-size:13px;color:#aaa;line-height:1.6;">want more? <a href="https://koolevents.app/pricing" style="color:#D90000;text-decoration:none;">see what pro &amp; unlimited unlock &rarr;</a></p>`;
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;">
    ${header}
    <div style="padding:40px;">${body}</div>
    ${footer}
  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "kool events <events@koolevents.app>",
      to: email,
      subject: plan === "unlimited" ? "you went unlimited. welcome to kool ♥" : plan === "pro" ? "welcome to kool pro — your etiquette manual is inside" : "welcome to koolevents.app — let's plan something kool",
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("welcome email error:", error);
    return NextResponse.json({ error: "failed to send email" }, { status: 500 });
  }
}
