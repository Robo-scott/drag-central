import { create } from 'zustand';
import type { PageType, WPTrack, WPEvent, WPResource } from '@/types/wordpress';

interface StoreState {
  // Data
  tracks: WPTrack[];
  events: WPEvent[];
  resources: WPResource[];
  loading: boolean;
  error: string | null;

  // Navigation
  activePage: PageType;
  previousPage: PageType | null;
  selectedTrackId: number | null;

  // Auth
  isLoggedIn: boolean;
  showLogin: boolean;

  // Actions
  setTracks: (tracks: WPTrack[]) => void;
  setEvents: (events: WPEvent[]) => void;
  setResources: (resources: WPResource[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  navigate: (page: PageType) => void;
  selectTrack: (id: number) => void;
  login: () => void;
  logout: () => void;
  setShowLogin: (show: boolean) => void;

  // Derived
  getFilteredTracks: (filter: string, search: string) => WPTrack[];
  getTrackById: (id: number) => WPTrack | undefined;
  getEventsByBody: (body: 'NZDRA' | 'IHRA') => WPEvent[];
  getResourcesByOrg: (org: 'NZDRA' | 'IHRA') => WPResource[];
}

export const useStore = create<StoreState>((set, get) => ({
  tracks: [],
  events: [],
  resources: [],
  loading: true,
  error: null,
  activePage: 'home',
  previousPage: null,
  selectedTrackId: null,
  isLoggedIn: false,
  showLogin: false,

  setTracks: (tracks) => set({ tracks }),
  setEvents: (events) => set({ events }),
  setResources: (resources) => set({ resources }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  navigate: (page) =>
    set((state) => ({
      previousPage: state.activePage,
      activePage: page,
    })),

  selectTrack: (id) =>
    set((state) => ({
      previousPage: state.activePage,
      selectedTrackId: id,
      activePage: 'trackDetail',
    })),

  login: () => set({ isLoggedIn: true, showLogin: false }),
  logout: () => set({ isLoggedIn: false, activePage: 'home' }),
  setShowLogin: (show) => set({ showLogin: show }),

  getFilteredTracks: (filter, search) => {
    const { tracks } = get();
    let result = tracks;
    if (filter !== 'ALL') {
      result = result.filter((t) => t.acf.operational_status === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.rendered.toLowerCase().includes(q) ||
          t.acf.city_or_town.toLowerCase().includes(q) ||
          t.acf.region.toLowerCase().includes(q)
      );
    }
    return result;
  },

  getTrackById: (id) => {
    return get().tracks.find((t) => t.id === id);
  },

  getEventsByBody: (body) => {
    return get().events.filter((e) => e.acf.sanctioning_body === body);
  },

  getResourcesByOrg: (org) => {
    return get().resources.filter((r) => r.acf.organisation === org);
  },
}));
