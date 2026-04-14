"use client";

import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import {
  STATUS_CONFIG, PROGRESS_STEPS,
  getActiveStep, formatDateTime, formatDate,
  type Shipment, type ShipmentStatus,
} from "@/lib/tracking";

const NAVY = "#2d1b69";
const TEAL = "#9333ea";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

// ── Status Badge ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ShipmentStatus }) {
  const cfg = STATUS_CONFIG[status];
  const pulse = status === "in_transit" || status === "out_for_delivery";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "5px 14px", borderRadius: "20px",
      backgroundColor: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      fontSize: "12px", fontWeight: "700", letterSpacing: "0.5px",
    }}>
      {pulse && (
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%",
          backgroundColor: cfg.color, display: "inline-block",
          animation: "statusPulse 1.4s ease-in-out infinite",
        }} />
      )}
      {cfg.label.toUpperCase()}
    </span>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────
function ProgressBar({ status }: { status: ShipmentStatus }) {
  const active = getActiveStep(status);
  const isException = STATUS_CONFIG[status].step < 0;
  return (
    <div style={{ padding: "24px 0 8px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
        {/* connecting line */}
        <div style={{
          position: "absolute", top: "13px", left: "13px",
          right: "13px", height: "3px", backgroundColor: "#e5e7eb", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", top: "13px", left: "13px",
          width: active === 5 ? "calc(100% - 26px)" : `${(active / 5) * 100}%`,
          height: "3px", backgroundColor: isException ? "#ef4444" : TEAL,
          zIndex: 1, transition: "width 0.8s ease",
        }} />
        {PROGRESS_STEPS.map((step, i) => {
          const done = i < active;
          const curr = i === active;
          const exc = isException && curr;
          return (
            <div key={step.key} style={{
              flex: 1, display: "flex", flexDirection: "column" as const,
              alignItems: "center", position: "relative", zIndex: 2,
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                backgroundColor: done ? TEAL : curr ? (isException ? "#ef4444" : TEAL) : "#e5e7eb",
                border: `3px solid ${done ? TEAL : curr ? (isException ? "#ef4444" : TEAL) : "#e5e7eb"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "12px", fontWeight: "700",
                boxShadow: curr ? `0 0 0 4px ${isException ? "#fee2e2" : "#ede9fe"}` : "none",
                transition: "all 0.3s ease",
              }}>
                {done ? "✓" : exc ? "!" : i + 1}
              </div>
              <div style={{
                fontSize: "10px", fontWeight: "600", marginTop: "8px",
                color: curr ? (isException ? "#991b1b" : TEAL) : done ? "#374151" : "#9ca3af",
                textAlign: "center" as const, lineHeight: "1.3",
                maxWidth: "70px",
              }}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Route Visual ──────────────────────────────────────────────────────────
function RouteVisual({ shipment }: { shipment: Shipment }) {
  const active = getActiveStep(shipment.status);
  const pct = Math.min(Math.max(active / 5, 0.05), 0.95);
  const W = 560, H = 90;
  const startX = 40, endX = W - 40;
  const controlY = 20;
  const currentX = startX + (endX - startX) * pct;
  const currentY = H / 2 - Math.sin(Math.PI * pct) * 30;
  const isDone = shipment.status === "delivered";

  return (
    <div style={{ padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: NAVY, marginBottom: "4px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={TEAL}><path d="M12 2 L2 7 L12 12 L22 7 Z"/><path d="M2 7 L2 17 L12 22 L12 12 Z" opacity="0.7"/><path d="M22 7 L22 17 L12 22 L12 12 Z" opacity="0.5"/></svg>
          {shipment.origin}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {shipment.destination}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#059669"><circle cx="12" cy="12" r="10"/><path d="M8 12 L11 15 L16 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
        </span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", maxWidth: "100%" }}>
          {/* Dashed route path */}
          <path
            d={`M ${startX} ${H / 2} Q ${W / 2} ${controlY} ${endX} ${H / 2}`}
            fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="6 4"
          />
          {/* Completed route */}
          <path
            d={`M ${startX} ${H / 2} Q ${W / 2} ${controlY} ${currentX} ${currentY}`}
            fill="none" stroke={TEAL} strokeWidth="2.5"
          />
          {/* Origin dot */}
          <circle cx={startX} cy={H / 2} r="7" fill={TEAL} />
          {/* Destination dot */}
          <circle cx={endX} cy={H / 2} r="7" fill={isDone ? "#059669" : "#d1d5db"} />
          {/* Current location marker — flat plane */}
          {!isDone && (
            <g transform={`translate(${currentX}, ${currentY})`}>
              <circle r="11" fill="#fff" stroke={TEAL} strokeWidth="2.5"/>
              {/* top-down plane pointing right */}
              <ellipse cx="0" cy="0" rx="2.5" ry="7" fill={TEAL}/>
              <ellipse cx="0" cy="-1" rx="7" ry="2" fill="#7c3aed"/>
              <ellipse cx="0" cy="5" rx="3.5" ry="1.5" fill="#2d1b69"/>
            </g>
          )}
          {/* Destination — filled check */}
          {isDone && (
            <g transform={`translate(${endX}, ${H / 2})`}>
              <circle r="7" fill="#059669"/>
              <path d="M-3,0 L-0.5,2.5 L4,-2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </g>
          )}
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "center", fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          backgroundColor: "#f3f4f6", border: "1px solid #e5e7eb",
          borderRadius: "12px", padding: "3px 12px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={TEAL}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5" fill="#fff"/>
          </svg>
          {shipment.currentLocation}
        </span>
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────
function Timeline({ shipment }: { shipment: Shipment }) {
  const events = [...shipment.events].reverse(); // newest first
  return (
    <div>
      <h3 style={{ fontSize: "14px", fontWeight: "700", color: NAVY, marginBottom: "16px", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
        Tracking History
      </h3>
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "11px", top: "12px", bottom: "12px",
          width: "2px", backgroundColor: "#e5e7eb",
        }} />
        {events.map((evt, i) => {
          const cfg = STATUS_CONFIG[evt.status];
          const isLatest = i === 0;
          return (
            <div key={evt.id} style={{
              display: "flex", gap: "16px", marginBottom: "20px",
              position: "relative",
            }}>
              {/* Dot */}
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
                backgroundColor: isLatest ? TEAL : "#fff",
                border: `2px solid ${isLatest ? TEAL : "#d1d5db"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1,
              }}>
                {isLatest && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#fff" }} />}
              </div>
              {/* Content */}
              <div style={{
                flex: 1, backgroundColor: isLatest ? "#faf5ff" : "#fafafa",
                border: `1px solid ${isLatest ? "#c4b5fd" : "#f0f0f0"}`,
                borderRadius: "8px", padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: "700",
                    backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                  }}>
                    {cfg.label}
                  </span>
                  {isLatest && <span style={{ fontSize: "10px", color: TEAL, fontWeight: "700" }}>LATEST UPDATE</span>}
                </div>
                <p style={{ fontSize: "13px", color: "#111827", fontWeight: "600", marginBottom: "4px", margin: "4px 0" }}>
                  {evt.description}
                </p>
                <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>
                  {formatDateTime(evt.timestamp)} · {evt.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Package Details ───────────────────────────────────────────────────────
function PackageDetails({ shipment }: { shipment: Shipment }) {
  const rows = [
    ["Service", shipment.service],
    ["Package Type", shipment.pkgType],
    ["Weight", shipment.pkgWeight],
    ["Dimensions", shipment.pkgDimensions],
    ["Pieces", shipment.pkgPieces],
    ["Description", shipment.pkgDescription],
  ].filter(([, v]) => v);

  return (
    <div>
      <h3 style={{ fontSize: "14px", fontWeight: "700", color: NAVY, marginBottom: "16px", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
        Package Details
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {rows.map(([label, value]) => (
          <div key={label} style={{ backgroundColor: "#f9fafb", borderRadius: "6px", padding: "10px 14px" }}>
            <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "2px" }}>{label}</div>
            <div style={{ fontSize: "13px", color: "#111827", fontWeight: "600" }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "14px 16px", marginBottom: "10px" }}>
        <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "8px" }}>Shipper</div>
        <div style={{ fontSize: "13px", color: "#374151", fontWeight: "700" }}>{shipment.shipperName}</div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{shipment.shipperCity}{shipment.shipperState ? `, ${shipment.shipperState}` : ""}, {shipment.shipperCountry}</div>
      </div>
      <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "14px 16px" }}>
        <div style={{ fontSize: "10px", color: "#9ca3af", fontWeight: "600", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "8px" }}>Recipient</div>
        <div style={{ fontSize: "13px", color: "#374151", fontWeight: "700" }}>{shipment.recipientName}</div>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>{shipment.recipientCity}{shipment.recipientState ? `, ${shipment.recipientState}` : ""}, {shipment.recipientCountry}</div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function TrackPage() {
  const [trackingNum, setTrackingNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState("");

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const num = trackingNum.trim().toUpperCase();
    if (!num) return;
    setLoading(true);
    setError("");
    setShipment(null);
    try {
      const res = await fetch(`/api/tracking/${encodeURIComponent(num)}`);
      if (!res.ok) {
        setError(`No shipment found for tracking number "${num}". Please check and try again.`);
      } else {
        setShipment(await res.json() as Shipment);
      }
    } catch {
      setError("Unable to reach the server. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout activePage="/track">
      <style>{`
        @keyframes statusPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <PageHero title="Track Shipment" breadcrumb="Home / Track Shipment" />

      {/* ── Search Form ── */}
      <section style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "36px 0" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 15px" }}>
          <form onSubmit={handleTrack} style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
            <input
              type="text"
              value={trackingNum}
              onChange={e => setTrackingNum(e.target.value)}
              placeholder="Enter tracking number  e.g. FES7834921056"
              style={{
                flex: 1, minWidth: "200px", padding: "13px 18px",
                border: "2px solid #e5e7eb", borderRadius: "6px",
                fontSize: "14px", outline: "none", fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = TEAL)}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />
            <button type="submit" disabled={loading} style={{
              background: GOLD, color: "#fff", border: "none",
              padding: "13px 32px", borderRadius: "6px", fontWeight: "700",
              fontSize: "14px", cursor: loading ? "not-allowed" : "pointer",
              textTransform: "uppercase" as const, letterSpacing: "1px",
              boxShadow: "0 2px 10px rgba(212,175,55,0.5)",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              opacity: loading ? 0.8 : 1, whiteSpace: "nowrap" as const,
            }}>
              {loading ? "Searching…" : "Track Shipment"}
            </button>
          </form>
          <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "10px" }}>
            Try sample tracking numbers: <strong>FES7834921056</strong> · <strong>FES5291047683</strong> · <strong>FES3948612057</strong>
          </p>
        </div>
      </section>

      {/* ── Loading Spinner ── */}
      {loading && (
        <section style={{ padding: "60px 0", textAlign: "center" as const }}>
          <div style={{
            width: "48px", height: "48px", border: `4px solid #e5e7eb`,
            borderTop: `4px solid ${TEAL}`, borderRadius: "50%",
            margin: "0 auto 16px", animation: "spin 0.8s linear infinite",
          }} />
          <p style={{ color: "#6b7280", fontSize: "14px" }}>Looking up your shipment…</p>
        </section>
      )}

      {/* ── Error ── */}
      {error && !loading && (
        <section style={{ padding: "40px 0" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 15px" }}>
            <div style={{
              backgroundColor: "#fff8f8", border: "1px solid #fca5a5",
              borderRadius: "8px", padding: "20px 24px",
            }}>
              <p style={{ color: "#991b1b", fontWeight: "700", fontSize: "14px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444"><circle cx="12" cy="12" r="10"/><path d="M8 8 L16 16 M16 8 L8 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
                Shipment Not Found
              </p>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Tracking Result ── */}
      {shipment && !loading && (
        <section style={{ padding: "36px 0 60px", animation: "fadeIn 0.4s ease" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 15px" }}>

            {/* Header Card */}
            <div style={{
              backgroundColor: "#fff", border: "1px solid #e5e7eb",
              borderRadius: "12px", padding: "24px 28px", marginBottom: "20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: "12px", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "4px" }}>
                    Tracking Number
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: NAVY, fontFamily: "monospace, monospace", letterSpacing: "1px" }}>
                    {shipment.trackingNumber}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    {shipment.service} · {shipment.pkgType}
                  </div>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <StatusBadge status={shipment.status} />
                  {shipment.estimatedDelivery && (
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
                      {shipment.status === "delivered" ? "Delivered" : "Est. Delivery"}: <strong style={{ color: NAVY }}>{formatDate(shipment.estimatedDelivery)}</strong>
                    </div>
                  )}
                </div>
              </div>
              <ProgressBar status={shipment.status} />
            </div>

            {/* Route Visualization */}
            <div style={{
              backgroundColor: "#fff", border: "1px solid #e5e7eb",
              borderRadius: "12px", padding: "20px 28px", marginBottom: "20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <RouteVisual shipment={shipment} />
            </div>

            {/* Details + Timeline */}
            <div className="sg2" style={{ gap: "20px", alignItems: "start" }}>
              {/* Package Details */}
              <div style={{
                backgroundColor: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "12px", padding: "24px 28px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <PackageDetails shipment={shipment} />
              </div>

              {/* Timeline */}
              <div style={{
                backgroundColor: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "12px", padding: "24px 28px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
                <Timeline shipment={shipment} />
              </div>
            </div>

            {/* Support Banner */}
            <div style={{
              backgroundColor: NAVY, borderRadius: "12px",
              padding: "28px 32px", marginTop: "20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap" as const, gap: "16px",
            }}>
              <div>
                <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "700", marginBottom: "4px" }}>
                  Need help with your shipment?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", margin: 0 }}>
                  Our support team is available Mon – Sat, 09:00 – 17:00 UTC.
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
                <a href="/contact" style={{
                  background: GOLD, color: "#fff", textDecoration: "none",
                  padding: "10px 22px", borderRadius: "6px", fontWeight: "700",
                  fontSize: "13px", boxShadow: "0 2px 8px rgba(212,175,55,0.5)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)", whiteSpace: "nowrap" as const,
                }}>
                  Contact Support
                </a>
                <a href="/quote" style={{
                  backgroundColor: "rgba(255,255,255,0.1)", color: "#fff",
                  textDecoration: "none", padding: "10px 22px", borderRadius: "6px",
                  fontWeight: "700", fontSize: "13px", border: "1px solid rgba(255,255,255,0.2)",
                  whiteSpace: "nowrap" as const,
                }}>
                  Get a Quote
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── Default State (no search yet) ── */}
      {!shipment && !loading && !error && (
        <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 15px" }}>
            <div style={{ textAlign: "center" as const, marginBottom: "48px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: NAVY, marginBottom: "10px" }}>
                Real-Time Shipment Tracking
              </h2>
              <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "500px", margin: "0 auto" }}>
                Enter your Freehold Express tracking number above to get a complete status update on your shipment.
              </p>
            </div>
            <div className="sg3" style={{ gap: "20px" }}>
              {[
                {
                  icon: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      {/* clipboard body */}
                      <rect x="7" y="8" width="30" height="34" rx="4" fill="#9333ea"/>
                      {/* clip bar */}
                      <rect x="15" y="4" width="14" height="8" rx="3" fill="#2d1b69"/>
                      {/* lines */}
                      <rect x="13" y="20" width="18" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)"/>
                      <rect x="13" y="26" width="14" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)"/>
                      <rect x="13" y="32" width="10" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)"/>
                    </svg>
                  ),
                  title: "Label Created", desc: "Shipment registered and documentation prepared",
                },
                {
                  icon: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      {/* cargo body */}
                      <rect x="2" y="12" width="28" height="20" rx="3" fill="#9333ea"/>
                      {/* cab */}
                      <rect x="30" y="18" width="12" height="14" rx="3" fill="#2d1b69"/>
                      {/* windshield */}
                      <rect x="31" y="19" width="9" height="7" rx="1.5" fill="rgba(255,255,255,0.3)"/>
                      {/* undercarriage */}
                      <rect x="2" y="30" width="40" height="4" rx="2" fill="#7c3aed"/>
                      {/* wheel L */}
                      <circle cx="11" cy="36" r="5" fill="#1a0f3d"/>
                      <circle cx="11" cy="36" r="2.5" fill="#6d28d9"/>
                      {/* wheel R */}
                      <circle cx="33" cy="36" r="5" fill="#1a0f3d"/>
                      <circle cx="33" cy="36" r="2.5" fill="#6d28d9"/>
                    </svg>
                  ),
                  title: "In Transit", desc: "Package moving through our global logistics network",
                },
                {
                  icon: (
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      {/* circle */}
                      <circle cx="22" cy="22" r="19" fill="#059669"/>
                      {/* checkmark */}
                      <path d="M12 22 L19 29 L32 15" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  ),
                  title: "Delivered", desc: "Safe and confirmed delivery to your recipient",
                },
              ].map(f => (
                <div key={f.title} style={{
                  backgroundColor: "#f9fafb", borderRadius: "10px",
                  padding: "28px 24px", textAlign: "center" as const,
                  border: "1px solid #f0f0f0",
                }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>{f.icon}</div>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: NAVY, marginBottom: "8px" }}>{f.title}</h4>
                  <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.7", margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
