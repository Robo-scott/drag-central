import type { WPTrack, WPEvent, WPResource } from '@/types/wordpress';

const BASE_URL = 'https://fpp.ykm.mycrazydomains.me/wp-json/wp/v2';

async function fetchWithRetry<T>(url: string, retries = 1): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

export async function fetchTracks(): Promise<WPTrack[]> {
  return fetchWithRetry<WPTrack[]>(`${BASE_URL}/dc_track?per_page=100`);
}

export async function fetchEvents(): Promise<WPEvent[]> {
  return fetchWithRetry<WPEvent[]>(`${BASE_URL}/dc_event?per_page=100`);
}

export async function fetchResources(): Promise<WPResource[]> {
  return fetchWithRetry<WPResource[]>(`${BASE_URL}/dc_resource?per_page=100`);
}

export async function fetchAllData() {
  const [tracks, events, resources] = await Promise.all([
    fetchTracks(),
    fetchEvents(),
    fetchResources(),
  ]);
  return { tracks, events, resources };
}
