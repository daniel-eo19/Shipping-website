"use client";

import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <SiteLayout activePage="/contact">
      <PageHero title="Contact Us" breadcrumb="Home / Contact Us" />

      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div className="sg2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "50px" }}>

          {/* Contact Form */}
          <Reveal direction="right" duration={700}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#222", marginBottom: "6px" }}>Contact Details</h2>
              <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "24px" }} />

              {sent ? (
                <div style={{ padding: "20px", backgroundColor: "#f0faf0", border: "1px solid #b2dfb2", borderRadius: "4px" }}>
                  <p style={{ color: "#2e7d32", fontWeight: "600" }}>✓ Message sent successfully! We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: "14px" }}>
                  {[
                    { name: "name", placeholder: "Full Name...", type: "text" },
                    { name: "email", placeholder: "Enter Email Address...", type: "email" },
                    { name: "subject", placeholder: "Subject...", type: "text" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "3px", fontSize: "13px", outline: "none", boxSizing: "border-box" as const }}
                    />
                  ))}
                  <textarea
                    placeholder="Type your message here..."
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "3px", fontSize: "13px", outline: "none", resize: "vertical" as const, boxSizing: "border-box" as const }}
                  />
                  <button type="submit" style={{ backgroundColor: NAVY, color: "#fff", border: "none", padding: "12px 32px", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" as const, borderRadius: "3px", cursor: "pointer", alignSelf: "flex-start" as const }}>
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact Info */}
          <Reveal direction="left" duration={700} delay={150}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#222", marginBottom: "6px" }}>Contact Info</h2>
              <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "24px" }} />
              <div style={{ fontSize: "13px", color: "#555", lineHeight: "2.2" }}>
                {[
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: "105 Maxess Road Suite S124, Melville, NY 11747" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: "+1 (718) 002-1000" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, text: "WhatsApp Chat Only" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "info@freeholdexpress.com" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "support@freeholdexpress.com" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: "Mon - Sat 09:00 - 17:00" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ minWidth: "20px", marginTop: "2px" }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </SiteLayout>
  );
}
