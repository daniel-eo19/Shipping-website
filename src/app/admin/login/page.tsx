"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoHeader } from "@/components/Logo";

const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password. Please try again.");
      } else {
        router.push("/admin/shipments");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", padding: "40px", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center" as const, marginBottom: "32px" }}>
          <div style={{ marginBottom: "16px" }}><LogoHeader /></div>
          <h1 style={{ fontSize: "18px", fontWeight: "700", color: NAVY, marginBottom: "6px" }}>Admin Portal</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Shipment Management Dashboard</p>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "12px 16px", color: "#b91c1c", fontSize: "13px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
            Admin Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            style={{ width: "100%", padding: "12px 14px", border: "2px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit", marginBottom: "20px" }}
            onFocus={e => (e.target.style.borderColor = "#9333ea")}
            onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
          />
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "13px", background: GOLD, color: "#fff",
            border: "none", borderRadius: "6px", fontWeight: "700", fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer", textTransform: "uppercase" as const,
            letterSpacing: "1px", boxShadow: "0 2px 10px rgba(212,175,55,0.5)",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: loading ? 0.75 : 1,
          }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center" as const, marginTop: "24px" }}>
          <a href="/" style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "none" }}>
            ← Return to website
          </a>
        </div>
      </div>
    </div>
  );
}
