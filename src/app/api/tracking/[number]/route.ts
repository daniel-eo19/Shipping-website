import { NextResponse } from 'next/server';
import { getShipmentByTracking } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const shipment = getShipmentByTracking(number);
  if (!shipment) {
    return NextResponse.json({ error: 'Tracking number not found' }, { status: 404 });
  }
  // Don't expose admin-only notes to the public
  const { notes: _n, proofOfDelivery: _p, ...publicData } = shipment;
  return NextResponse.json(publicData);
}
