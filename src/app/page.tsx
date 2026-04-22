"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/test-bot-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "demo-user" }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ error: "An error occurred while checking the bot ID." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              BotId Demo
            </h1>
            <p className="max-w-sm text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Click the button.
            </p>
          </div>
          <div className="flex items-start gap-6 text-base font-medium">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50"
            >
              <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={16} height={16} />
              {loading ? "Checking..." : "Check on Server"}
            </button>
            {result && (
              <pre className="font-mono text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
