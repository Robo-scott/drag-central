export interface WPTrack {
  id: number;
  title: { rendered: string };
  acf: {
    track_id: string;
    sanctioning_body: 'NZDRA' | 'IHRA';
    venue_category: string;
    track_configuration_raw: string;
    primary_surface_raw: string;
    city_or_town: string;
    region: string;
    physical_location: string;
    operating_entity: string;
    website_url: string;
    contact_email: string;
    contact_phone: string;
    operational_notes: string;
    operational_status: 'ACTIVE' | 'CONDITIONAL';
  };
  slug: string;
}

export interface WPEvent {
  id: number;
  title: { rendered: string };
  acf: {
    start_at: string;
    end_at: string;
    track_id: string;
    sanctioning_body: 'NZDRA' | 'IHRA';
    official_url: string;
    event_status: string;
    featured: boolean;
    track: number[];
  };
}

export interface WPResource {
  id: number;
  title: { rendered: string };
  acf: {
    resource_type: string;
    organisation: 'NZDRA' | 'IHRA';
    official_url: string;
    summary: string;
  };
}

export type PageType = 'home' | 'tracks' | 'trackDetail' | 'nzdraEvents' | 'ihraEvents' | 'resources' | 'classifieds' | 'about' | 'benefits' | 'advertising' | 'nzdraClasses' | 'results' | 'memberPortal' | 'vehicleProfiles';

export interface AppState {
  tracks: WPTrack[];
  events: WPEvent[];
  resources: WPResource[];
  loading: boolean;
  error: string | null;
  activePage: PageType;
  previousPage: PageType | null;
  selectedTrackId: number | null;
}
