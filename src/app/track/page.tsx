"use client";

import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { useState } from "react";

const NAVY = "#2d1b69";
const RED = "#d4af37";

export default function TrackPage() {
  const [trackingNum, setTrackingNum] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout activePage="/track">
      <PageHero title="Track Shipment" breadcrumb="Track / Parcel" />

      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div className="sg2-w" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "50px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#222", marginBottom: "24px" }}>Tracking Number</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
              <input
                type="text"
                value={trackingNum}
                onChange={(e) => setTrackingNum(e.target.value)}
                placeholder="Type Tracking Number. Ex: ABC1234567"
                style={{ flex: 1, padding: "10px 14px", border: "1px solid #ddd", borderRadius: "3px", fontSize: "14px", outline: "none" }}
              />
            </div>
            <button
              onClick={() => setSubmitted(true)}
              style={{ backgroundColor: NAVY, color: "#fff", border: "none", padding: "12px 32px", fontWeight: "700", fontSize: "13px", textTransform: "uppercase" as const, borderRadius: "3px", cursor: "pointer", letterSpacing: "1px" }}
            >
              TRACK
            </button>

            {submitted && trackingNum && (
              <div style={{ marginTop: "28px", padding: "20px", backgroundColor: "#fff8f8", border: "1px solid #f5c2c2", borderRadius: "4px" }}>
                <p style={{ color: RED, fontWeight: "600", fontSize: "14px" }}>
                  No shipment found for tracking number: <strong>{trackingNum}</strong>
                </p>
                <p style={{ color: "#666", fontSize: "13px", marginTop: "6px" }}>
                  Please verify your tracking number or contact us at info@freeholdexpress.com
                </p>
              </div>
            )}

            <div style={{ marginTop: "32px" }}>
              <p style={{ fontWeight: "700", fontSize: "13px", fontStyle: "italic", marginBottom: "10px" }}>
                HOW TO TRACK YOUR PARCEL/SHIPMENT
              </p>
              <ol style={{ fontSize: "13px", color: "#666", lineHeight: "2", paddingLeft: "20px" }}>
                <li>Type your Tracking Number into the textbox above.</li>
                <li>Then click on the &quot;Track&quot; button below the textbox.</li>
              </ol>
            </div>
          </div>

          <div style={{ textAlign: "center" as const, display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "12px" }}>
            <style>{`
              @keyframes pinBounce {
                0%, 100% { transform: translateY(0); }
                40% { transform: translateY(-14px); }
                60% { transform: translateY(-7px); }
              }
              @keyframes shadowPulse {
                0%, 100% { transform: scaleX(1); opacity: 0.35; }
                40% { transform: scaleX(0.5); opacity: 0.15; }
              }
              @keyframes dotPulse {
                0%, 100% { r: 6; opacity: 1; }
                50% { r: 22; opacity: 0; }
              }
              @keyframes truckSlide {
                0% { transform: translateX(-8px); }
                50% { transform: translateX(8px); }
                100% { transform: translateX(-8px); }
              }
              @keyframes dashMove {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
            `}</style>
            <svg width="220" height="240" viewBox="0 0 220 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Road dashes */}
              <rect x="10" y="200" width="200" height="6" rx="3" fill="#e8e8e8"/>
              <line x1="30" y1="203" x2="55" y2="203" stroke="#fff" strokeWidth="3" strokeDasharray="10 8"
                style={{ animation: "dashMove 0.6s linear infinite" }}/>
              <line x1="90" y1="203" x2="115" y2="203" stroke="#fff" strokeWidth="3" strokeDasharray="10 8"
                style={{ animation: "dashMove 0.6s linear infinite 0.2s" }}/>
              <line x1="150" y1="203" x2="175" y2="203" stroke="#fff" strokeWidth="3" strokeDasharray="10 8"
                style={{ animation: "dashMove 0.6s linear infinite 0.4s" }}/>

              {/* Truck body */}
              <g style={{ animation: "truckSlide 2.5s ease-in-out infinite" }}>
                <rect x="40" y="155" width="100" height="40" rx="4" fill="#2d1b69"/>
                <rect x="115" y="160" width="35" height="35" rx="3" fill="#9333ea"/>
                <rect x="118" y="163" width="28" height="20" rx="2" fill="#c4b5f8"/>
                <circle cx="60" cy="198" r="9" fill="#444"/>
                <circle cx="60" cy="198" r="5" fill="#ccc"/>
                <circle cx="130" cy="198" r="9" fill="#444"/>
                <circle cx="130" cy="198" r="5" fill="#ccc"/>
                {/* Package on truck */}
                <rect x="55" y="145" width="32" height="28" rx="2" fill="#d4af37" opacity="0.9"/>
                <line x1="55" y1="159" x2="87" y2="159" stroke="#b8960c" strokeWidth="1.5"/>
                <line x1="71" y1="145" x2="71" y2="173" stroke="#b8960c" strokeWidth="1.5"/>
              </g>

              {/* Pin shadow */}
              <ellipse cx="110" cy="130" rx="14" ry="5" fill="#000"
                style={{ animation: "shadowPulse 1.4s ease-in-out infinite" }}/>

              {/* Location pin */}
              <g style={{ animation: "pinBounce 1.4s ease-in-out infinite", transformOrigin: "110px 130px" }}>
                <circle cx="110" cy="88" r="22" fill="#9333ea"/>
                <path d="M110 65 C96 65 88 76 88 88 C88 105 110 128 110 128 C110 128 132 105 132 88 C132 76 124 65 110 65Z" fill="#9333ea"/>
                <circle cx="110" cy="88" r="10" fill="#fff"/>
                {/* Pulse rings */}
                <circle cx="110" cy="88" r="6" fill="#d4af37"
                  style={{ animation: "dotPulse 1.4s ease-out infinite" }}/>
                <circle cx="110" cy="88" r="6" fill="#d4af37"
                  style={{ animation: "dotPulse 1.4s ease-out infinite 0.4s" }}/>
              </g>
            </svg>
            <p style={{ fontSize: "12px", color: "#999", marginTop: "-8px" }}>Enter your tracking number above</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
