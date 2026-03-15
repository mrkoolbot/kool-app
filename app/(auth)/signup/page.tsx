"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center text-2xl font-black tracking-tight text-kool-black mb-10">
          kool<span className="text-kool-red">.</span>
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
            {loading ? "creating account..." : "create free account"}
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
  );
}
