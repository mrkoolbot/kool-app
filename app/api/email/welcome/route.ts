import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let email: string;
  try {
    const body = await request.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: "invalid request body" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;">
    <div style="background:#0a0a0a;padding:28px 40px;text-align:left;">
      <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:36px;font-weight:900;color:#ffffff;letter-spacing:-1px;line-height:1;">kool<span style="color:#D90000;">&#9829;</span></span><br/>
      <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:500;color:#ffffff;letter-spacing:8px;">events</span>
    </div>
    <div style="padding:40px;">
      <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px;">welcome to koolevents.app</p>
      <p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px;">now you have access to the full event planning tool. here is one exclusive bonus made specially for those who take event planning to heart and who think about every detail.</p>
      <div style="background:#f8f8f8;border-left:3px solid #D90000;padding:20px;margin:24px 0;">
        <p style="font-weight:800;font-size:16px;margin:0 0 8px;color:#0a0a0a;">the event etiquette manual</p>
        <p style="color:#555;font-size:13px;margin:0;line-height:1.6;">25 chapters written by paula mescolin — covering everything from formal table settings to multicultural hospitality. yours free, forever.</p>
      </div>
      <a href="https://koolevents.app/etiquette" style="background:#D90000;color:#fff;padding:14px 32px;text-decoration:none;font-weight:700;display:inline-block;margin-top:8px;font-size:14px;">read the manual →</a>
      <p style="margin-top:32px;font-size:14px;color:#555;line-height:1.6;">
        ready to plan your first event?<br />
        <a href="https://koolevents.app/dashboard" style="color:#D90000;font-weight:600;text-decoration:none;">go to your dashboard →</a>
      </p>
    </div>
    <div style="height:3px;background:#D90000;"></div>
    <div style="border-top:1px solid #eee;padding:20px 40px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">powered by <a href="https://koolevents.app" style="color:#D90000;text-decoration:none;">the koolture group (TKG)</a> · all rights reserved</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "kool events <events@koolevents.app>",
      to: email,
      subject: "welcome to koolevents.app — your event etiquette manual is inside",
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("welcome email error:", error);
    return NextResponse.json({ error: "failed to send email" }, { status: 500 });
  }
}
