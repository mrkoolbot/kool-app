import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const supabase = createClient(
    "https://uezspbfatovyqdlhghmz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlenNwYmZhdG92eXFkbGhnaG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzYxMzYxOCwiZXhwIjoyMDg5MTg5NjE4fQ.zhqNuTMnFsGLCPM4at5iuPIU3JNfJPISIBq0Mq_8gU0"
  );

  // Check if column exists
  const { error: checkError } = await supabase.from("events").select("accent_color").limit(1);

  if (checkError?.message?.includes("does not exist")) {
    // Try via rpc exec_sql
    try {
      await supabase.rpc("exec_sql", {
        sql: "ALTER TABLE events ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#D90000'"
      });
    } catch {
      // ignore
    }

    // Also try direct REST approach
    await fetch("https://uezspbfatovyqdlhghmz.supabase.co/rest/v1/rpc/exec_sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlenNwYmZhdG92eXFkbGhnaG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzYxMzYxOCwiZXhwIjoyMDg5MTg5NjE4fQ.zhqNuTMnFsGLCPM4at5iuPIU3JNfJPISIBq0Mq_8gU0",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlenNwYmZhdG92eXFkbGhnaG16Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzYxMzYxOCwiZXhwIjoyMDg5MTg5NjE4fQ.zhqNuTMnFsGLCPM4at5iuPIU3JNfJPISIBq0Mq_8gU0",
      },
      body: JSON.stringify({ sql: "ALTER TABLE events ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#D90000'" }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, column_exists: !checkError });
}
