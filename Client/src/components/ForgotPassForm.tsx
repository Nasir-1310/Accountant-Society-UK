"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setMessage("Reset link sent to your email (or shown in console).");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        placeholder="Email Address"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {message && <p className="text-sm text-green-600 text-center">{message}</p>}
    </form>
  );
}
