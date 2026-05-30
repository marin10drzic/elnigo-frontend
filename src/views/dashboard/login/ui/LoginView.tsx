"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat } from "lucide-react";
import { apiClient } from "@/shared/lib/apiClient";
import { authStore } from "@/shared/lib/authStore";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiClient.post<{ access_token: string }>("/auth/login", {
        email,
        password,
      });
      authStore.setToken(data.access_token);
      router.replace("chats");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ChefHat className="text-amber-400 w-6 h-6" />
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-400">EL NIGO</span>
          </div>
          <p className="text-[10px] text-stone-500 tracking-[0.4em] uppercase">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="border border-stone-800 bg-[#0a0908] p-8">
          <h1 className="text-white font-serif text-xl mb-1">Sign in</h1>
          <p className="text-stone-500 text-xs mb-7">Enter your admin credentials to continue</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] text-amber-500/70 uppercase">Email</label>
              <Input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@elnigo.de"
                className="bg-stone-900 border-stone-700 text-stone-200 placeholder-stone-600 focus-visible:ring-amber-500/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] text-amber-500/70 uppercase">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-stone-900 border-stone-700 text-stone-200 placeholder-stone-600 focus-visible:ring-amber-500/30"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs border border-red-900/40 bg-red-950/20 px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold tracking-[0.15em] text-xs disabled:opacity-50 mt-1"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </form>
        </div>

        <p className="text-center text-stone-700 text-xs mt-6">
          El Nigo Steakhouse · Admin Access Only
        </p>
      </div>
    </div>
  );
}
