"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoHeader, LogoFooter } from "./Logo";

const TEAL = "#9333ea";
const NAVY = "#2d1b69";
const RED = "#d4af37";
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <Link href="/"><LogoHeader /></Link>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {[
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              ), label: "Email Support", value: "INFO@FREEHOLDEXPRESS.COM" },
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ), label: "Call Support", value: "+1 (718) 002-1000" },
              { icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ), label: "Work Hours", value: "MON - SAT 09:00 - 17:00" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "11px", color: "#999" }}>{item.label}</div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: NAVY }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="/track" style={{ background: GOLD, color: "#fff", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" as const, padding: "10px 22px", borderRadius: "3px", textDecoration: "none", boxShadow: "0 2px 8px rgba(212,175,55,0.5)", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            TRACK PARCEL
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>☰</button>
        </div>
      </div>

      {/* ── Nav Bar ── */}
      <nav style={{ backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#222" }}>
            <span style={{ cursor: "pointer", color: "#9333ea" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <span style={{ cursor: "pointer", color: "#9333ea" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </span>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      {children}

      {/* ── Footer Contact Cards ── */}
      <section style={{ backgroundColor: NAVY, padding: "50px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, heading: "CONTACT US", content: "+1 (718) 002-1000" },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, heading: "COME VISIT US", content: "105 Maxess Road Suite S124,\nMelville, NY 11747" },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, heading: "SEND US A MESSAGE", content: "info@freeholdexpress.com\nsupport@freeholdexpress.com" },
          ].map((card) => (
            <div key={card.heading} style={{ backgroundColor: "#fff", borderRadius: "4px", padding: "28px 24px", textAlign: "center" as const }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 2px 10px rgba(212,175,55,0.6)" }}>
                {card.icon}
              </div>
              <div style={{ fontWeight: "700", fontSize: "13px", color: NAVY, textTransform: "uppercase" as const, marginBottom: "8px" }}>{card.heading}</div>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", whiteSpace: "pre-line" as const }}>{card.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark Footer ── */}
      <footer style={{ backgroundColor: "#1a1a1a", padding: "50px 0 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
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
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, text: "+1 (718) 002-1000" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "info@freeholdexpress.com" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "support@freeholdexpress.com" },
                { svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: "Mon - Sat 09:00 - 17:00" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ marginTop: "3px", flexShrink: 0 }}>{item.svg}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
