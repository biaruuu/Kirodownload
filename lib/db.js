import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

export { FieldValue };

// Firestore on the server only. Set FIREBASE_SERVICE_ACCOUNT in Vercel (the service account JSON, or
// that JSON base64 encoded). Without it the site still works; it just does not count downloads.
export function getDb() {
  let raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    raw = raw.trim();
    if (!raw.startsWith('{')) raw = Buffer.from(raw, 'base64').toString('utf8');
    if (!getApps().length) initializeApp({ credential: cert(JSON.parse(raw)) });
    return getFirestore();
  } catch (e) {
    return null;
  }
}
