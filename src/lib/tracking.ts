// ── Types ──────────────────────────────────────────────────────────────────

export type ShipmentStatus =
  | 'label_created'
  | 'picked_up'
  | 'in_transit'
  | 'arrived_facility'
  | 'departed_facility'
  | 'customs_clearance'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception'
  | 'delayed';

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  service: string;

  // Shipper
  shipperName: string;
  shipperAddress: string;
  shipperCity: string;
  shipperState: string;
  shipperCountry: string;
  shipperZip: string;

  // Recipient
  recipientName: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientCountry: string;
  recipientZip: string;

  // Package
  pkgDescription: string;
  pkgWeight: string;
  pkgDimensions: string;
  pkgPieces: string;
  pkgType: string;
  pkgValue: string;

  // Routing
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;

  // Timeline (stored chronologically, displayed newest-first)
  events: TrackingEvent[];

  // Admin
  notes: string;
  proofOfDelivery?: string | null;

  createdAt: string;
  updatedAt: string;
}

// ── Status Config ─────────────────────────────────────────────────────────

export interface StatusMeta {
  label: string;
  color: string;     // text
  bg: string;        // background
  border: string;    // border
  step: number;      // 0–5 progress position (-1 = overlay/exception)
}

export const STATUS_CONFIG: Record<ShipmentStatus, StatusMeta> = {
  label_created:    { label: 'Label Created',       color: '#374151', bg: '#f3f4f6', border: '#d1d5db', step: 0 },
  picked_up:        { label: 'Picked Up',           color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd', step: 1 },
  in_transit:       { label: 'In Transit',          color: '#6d28d9', bg: '#ede9fe', border: '#c4b5fd', step: 2 },
  arrived_facility: { label: 'At Facility',         color: '#92400e', bg: '#fef3c7', border: '#fcd34d', step: 2 },
  departed_facility:{ label: 'Departed Facility',   color: '#6d28d9', bg: '#ede9fe', border: '#c4b5fd', step: 2 },
  customs_clearance:{ label: 'Customs Clearance',   color: '#c2410c', bg: '#ffedd5', border: '#fdba74', step: 3 },
  out_for_delivery: { label: 'Out for Delivery',    color: '#065f46', bg: '#d1fae5', border: '#6ee7b7', step: 4 },
  delivered:        { label: 'Delivered',           color: '#14532d', bg: '#dcfce7', border: '#86efac', step: 5 },
  exception:        { label: 'Exception',           color: '#991b1b', bg: '#fee2e2', border: '#fca5a5', step: -1 },
  delayed:          { label: 'Delayed',             color: '#92400e', bg: '#fef3c7', border: '#fcd34d', step: -1 },
};

// Progress steps shown on the customer tracking bar
export const PROGRESS_STEPS = [
  { key: 'label_created',     label: 'Label Created' },
  { key: 'picked_up',         label: 'Picked Up' },
  { key: 'in_transit',        label: 'In Transit' },
  { key: 'customs_clearance', label: 'Customs' },
  { key: 'out_for_delivery',  label: 'Out for Delivery' },
  { key: 'delivered',         label: 'Delivered' },
];

// ── Helpers ───────────────────────────────────────────────────────────────

/** Which step index (0–5) is currently active */
export function getActiveStep(status: ShipmentStatus): number {
  const step = STATUS_CONFIG[status].step;
  if (step < 0) return 2; // exception / delayed shows at "In Transit" step
  return step;
}

/** Format ISO timestamp → "Apr 14, 2026 — 11:45 AM UTC" */
export function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short',
    });
  } catch {
    return iso;
  }
}

/** Format ISO date → "April 18, 2026" */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
    });
  } catch {
    return iso;
  }
}

/** Generate a new FES tracking number */
export function generateTrackingNumber(): string {
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  return `FES${digits}`;
}

/** Generate a new unique ID */
export function generateId(prefix = 'shp'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
