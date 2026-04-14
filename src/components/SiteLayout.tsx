"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoHeader, LogoFooter } from "./Logo";
import TawkChat from "./TawkChat";

const PHONE = "+1 (971) 386-4967";

const WaBadge = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "3px",
    backgroundColor: "#25D366", color: "#fff",
    fontSize: "9px", fontWeight: "700",
    padding: "2px 6px", borderRadius: "10px",
    letterSpacing: "0.3px", verticalAlign: "middle", marginLeft: "5px",
  }}>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    WhatsApp Only
  </span>
);

const TEAL = "#9333ea";
const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "TRACK SHIPMENT", href: "/track" },
  { label: "REQUEST A QUOTE", href: "/quote" },
  { label: "ABOUT US", href: "/about", dropdown: true },
  { label: "PARCEL STATUS", href: "/track" },
  { label: "CONTACT US", href: "/contact" },
  { label: "COOKIE POLICY", href: "/cookie" },
];

export default function SiteLayout({ children, activePage = "/" }: { children: React.ReactNode; activePage?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactPanelOpen, setContactPanelOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: "#222", backgroundColor: "#fff" }}>

      {/* ── Top Bar ── */}
      <div style={{ backgroundColor: NAVY, color: "#fff", fontSize: "12px", padding: "6px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <a href="/track" style={{ color: "#fff", textDecoration: "none" }}>Track Parcel</a>
          <span style={{ color: "rgba(255,255,255,0.4)" }}> | </span>
          <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>File Report</a>
          <span style={{ color: "rgba(255,255,255,0.4)" }}> | </span>
          <a href="/quote" style={{ color: "#fff", textDecoration: "none" }}>Request A Quote</a>
        </div>
      </div>

      {/* ── Middle Header ── */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", padding: "12px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <Link href="/"><LogoHeader /></Link>

          {/* Contact info — hidden on mobile via CSS */}
          <div className="hdr-info" style={{ gap: "32px", alignItems: "center" }}>
            {[
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              ), label: "Email Support", value: "INFO@FREEHOLDEXPRESS.COM" },
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ), label: "WhatsApp Support", value: PHONE, wa: true },
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ), label: "Work Hours", value: "MON - SAT 09:00 - 17:00" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "11px", color: "#999" }}>{item.label}</div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: NAVY }}>
                    {item.value}
                    {"wa" in item && item.wa && <WaBadge />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track button — hidden on mobile via CSS */}
          <a href="/track" className="hdr-btn" style={{ background: GOLD, color: "#fff", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" as const, padding: "10px 22px", borderRadius: "3px", boxShadow: "0 2px 8px rgba(212,175,55,0.5)", textShadow: "0 1px 2px rgba(0,0,0,0.3)", whiteSpace: "nowrap" as const }}>
            TRACK PARCEL
          </a>
        </div>
      </div>

      {/* ── Nav Bar ── */}
      <nav style={{ backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Desktop nav links — hidden on mobile via CSS */}
          <div className="nav-links">
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.href || (link.href !== "/" && activePage.startsWith(link.href));
              return (
                <a key={link.label} href={link.href} style={{
                  fontSize: "12px", fontWeight: "600", padding: "14px 12px",
                  color: isActive ? TEAL : "#222", textDecoration: "none",
                  borderBottom: isActive ? `2px solid ${TEAL}` : "2px solid transparent",
                  whiteSpace: "nowrap" as const, display: "flex", alignItems: "center", gap: "4px",
                }}>
                  {link.label}
                  {link.dropdown && <span style={{ fontSize: "9px" }}>▾</span>}
                </a>
              );
            })}
          </div>

          {/* Right icons + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Hamburger — shown on mobile via CSS */}
            <button
              className="hdr-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: `1px solid #ddd`, borderRadius: "3px", cursor: "pointer", padding: "6px 10px", color: NAVY, fontSize: "18px", lineHeight: 1 }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        <div className={`nav-mobile${mobileMenuOpen ? " open" : ""}`} style={{ backgroundColor: "#fff", borderTop: "1px solid #eee", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {NAV_LINKS.map((link) => {
            const isActive = activePage === link.href || (link.href !== "/" && activePage.startsWith(link.href));
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block", padding: "13px 20px", fontSize: "13px", fontWeight: "600",
                  color: isActive ? TEAL : "#333", textDecoration: "none",
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: isActive ? "#faf5ff" : "transparent",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div style={{ padding: "14px 20px" }}>
            <a href="/track" style={{ display: "block", textAlign: "center" as const, background: GOLD, color: "#fff", fontWeight: "700", fontSize: "13px", padding: "11px", borderRadius: "3px", textDecoration: "none", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
              TRACK PARCEL
            </a>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      {children}

      {/* ── Footer Contact Cards ── */}
      <section style={{ backgroundColor: NAVY, padding: "50px 0" }}>
        <div className="sg3" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "24px" }}>
          {[
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, heading: "CONTACT US", content: PHONE, wa: true },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, heading: "COME VISIT US", content: "105 Maxess Road Suite S124,\nMelville, NY 11747" },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, heading: "SEND US A MESSAGE", content: "info@freeholdexpress.com\nsupport@freeholdexpress.com" },
          ].map((card) => (
            <div key={card.heading} style={{ backgroundColor: "#fff", borderRadius: "4px", padding: "28px 24px", textAlign: "center" as const }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 2px 10px rgba(212,175,55,0.6)" }}>
                {card.icon}
              </div>
              <div style={{ fontWeight: "700", fontSize: "13px", color: NAVY, textTransform: "uppercase" as const, marginBottom: "8px" }}>{card.heading}</div>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", whiteSpace: "pre-line" as const }}>
                {card.content}
                {"wa" in card && card.wa && <><br /><WaBadge /></>}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark Footer ── */}
      <footer style={{ backgroundColor: "#1a1a1a", padding: "50px 0 24px" }}>
        <div className="sg2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "40px", alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: "20px" }}><LogoFooter /></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=85&auto=format&fit=crop" alt="World Map" style={{ width: "100%", maxWidth: "460px", opacity: 0.7, borderRadius: "4px" }} />
            <p style={{ color: "#888", fontSize: "12px", marginTop: "14px" }}>Freehold Express Services. 1998 - 2026. ALL RIGHTS RESERVED</p>
          </div>
          <div>
            <h5 style={{ color: "#fff", fontWeight: "700", fontSize: "15px", marginBottom: "8px" }}>Subscribe</h5>
            <p style={{ color: "#999", fontSize: "13px", marginBottom: "16px", lineHeight: "1.7" }}>
              Subscribe to our weekly news on happenings within and outside Freehold Express Services.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="email" placeholder="enter your email"
                style={{ flex: 1, padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "3px", color: "#fff", fontSize: "13px", outline: "none" }} />
              <button style={{ background: GOLD, color: "#fff", border: "none", borderRadius: "3px", padding: "10px 18px", fontSize: "16px", cursor: "pointer", boxShadow: "0 2px 8px rgba(212,175,55,0.5)", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>→</button>
            </div>
            <p style={{ color: "#666", fontSize: "12px", marginTop: "8px" }}>Get latest updates and offers.</p>
          </div>
        </div>
      </footer>

      {/* ── Copyright Bar ── */}
      <div style={{ backgroundColor: NAVY, padding: "12px 0", textAlign: "center" as const, color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
        © 2026 Freehold Express Services. All rights reserved.
      </div>

      {/* ── Live Chat ── */}
      <TawkChat />

      {/* ── Sticky Contact Info Panel ── */}
      <div style={{ position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 200, display: "flex" }}>
        <button onClick={() => setContactPanelOpen(!contactPanelOpen)}
          style={{ backgroundColor: NAVY, color: "#fff", border: "none", padding: "12px 8px", cursor: "pointer", writingMode: "vertical-rl", textOrientation: "mixed", fontSize: "12px", fontWeight: "600", letterSpacing: "1px", borderRadius: "4px 0 0 4px" }}>
          Contact Info
        </button>
        {contactPanelOpen && (
          <div style={{ backgroundColor: "#fff", boxShadow: "-4px 0 16px rgba(0,0,0,0.15)", padding: "20px", width: "260px", borderLeft: `3px solid ${TEAL}` }}>
            <h2 style={{ fontWeight: "700", color: NAVY, fontSize: "16px", marginBottom: "14px" }}>Contact Info</h2>
            <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
              {[
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, text: "105 Maxess Road Suite S124, Melville, NY 11747" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: PHONE, wa: true },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "info@freeholdexpress.com" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "support@freeholdexpress.com" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: "Mon - Sat 09:00 - 17:00" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ marginTop: "3px", flexShrink: 0 }}>{item.svg}</span>
                  <span>
                    {item.text}
                    {"wa" in item && item.wa && <> <WaBadge /></>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
