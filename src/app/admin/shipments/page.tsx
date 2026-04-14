"use client";

import { useEffect, useState } from "react";
import { STATUS_CONFIG, formatDate, type Shipment, type ShipmentStatus } from "@/lib/tracking";

const NAVY = "#2d1b69";
const TEAL = "#9333ea";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/shipments")
      .then(r => r.json())
      .then((data: Shipment[]) => setShipments(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, trackingNumber: string) {
    if (!confirm(`Delete shipment ${trackingNumber}? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/shipments/${id}`, { method: "DELETE" });
    setShipments(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
  }

  const filtered = shipments.filter(s =>
    s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.recipientName.toLowerCase().includes(search.toLowerCase()) ||
    s.origin.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap" as const, gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: NAVY, margin: 0 }}>Shipments</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
            {shipments.length} shipment{shipments.length !== 1 ? "s" : ""} in the system
          </p>
        </div>
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search tracking #, recipient, route…"
          style={{ padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "13px", outline: "none", minWidth: "260px", fontFamily: "inherit" }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center" as const, padding: "60px", color: "#9ca3af" }}>Loading shipments…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center" as const, padding: "60px", backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", color: "#9ca3af" }}>
          {search ? "No shipments match your search." : "No shipments yet. Create your first one →"}
        </div>
      ) : (
        <div style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Tracking #", "Status", "Route", "Recipient", "Est. Delivery", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left" as const, fontWeight: "700", color: "#374151", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.5px", whiteSpace: "nowrap" as const }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const cfg = STATUS_CONFIG[s.status as ShipmentStatus] ?? STATUS_CONFIG.label_created;
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6", backgroundColor: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontFamily: "monospace, monospace", fontWeight: "700", color: NAVY, fontSize: "13px" }}>
                        {s.trackingNumber}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{s.service}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "700",
                        backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                        whiteSpace: "nowrap" as const,
                      }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#374151" }}>
                      <div style={{ fontWeight: "600" }}>{s.origin}</div>
                      <div style={{ color: "#9ca3af", fontSize: "12px" }}>→ {s.destination}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: "600", color: "#374151" }}>{s.recipientName}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{s.recipientCity}, {s.recipientCountry}</div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#374151", whiteSpace: "nowrap" as const }}>
                      {s.estimatedDelivery ? formatDate(s.estimatedDelivery) : "—"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <a href={`/admin/shipments/${s.id}`} style={{
                          padding: "5px 12px", borderRadius: "5px", fontSize: "12px",
                          fontWeight: "600", textDecoration: "none",
                          backgroundColor: "#ede9fe", color: TEAL,
                          border: `1px solid #c4b5fd`,
                        }}>
                          Edit
                        </a>
                        <a href={`/track?q=${s.trackingNumber}`} target="_blank" style={{
                          padding: "5px 12px", borderRadius: "5px", fontSize: "12px",
                          fontWeight: "600", textDecoration: "none",
                          backgroundColor: "#f0fdf4", color: "#065f46",
                          border: "1px solid #86efac",
                        }}>
                          Preview ↗
                        </a>
                        <button
                          onClick={() => handleDelete(s.id, s.trackingNumber)}
                          disabled={deleting === s.id}
                          style={{
                            padding: "5px 12px", borderRadius: "5px", fontSize: "12px",
                            fontWeight: "600", cursor: "pointer",
                            backgroundColor: "#fff1f2", color: "#e11d48",
                            border: "1px solid #fecdd3",
                            opacity: deleting === s.id ? 0.5 : 1,
                          }}
                        >
                          {deleting === s.id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
