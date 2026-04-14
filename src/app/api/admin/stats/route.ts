import { NextResponse } from "next/server";
import { getAllShipments } from "@/lib/db";
import type { ShipmentStatus } from "@/lib/tracking";

export async function GET() {
  const shipments = await getAllShipments();

  const counts: Record<string, number> = {};
  for (const s of shipments) {
    counts[s.status] = (counts[s.status] ?? 0) + 1;
  }

  const recent = [...shipments]
    .sort((a, b) => {
      const aTime = a.events?.at(-1)?.timestamp ?? "0";
      const bTime = b.events?.at(-1)?.timestamp ?? "0";
      return bTime.localeCompare(aTime);
    })
    .slice(0, 6);

  return NextResponse.json({
    total: shipments.length,
    counts,
    recent,
  });
}
