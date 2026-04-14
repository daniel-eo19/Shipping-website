"use client";

import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

const WaBadge = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "3px",
    backgroundColor: "#25D366", color: "#fff",
    fontSize: "9px", fontWeight: "700",
    padding: "2px 6px", borderRadius: "10px",
    letterSpacing: "0.3px", verticalAlign: "middle", marginLeft: "6px",
  }}>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    WhatsApp Only
  </span>
);

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
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: "+1 (971) 386-4967", wa: true },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "info@freeholdexpress.com" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "support@freeholdexpress.com" },
                  { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: "Mon - Sat 09:00 - 17:00" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ minWidth: "20px", marginTop: "2px" }}>{item.icon}</span>
                    <span>
                      {item.text}
                      {"wa" in item && item.wa && <WaBadge />}
                    </span>
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
