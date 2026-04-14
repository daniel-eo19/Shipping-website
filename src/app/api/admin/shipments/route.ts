import { NextResponse } from 'next/server';
import { getAllShipments, createShipment } from '@/lib/db';
import { generateId, generateTrackingNumber } from '@/lib/tracking';
import type { Shipment } from '@/lib/tracking';

// GET /api/admin/shipments
export async function GET() {
  return NextResponse.json(getAllShipments());
}

// POST /api/admin/shipments
export async function POST(req: Request) {
  const body = await req.json() as Partial<Shipment>;
  const now = new Date().toISOString();

  const shipment: Shipment = {
    id: generateId('shp'),
    trackingNumber: body.trackingNumber || generateTrackingNumber(),
    status: body.status || 'label_created',
    service: body.service || 'Standard International',
    shipperName: body.shipperName || '',
    shipperAddress: body.shipperAddress || '',
    shipperCity: body.shipperCity || '',
    shipperState: body.shipperState || '',
    shipperCountry: body.shipperCountry || '',
    shipperZip: body.shipperZip || '',
    recipientName: body.recipientName || '',
    recipientAddress: body.recipientAddress || '',
    recipientCity: body.recipientCity || '',
    recipientState: body.recipientState || '',
    recipientCountry: body.recipientCountry || '',
    recipientZip: body.recipientZip || '',
    pkgDescription: body.pkgDescription || '',
    pkgWeight: body.pkgWeight || '',
    pkgDimensions: body.pkgDimensions || '',
    pkgPieces: body.pkgPieces || '1',
    pkgType: body.pkgType || '',
    pkgValue: body.pkgValue || '',
    origin: body.origin || '',
    destination: body.destination || '',
    currentLocation: body.currentLocation || '',
    estimatedDelivery: body.estimatedDelivery || '',
    events: body.events || [],
    notes: body.notes || '',
    proofOfDelivery: body.proofOfDelivery ?? null,
    createdAt: now,
    updatedAt: now,
  };

  createShipment(shipment);
  return NextResponse.json(shipment, { status: 201 });
}
