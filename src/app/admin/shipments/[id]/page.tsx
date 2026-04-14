"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  STATUS_CONFIG, formatDateTime, generateId,
  type Shipment, type ShipmentStatus, type TrackingEvent,
} from "@/lib/tracking";

const NAVY = "#2d1b69";
const TEAL = "#9333ea";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", border: "1px solid #e5e7eb",
  borderRadius: "6px", fontSize: "13px", outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};
const sectionStyle: React.CSSProperties = {
  backgroundColor: "#fff", border: "1px solid #e5e7eb",
  borderRadius: "10px", marginBottom: "20px", overflow: "hidden",
};
const sectionHeaderStyle: React.CSSProperties = {
  padding: "14px 20px", backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb", fontSize: "13px",
  fontWeight: "700", color: NAVY, display: "flex",
  justifyContent: "space-between", alignItems: "center",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "#374151", marginBottom: "5px", textTransform: "uppercase" as const, letterSpacing: "0.4px" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Add Event Form ──
function EventForm({ onAdd }: { onAdd: (evt: TrackingEvent) => void }) {
  const [form, setForm] = useState({
    status: "in_transit" as ShipmentStatus,
    location: "", description: "",
    timestamp: new Date().toISOString().slice(0, 16),
  });

  function handleAdd() {
    if (!form.location || !form.description) return;
    onAdd({
      id: generateId("evt"),
      status: form.status,
      location: form.location,
      description: form.description,
      timestamp: new Date(form.timestamp).toISOString(),
    });
    setForm(f => ({ ...f, location: "", description: "", timestamp: new Date().toISOString().slice(0, 16) }));
  }

  return (
    <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
      <div style={{ fontSize: "12px", fontWeight: "700", color: NAVY, marginBottom: "12px" }}>Add New Event</div>
      <div className="form-grid2" style={{ gap: "10px", marginBottom: "10px" }}>
        <Field label="Status">
          <select style={inputStyle} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ShipmentStatus }))}>
            {(Object.keys(STATUS_CONFIG) as ShipmentStatus[]).map(s => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
        </Field>
        <Field label="Timestamp">
          <input type="datetime-local" style={inputStyle} value={form.timestamp} onChange={e => setForm(f => ({ ...f, timestamp: e.target.value }))} />
        </Field>
        <Field label="Location">
          <input style={inputStyle} value={form.location} placeholder="e.g. London Heathrow Hub, UK" onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        </Field>
        <Field label="Description">
          <input style={inputStyle} value={form.description} placeholder="e.g. Arrived at transit hub" onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </Field>
      </div>
      <button type="button" onClick={handleAdd} style={{
        padding: "9px 20px", background: TEAL, color: "#fff",
        border: "none", borderRadius: "6px", fontSize: "12px",
        fontWeight: "700", cursor: "pointer",
      }}>
        + Add Event
      </button>
    </div>
  );
}

// ── Main Edit Page ──
export default function EditShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<Partial<Shipment>>({});
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/shipments/${id}`)
      .then(r => r.json())
      .then((data: Shipment) => {
        setForm(data);
        setEvents(data.events ?? []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));
  }

  function handleAddEvent(evt: TrackingEvent) {
    setEvents(prev => [...prev, evt].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
  }

  function handleRemoveEvent(evtId: string) {
    setEvents(prev => prev.filter(e => e.id !== evtId));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");
    try {
      const res = await fetch(`/api/admin/shipments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, events }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: "60px", textAlign: "center" as const, color: "#9ca3af" }}>Loading shipment…</div>;

  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap" as const, gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: NAVY, margin: 0 }}>Edit Shipment</h1>
          <p style={{ fontSize: "13px", fontFamily: "monospace, monospace", color: TEAL, fontWeight: "700", margin: "4px 0 0" }}>
            {form.trackingNumber}
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
          <a href={`/track`} target="_blank" style={{ padding: "8px 16px", border: `1px solid ${TEAL}`, borderRadius: "6px", color: TEAL, backgroundColor: "#faf5ff", fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
            Preview ↗
          </a>
          <button onClick={() => router.push("/admin/shipments")} style={{ padding: "8px 16px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", color: "#374151", fontSize: "13px", cursor: "pointer" }}>
            ← All Shipments
          </button>
        </div>
      </div>

      {success && <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px", padding: "12px 16px", color: "#166534", fontSize: "13px", fontWeight: "600", marginBottom: "20px" }}>✓ Shipment saved successfully.</div>}
      {error && <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "12px 16px", color: "#b91c1c", fontSize: "13px", marginBottom: "20px" }}>{error}</div>}

      <form onSubmit={handleSave}>
        {/* Basic Info */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Basic Information</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              <Field label="Tracking Number">
                <input style={{ ...inputStyle, fontFamily: "monospace, monospace" }} value={form.trackingNumber ?? ""} onChange={set("trackingNumber")} required />
              </Field>
              <Field label="Status">
                <select style={inputStyle} value={form.status ?? "label_created"} onChange={set("status")}>
                  {(Object.keys(STATUS_CONFIG) as ShipmentStatus[]).map(s => (
                    <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Service Type">
                <input style={inputStyle} value={form.service ?? ""} onChange={set("service")} />
              </Field>
              <Field label="Est. Delivery Date">
                <input type="date" style={inputStyle} value={form.estimatedDelivery ?? ""} onChange={set("estimatedDelivery")} />
              </Field>
              <Field label="Origin">
                <input style={inputStyle} value={form.origin ?? ""} onChange={set("origin")} />
              </Field>
              <Field label="Destination">
                <input style={inputStyle} value={form.destination ?? ""} onChange={set("destination")} />
              </Field>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Current Location">
                  <input style={inputStyle} value={form.currentLocation ?? ""} onChange={set("currentLocation")} />
                </Field>
              </div>
            </div>
          </div>
        </div>

        {/* Shipper */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Shipper Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              {([["shipperName","Name / Company"],["shipperAddress","Address"],["shipperCity","City"],["shipperState","State"],["shipperCountry","Country"],["shipperZip","ZIP"]] as [string,string][]).map(([k,l]) => (
                <Field key={k} label={l}><input style={inputStyle} value={form[k as keyof Shipment] as string ?? ""} onChange={set(k)} /></Field>
              ))}
            </div>
          </div>
        </div>

        {/* Recipient */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Recipient Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              {([["recipientName","Name / Company"],["recipientAddress","Address"],["recipientCity","City"],["recipientState","State"],["recipientCountry","Country"],["recipientZip","ZIP"]] as [string,string][]).map(([k,l]) => (
                <Field key={k} label={l}><input style={inputStyle} value={form[k as keyof Shipment] as string ?? ""} onChange={set(k)} /></Field>
              ))}
            </div>
          </div>
        </div>

        {/* Package */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Package Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Description"><input style={inputStyle} value={form.pkgDescription ?? ""} onChange={set("pkgDescription")} /></Field>
              </div>
              {([["pkgWeight","Weight"],["pkgDimensions","Dimensions"],["pkgPieces","Pieces"],["pkgType","Type"],["pkgValue","Declared Value"]] as [string,string][]).map(([k,l]) => (
                <Field key={k} label={l}><input style={inputStyle} value={form[k as keyof Shipment] as string ?? ""} onChange={set(k)} /></Field>
              ))}
            </div>
          </div>
        </div>

        {/* Tracking Events */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <span>Tracking Events</span>
            <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "400" }}>
              {events.length} event{events.length !== 1 ? "s" : ""} · newest shown first to customer
            </span>
          </div>
          <div style={{ padding: "20px" }}>
            <EventForm onAdd={handleAddEvent} />
            {events.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#9ca3af", textAlign: "center" as const, padding: "20px 0" }}>
                No events yet. Add the first tracking event above.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                {[...events].reverse().map((evt, idx) => {
                  const cfg = STATUS_CONFIG[evt.status];
                  return (
                    <div key={evt.id} style={{
                      border: `1px solid ${idx === 0 ? "#c4b5fd" : "#e5e7eb"}`,
                      borderLeft: `3px solid ${idx === 0 ? TEAL : "#e5e7eb"}`,
                      borderRadius: "6px", padding: "12px 16px",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                      backgroundColor: idx === 0 ? "#faf5ff" : "#fff",
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" as const }}>
                          <span style={{ padding: "2px 8px", borderRadius: "10px", backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, fontSize: "10px", fontWeight: "700" }}>
                            {cfg.label}
                          </span>
                          {idx === 0 && <span style={{ fontSize: "10px", color: TEAL, fontWeight: "700" }}>LATEST</span>}
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#111827", marginBottom: "2px" }}>{evt.description}</div>
                        <div style={{ fontSize: "11px", color: "#6b7280" }}>{formatDateTime(evt.timestamp)} · {evt.location}</div>
                      </div>
                      <button type="button" onClick={() => handleRemoveEvent(evt.id)} style={{
                        background: "none", border: "1px solid #fca5a5", color: "#ef4444",
                        borderRadius: "4px", padding: "4px 10px", fontSize: "12px",
                        cursor: "pointer", flexShrink: 0, marginLeft: "12px",
                      }}>
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Internal Notes</div>
          <div style={{ padding: "20px" }}>
            <textarea value={form.notes ?? ""} onChange={set("notes")} rows={3}
              style={{ ...inputStyle, resize: "vertical" as const }}
              placeholder="Internal notes — not visible to customers" />
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", paddingBottom: "40px" }}>
          <button type="submit" disabled={saving} style={{
            padding: "12px 36px", background: GOLD, color: "#fff",
            border: "none", borderRadius: "6px", fontWeight: "700", fontSize: "13px",
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(212,175,55,0.4)",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: saving ? 0.75 : 1,
          }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button type="button" onClick={() => router.push("/admin/shipments")} style={{ padding: "12px 24px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
