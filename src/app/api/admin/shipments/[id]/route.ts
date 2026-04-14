import { NextResponse } from 'next/server';
import { getShipmentById, updateShipment, deleteShipment } from '@/lib/db';
import type { Shipment } from '@/lib/tracking';

// GET /api/admin/shipments/:id
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const shipment = getShipmentById(id);
  if (!shipment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(shipment);
}

// PUT /api/admin/shipments/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json() as Partial<Shipment>;
  const updated = updateShipment(id, body);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/admin/shipments/:id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = deleteShipment(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
