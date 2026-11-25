import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

// The live download total, read by the page every few seconds.
export async function GET() {
  const headers = { 'Cache-Control': 'no-store' };
  try {
    const db = getDb();
    if (!db) return NextResponse.json({ count: null }, { headers });
    const snap = await db.collection('stats').doc('downloads').get();
    const total = snap.exists ? Number(snap.data().total) || 0 : 0;
    return NextResponse.json({ count: total }, { headers });
  } catch (e) {
    return NextResponse.json({ count: null }, { headers });
  }
}
