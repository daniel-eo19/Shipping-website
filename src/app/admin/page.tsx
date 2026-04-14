"use client";

import { useEffect, useState } from "react";
import { STATUS_CONFIG, formatDate, type Shipment, type ShipmentStatus } from "@/lib/tracking";

const NAVY = "#2d1b69";
const TEAL = "#9333ea";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

type Stats = {
  total: number;
  counts: Record<string, number>;
  recent: Shipment[];
};

function StatCard({ label, value, color, sub }: { label: string; value: number; color: string; sub?: string }) {
  return (
    <div style={{
      backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb",
      padding: "20px 24px", display: "flex", flexDirection: "column" as const, gap: "6px",
    }}>
      <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>{label}</div>
      <div style={{ fontSize: "32px", fontWeight: "800", color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: "#9ca3af" }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then((d: Stats) => setStats(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center" as const, padding: "80px", color: "#9ca3af" }}>
      Loading dashboard…
    </div>
  );

  if (!stats) return null;

  const inTransit = (stats.counts["in_transit"] ?? 0) + (stats.counts["out_for_delivery"] ?? 0) + (stats.counts["at_facility"] ?? 0);
  const delivered = stats.counts["delivered"] ?? 0;
  const delayed = (stats.counts["delayed"] ?? 0) + (stats.counts["exception"] ?? 0) + (stats.counts["pending_clearance"] ?? 0);
  const pending = (stats.counts["label_created"] ?? 0) + (stats.counts["picked_up"] ?? 0);

  const statusGroups = [
    { label: "In Transit", count: inTransit, color: TEAL },
    { label: "Delivered", count: delivered, color: "#059669" },
    { label: "Delayed / Exception", count: delayed, color: "#dc2626" },
    { label: "Pending", count: pending, color: "#d97706" },
    { label: "Returned", count: stats.counts["returned"] ?? 0, color: "#6b7280" },
  ].filter(g => g.count > 0);

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: NAVY, margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>Overview of all shipments</p>
      </div>

      {/* Stat cards */}
      <div className="sg4" style={{ gap: "16px", marginBottom: "24px" }}>
        <StatCard label="Total Shipments" value={stats.total} color={NAVY} sub="all time" />
        <StatCard label="In Transit" value={inTransit} color={TEAL} sub="active" />
        <StatCard label="Delivered" value={delivered} color="#059669" sub="completed" />
        <StatCard label="Delayed / Issue" value={delayed} color="#dc2626" sub="needs attention" />
      </div>

      {/* Status breakdown */}
      {stats.total > 0 && (
        <div style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "24px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: NAVY, marginBottom: "16px" }}>Status Breakdown</div>
          {/* Progress bar */}
          <div style={{ display: "flex", height: "10px", borderRadius: "99px", overflow: "hidden", marginBottom: "16px", gap: "2px" }}>
            {statusGroups.map(g => (
              <div key={g.label} style={{ flex: g.count, backgroundColor: g.color, transition: "flex 0.4s ease" }} />
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "16px" }}>
            {statusGroups.map(g => (
              <div key={g.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: g.color, flexShrink: 0 }} />
                <span style={{ color: "#374151", fontWeight: "600" }}>{g.label}</span>
                <span style={{ color: "#9ca3af" }}>({g.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Per-status detail */}
      <div style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: NAVY, marginBottom: "16px" }}>All Statuses</div>
        <div className="sg3" style={{ gap: "10px" }}>
          {(Object.keys(STATUS_CONFIG) as ShipmentStatus[]).map(s => {
            const cfg = STATUS_CONFIG[s];
            const count = stats.counts[s] ?? 0;
            return (
              <div key={s} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: "8px",
                backgroundColor: count > 0 ? cfg.bg : "#f9fafb",
                border: `1px solid ${count > 0 ? cfg.border : "#e5e7eb"}`,
                opacity: count === 0 ? 0.5 : 1,
              }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: count > 0 ? cfg.color : "#9ca3af" }}>{cfg.label}</span>
                <span style={{ fontSize: "16px", fontWeight: "800", color: count > 0 ? cfg.color : "#d1d5db" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent shipments */}
      <div style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: NAVY }}>Recent Shipments</div>
          <a href="/admin/shipments" style={{ fontSize: "12px", color: TEAL, fontWeight: "600", textDecoration: "none" }}>
            View all →
          </a>
        </div>

        {stats.recent.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center" as const, color: "#9ca3af", fontSize: "13px" }}>
            No shipments yet.{" "}
            <a href="/admin/shipments/new" style={{ color: TEAL, fontWeight: "600", textDecoration: "none" }}>Create your first →</a>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Tracking #", "Status", "Route", "Recipient", "Est. Delivery", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left" as const, fontWeight: "700", color: "#374151", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((s, i) => {
                const cfg = STATUS_CONFIG[s.status as ShipmentStatus] ?? STATUS_CONFIG.label_created;
                return (
                  <tr key={s.id} style={{ borderBottom: i < stats.recent.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontFamily: "monospace, monospace", fontWeight: "700", color: NAVY, fontSize: "13px" }}>
                        {s.trackingNumber}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{s.service}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700",
                        backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                        whiteSpace: "nowrap" as const,
                      }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#374151" }}>
                      <div style={{ fontWeight: "600", fontSize: "12px" }}>{s.origin}</div>
                      <div style={{ color: "#9ca3af", fontSize: "11px" }}>→ {s.destination}</div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: "600", color: "#374151", fontSize: "12px" }}>{s.recipientName}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{s.recipientCity}, {s.recipientCountry}</div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#374151", whiteSpace: "nowrap" as const, fontSize: "12px" }}>
                      {s.estimatedDelivery ? formatDate(s.estimatedDelivery) : "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <a href={`/admin/shipments/${s.id}`} style={{
                        padding: "4px 12px", borderRadius: "5px", fontSize: "12px",
                        fontWeight: "600", textDecoration: "none",
                        backgroundColor: "#ede9fe", color: TEAL,
                        border: "1px solid #c4b5fd",
                      }}>
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
        <a href="/admin/shipments/new" style={{
          background: GOLD, color: "#fff", textDecoration: "none",
          padding: "12px 28px", borderRadius: "6px", fontSize: "13px",
          fontWeight: "700", textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          boxShadow: "0 2px 8px rgba(212,175,55,0.4)",
        }}>
          + New Shipment
        </a>
        <a href="/admin/shipments" style={{
          backgroundColor: "#fff", color: NAVY, textDecoration: "none",
          padding: "12px 24px", borderRadius: "6px", fontSize: "13px",
          fontWeight: "600", border: "1px solid #e5e7eb",
        }}>
          All Shipments →
        </a>
      </div>
    </div>
  );
}
