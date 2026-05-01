"use client";

import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.error || "Login ไม่สำเร็จ กรุณาตรวจสอบ username/password");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <label className="grid gap-2 text-sm font-bold">
        Username
        <input name="username" className="rounded-md border border-neutral-300 px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Password
        <input name="password" type="password" className="rounded-md border border-neutral-300 px-3 py-2" />
      </label>
      {error ? <p className="text-sm font-bold text-red-600">{error}</p> : null}
      <button className="rounded-md bg-neutral-950 px-4 py-3 text-sm font-black text-white" disabled={loading}>
        {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
      </button>
    </form>
  );
}
