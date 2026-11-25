import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getRelease } from '../../../lib/release';
import { FieldValue, getDb } from '../../../lib/db';

export const dynamic = 'force-dynamic';

const BOT = /bot|crawl|spider|preview|slurp|headless|facebookexternalhit|curl|wget|python|go-http|java\//i;
const SAME_PERSON_MS = 10 * 60 * 1000;

// One real download = one tap on Install. The same phone tapping again within 10 minutes counts once,
// and crawlers never count. The visitor is then sent straight on to the newest APK.
export const maxDuration = 60;

export async function GET(request) {
  const release = await getRelease();
  const target = release.url;
  if (!target) return NextResponse.redirect(new URL('/', request.url), 302);
  try {
    const ua = request.headers.get('user-agent') || '';
    const db = getDb();
    if (db && ua && !BOT.test(ua)) {
      const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
      const who = crypto.createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 32);
      const hit = db.collection('downloadHits').doc(who);
      const stats = db.collection('stats').doc('downloads');
      const field = 'v_' + String(release.version || 'latest').replace(/[^0-9A-Za-z]/g, '_');
      await Promise.race([
        db.runTransaction(async (tx) => {
          const seen = await tx.get(hit);
          const now = Date.now();
          if (seen.exists && now - (seen.data().at || 0) < SAME_PERSON_MS) return;
          tx.set(hit, { at: now });
          tx.set(stats, { total: FieldValue.increment(1), [field]: FieldValue.increment(1), updatedAt: now }, { merge: true });
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    }
  } catch (e) {
    // never block the download because counting failed
  }
  // Stream the file instead of redirecting, so no repository URL is ever sent to the visitor.
  try {
    const upstream = await fetch(target, { redirect: 'follow' });
    if (!upstream.ok || !upstream.body) throw new Error('upstream');
    const headers = new Headers({
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Disposition': `attachment; filename="Kiro${release.version ? '-' + release.version : ''}.apk"`,
      'Cache-Control': 'no-store',
    });
    const len = upstream.headers.get('content-length');
    if (len) headers.set('Content-Length', len);
    return new Response(upstream.body, { status: 200, headers });
  } catch (e) {
    return NextResponse.redirect(new URL('/', request.url), 302);
  }
}
