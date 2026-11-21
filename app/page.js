import Site from '../components/Site';
import { getRelease } from '../lib/release';

// Rebuilt in the background every 10 minutes so the version and download link stay current.
export const revalidate = 600;

export default async function Page() {
  const release = await getRelease();
  const dateLabel = release.date
    ? new Date(release.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    : null;
  return <Site release={release} dateLabel={dateLabel} />;
}
