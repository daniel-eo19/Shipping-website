"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_CONFIG, generateTrackingNumber, type ShipmentStatus } from "@/lib/tracking";

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
  fontWeight: "700", color: NAVY,
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

export default function NewShipmentPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    trackingNumber: generateTrackingNumber(),
    status: "label_created" as ShipmentStatus,
    service: "Express International",
    origin: "", destination: "", currentLocation: "", estimatedDelivery: "",
    shipperName: "", shipperAddress: "", shipperCity: "", shipperState: "", shipperCountry: "", shipperZip: "",
    recipientName: "", recipientAddress: "", recipientCity: "", recipientState: "", recipientCountry: "", recipientZip: "",
    pkgDescription: "", pkgWeight: "", pkgDimensions: "", pkgPieces: "1", pkgType: "General Goods", pkgValue: "",
    notes: "",
  });

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, events: [] }),
      });
      if (!res.ok) throw new Error("Save failed");
      const created = await res.json() as { id: string };
      router.push(`/admin/shipments/${created.id}`);
    } catch {
      setError("Failed to create shipment. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap" as const, gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: NAVY, margin: 0 }}>New Shipment</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>Create a new tracked shipment</p>
        </div>
        <button onClick={() => router.push("/admin/shipments")} style={{ padding: "8px 16px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", color: "#374151", fontSize: "13px", cursor: "pointer" }}>
          ← Back
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", padding: "12px 16px", color: "#b91c1c", fontSize: "13px", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Basic Information</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              <Field label="Tracking Number">
                <div style={{ display: "flex", gap: "8px" }}>
                  <input style={{ ...inputStyle, fontFamily: "monospace, monospace" }} value={form.trackingNumber} onChange={set("trackingNumber")} required />
                  <button type="button" onClick={() => setForm(f => ({ ...f, trackingNumber: generateTrackingNumber() }))}
                    style={{ padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" as const }}>
                    Generate
                  </button>
                </div>
              </Field>
              <Field label="Status">
                <select style={inputStyle} value={form.status} onChange={set("status")}>
                  {(Object.keys(STATUS_CONFIG) as ShipmentStatus[]).map(s => (
                    <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Service Type">
                <input style={inputStyle} value={form.service} onChange={set("service")} />
              </Field>
              <Field label="Est. Delivery Date">
                <input type="date" style={inputStyle} value={form.estimatedDelivery} onChange={set("estimatedDelivery")} />
              </Field>
              <Field label="Origin">
                <input style={inputStyle} value={form.origin} onChange={set("origin")} placeholder="Los Angeles, CA, USA" />
              </Field>
              <Field label="Destination">
                <input style={inputStyle} value={form.destination} onChange={set("destination")} placeholder="Lagos, Nigeria" />
              </Field>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Current Location">
                  <input style={inputStyle} value={form.currentLocation} onChange={set("currentLocation")} placeholder="e.g. London Heathrow Transit Hub, UK" />
                </Field>
              </div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Shipper Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              {([["shipperName", "Full Name / Company"], ["shipperAddress", "Address"], ["shipperCity", "City"], ["shipperState", "State / Province"], ["shipperCountry", "Country"], ["shipperZip", "ZIP / Postal Code"]] as [string, string][]).map(([key, label]) => (
                <Field key={key} label={label}>
                  <input style={inputStyle} value={form[key as keyof typeof form]} onChange={set(key)} />
                </Field>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Recipient Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              {([["recipientName", "Full Name / Company"], ["recipientAddress", "Address"], ["recipientCity", "City"], ["recipientState", "State / Province"], ["recipientCountry", "Country"], ["recipientZip", "ZIP / Postal Code"]] as [string, string][]).map(([key, label]) => (
                <Field key={key} label={label}>
                  <input style={inputStyle} value={form[key as keyof typeof form]} onChange={set(key)} />
                </Field>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Package Details</div>
          <div style={{ padding: "20px" }}>
            <div className="form-grid2" style={{ gap: "14px" }}>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Description">
                  <input style={inputStyle} value={form.pkgDescription} onChange={set("pkgDescription")} placeholder="e.g. Electronic Components - Medical Devices" />
                </Field>
              </div>
              {([["pkgWeight", "Weight (e.g. 2.4 kg)"], ["pkgDimensions", "Dimensions (L×W×H cm)"], ["pkgPieces", "Number of Pieces"], ["pkgType", "Package Type"], ["pkgValue", "Declared Value (USD)"]] as [string, string][]).map(([key, label]) => (
                <Field key={key} label={label}>
                  <input style={inputStyle} value={form[key as keyof typeof form]} onChange={set(key)} />
                </Field>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>Internal Notes (not shown to customer)</div>
          <div style={{ padding: "20px" }}>
            <textarea
              value={form.notes} onChange={set("notes")} rows={3}
              style={{ ...inputStyle, resize: "vertical" as const }}
              placeholder="Internal notes about this shipment…"
            />
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
          ℹ After creating the shipment, you can add tracking events from the edit page.
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button type="submit" disabled={saving} style={{
            padding: "12px 36px", background: GOLD, color: "#fff",
            border: "none", borderRadius: "6px", fontWeight: "700", fontSize: "13px",
            cursor: saving ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(212,175,55,0.4)",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)", opacity: saving ? 0.75 : 1,
          }}>
            {saving ? "Creating…" : "Create Shipment"}
          </button>
          <button type="button" onClick={() => router.push("/admin/shipments")} style={{ padding: "12px 24px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "6px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
