"use client";

import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { useState } from "react";

const NAVY = "#2d1b69";
const RED = "#d4af37";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

export default function QuotePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", origin: "", destination: "", weight: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <SiteLayout activePage="/quote">
      <PageHero title="Request A Quote" breadcrumb="Home / Request A Quote" />

      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 15px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#222", marginBottom: "6px" }}>Get A Free Quote</h2>
          <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "24px" }} />
          <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", marginBottom: "28px" }}>
            Please fill out the form below and our Customer Care Service will get back to you with a detailed quote for your shipment.
          </p>

          {sent ? (
            <div style={{ padding: "20px", backgroundColor: "#f0faf0", border: "1px solid #b2dfb2", borderRadius: "4px" }}>
              <p style={{ color: "#2e7d32", fontWeight: "600" }}>✓ Quote request submitted! We&apos;ll respond to info@freeholdexpress.com shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { name: "name", placeholder: "Full Name *", type: "text", col: 1 },
                { name: "email", placeholder: "Email Address *", type: "email", col: 1 },
                { name: "phone", placeholder: "Phone Number", type: "tel", col: 1 },
                { name: "origin", placeholder: "Origin (City, Country) *", type: "text", col: 1 },
                { name: "destination", placeholder: "Destination (City, Country) *", type: "text", col: 1 },
                { name: "weight", placeholder: "Estimated Weight / Volume", type: "text", col: 1 },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: "3px", fontSize: "13px", outline: "none" }}
                />
              ))}
              <textarea
                placeholder="Additional details about your shipment..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ gridColumn: "1 / -1", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "3px", fontSize: "13px", outline: "none", resize: "vertical" as const }}
              />
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={{ backgroundColor: NAVY, color: "#fff", border: "none", padding: "12px 36px", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" as const, borderRadius: "3px", cursor: "pointer" }}>
                  SUBMIT REQUEST
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
