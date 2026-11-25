import Site from '../components/Site';
import { getRelease } from '../lib/release';

// Rebuilt in the background every 10 minutes so the version and download link stay current.
export const revalidate = 600;

export default async function Page() {
  const release = await getRelease();
  return <Site release={release} />;
}
