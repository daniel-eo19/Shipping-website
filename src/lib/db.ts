import fs from 'fs';
import path from 'path';
import type { Shipment } from './tracking';

// Seed file (read-only on Vercel, writable locally)
const SEED_FILE = path.join(process.cwd(), 'data', 'shipments.json');
// Runtime file (writable on Vercel /tmp, persists within container lifetime)
const TMP_FILE = '/tmp/fes_shipments.json';

interface DB {
  shipments: Shipment[];
}

function readDB(): DB {
  // Prefer runtime file (has admin edits)
  if (fs.existsSync(TMP_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8')) as DB;
    } catch {
      // fall through to seed
    }
  }
  // Fall back to seed file
  try {
    const data = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8')) as DB;
    // Copy seed to tmp so future writes work
    writeDB(data);
    return data;
  } catch {
    return { shipments: [] };
  }
}

function writeDB(data: DB): void {
  const json = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(TMP_FILE, json);
  } catch {
    // /tmp not available (e.g. test environment) — try seed file directly
    try { fs.writeFileSync(SEED_FILE, json); } catch { /* read-only fs */ }
  }
}

// ── Public API ────────────────────────────────────────────────────────────

export function getAllShipments(): Shipment[] {
  return readDB().shipments;
}

export function getShipmentById(id: string): Shipment | null {
  return readDB().shipments.find(s => s.id === id) ?? null;
}

export function getShipmentByTracking(trackingNumber: string): Shipment | null {
  return readDB().shipments.find(
    s => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase()
  ) ?? null;
}

export function createShipment(shipment: Shipment): Shipment {
  const db = readDB();
  db.shipments.push(shipment);
  writeDB(db);
  return shipment;
}

export function updateShipment(id: string, updates: Partial<Shipment>): Shipment | null {
  const db = readDB();
  const idx = db.shipments.findIndex(s => s.id === id);
  if (idx === -1) return null;
  db.shipments[idx] = { ...db.shipments[idx], ...updates, updatedAt: new Date().toISOString() };
  writeDB(db);
  return db.shipments[idx];
}

export function deleteShipment(id: string): boolean {
  const db = readDB();
  const before = db.shipments.length;
  db.shipments = db.shipments.filter(s => s.id !== id);
  if (db.shipments.length === before) return false;
  writeDB(db);
  return true;
}
