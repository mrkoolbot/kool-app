"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    setDeleting(true);
    await supabase.from("events").delete().eq("id", eventId);
    router.push("/dashboard");
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">are you sure? this cannot be undone.</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-sm font-semibold text-white bg-red-600 px-4 py-2 rounded-sm hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "deleting..." : "yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors"
    >
      <Trash2 className="w-4 h-4" /> delete event
    </button>
  );
}
