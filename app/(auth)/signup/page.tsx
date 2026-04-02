"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";
  const isPaid = plan === "pro" || plan === "unlimited";
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: "https://kool-app.vercel.app/auth/callback",
      },
    });
    if (error) {
      // friendly duplicate email message
      if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already exists") || error.status === 422) {
        setError("an account with this email already exists.");
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else if (data.session) {
      if (isPaid) {
        // paid plan — redirect to Stripe checkout (welcome email sent by webhook after payment)
        router.push(`/api/stripe/checkout?plan=${plan}&userId=${data.session.user.id}&email=${encodeURIComponent(email)}`);
      } else {
        // starter — send welcome email and go to dashboard
        try {
          await fetch("/api/email/welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, plan: "starter" }),
          });
        } catch { /* non-blocking */ }
        router.push("/dashboard");
      }
    } else {
      if (isPaid) {
        // paid plan — show confirmation screen, Stripe redirect after email verify
        setEmailSent(true);
        setLoading(false);
      } else {
        // starter — send welcome email, show confirmation
        try {
          await fetch("/api/email/welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, plan: "starter" }),
          });
        } catch { /* non-blocking */ }
        setEmailSent(true);
        setLoading(false);
      }
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <Link href="/" className="flex justify-center mb-10">
            <KoolLogo size="md" inverted={true} />
          </Link>
          <h1 className="text-2xl font-black mb-3">check your email.</h1>
          <p className="text-gray-500 text-sm mb-6">
            we sent a confirmation link to <strong>{email}</strong>.<br />
            click it to activate your account and get started.
          </p>
          <p className="text-xs text-gray-400">didn't get it? check your spam folder.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex justify-center mb-10">
          <KoolLogo size="md" inverted={true} />
        </Link>
        <h1 className="text-2xl font-black mb-2">create your account.</h1>
        <p className="text-gray-500 text-sm mb-8">free forever for up to 25 guests.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-kool-red transition-colors"
              placeholder="at least 8 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-kool-red text-white py-3.5 rounded-sm font-bold hover:bg-kool-crimson transition-colors disabled:opacity-50"
          >
            {loading ? "creating account..." : isPaid ? `create account & go to payment` : "create free account"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          by signing up you agree to our terms of service and privacy policy.
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          already have an account?{" "}
          <Link href="/login" className="text-kool-red font-semibold hover:underline">log in</Link>
        </p>
      </div>
    </div>
    <footer className="border-t border-gray-100 px-6 py-10 mt-auto">
      <div className="flex flex-col items-center gap-4 text-center">
        <Link href="/"><KoolLogo inverted size="sm" /></Link>
        <div className="flex items-center gap-8 text-sm text-gray-500">
          <Link href="/pricing" className="hover:text-black transition-colors">pricing</Link>
          <Link href="/login" className="hover:text-black transition-colors">log in</Link>
          <Link href="/signup" className="hover:text-black transition-colors">sign up</Link>
          <Link href="https://thekoolturegroup.com" target="_blank" className="hover:text-black transition-colors">the koolture group</Link>
        </div>
        <p className="text-gray-400 text-xs">intellectual property of the koolture group (TKG). all rights reserved.</p>
      </div>
    </footer>
    </>
  );
}
