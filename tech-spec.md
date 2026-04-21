# Drag Central NZ — Technical Specification

## Dependencies

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | React plugin for Vite |
| typescript | ^5.6.0 | Type safety |
| @types/react | ^19.0.0 | React type definitions |
| @types/react-dom | ^19.0.0 | ReactDOM type definitions |
| @types/three | ^0.170.0 | Three.js type definitions |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^3.4.0 | Utility-first CSS framework |
| postcss | ^8.4.0 | CSS processing |
| autoprefixer | ^10.4.0 | CSS vendor prefixes |
| sass | ^1.80.0 | SCSS support for velocity-stack |

### 3D / Core Effect
| Package | Version | Purpose |
|---------|---------|---------|
| three | ^0.170.0 | WebGL 3D engine — topographic speed map |
| @react-three/fiber | ^9.0.0 | React renderer for Three.js |
| @react-three/drei | ^9.0.0 | Helpers (shaderMaterial) |
| vite-plugin-glsl | ^1.3.0 | GLSL shader imports in Vite |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.12.0 | Scroll-triggered animations, page transitions |
| lenis | ^1.1.0 | Smooth scrolling |

### State & Data
| Package | Version | Purpose |
|---------|---------|---------|
| zustand | ^5.0.0 | Lightweight global state management |

### Fonts (loaded via Google Fonts CDN in index.html)
- Rajdhani (700)
- Montserrat (700)
- Inter (400, 500)

---

## Component Inventory

### Layout Components

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| TopographicCanvas | Custom | Global | R3F Canvas — fixed background on all pages |
| BottomNav | Custom | Global | 64px fixed bottom nav with 4 items |
| PageTransition | Custom | Global | Wraps page content, handles fade in/out |
| ScrollIndicator | Custom | Home | Animated pulsing line at hero bottom |
| BackToTop | Custom | Global | Appears after 300px scroll |

### Page Sections

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| HomeHero | Custom | Home | Logo + tagline + hero title over canvas |
| QuickActions | Custom | Home | 3 stacked action cards (Tracks, NZDRA, IHRA) |
| EventsPreview | Custom | Home | Horizontal-scrolling event cards |
| ResourcesPreview | Custom | Home | 2-column resource cards |
| Footer | Custom | Global | Copyright + social icons |
| TrackDirectoryHeader | Custom | Tracks | Hero image + title + filter bar |
| TrackList | Custom | Tracks | Vertical list of TrackCard |
| TrackDetailHero | Custom | TrackDetail | Full-width track image + info badges |
| TrackInfo | Custom | TrackDetail | Light-section info grid + contact |
| EventsHeader | Custom | NZDRA/IHRA | Hero + title (accent color prop) |
| EventsList | Custom | NZDRA/IHRA | Vertical event rows |
| ResourcesHeader | Custom | Resources | Title + subtitle |
| ResourcesList | Custom | Resources | NZDRA/IHRA resource sections |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| TrackCard | Custom | TrackList | Thumbnail + name + location + CTA |
| EventCard | Custom | EventsPreview | Date badge + track + event name |
| EventRow | Custom | EventsList | Date + track + event (compact row) |
| ResourceCard | Custom | ResourcesList, ResourcesPreview | Title + description + VIEW button |
| QuickActionCard | Custom | QuickActions | Icon + title + subtitle + chevron |
| VelocityStack | Custom | TrackDirectoryHeader | 10-layer typography effect (SCSS) |
| SkeletonCard | Custom | Global | Pulse-loading placeholder |
| FilterBar | Custom | TrackDirectoryHeader | ALL/ACTIVE/CONDITIONAL + search |
| StatusBadge | Custom | TrackCard, TrackInfo | ACTIVE (green) / CONDITIONAL (amber) |
| SanctioningBadge | Custom | Multiple | NZDRA (blue) / IHRA (gold) badge |
| LoadingSpinner | Custom | Global | Simple CSS spinner |

### Hooks

| Hook | Purpose |
|------|---------|
| useWordPressAPI | Fetch tracks/events/resources from WP REST API |
| usePageTransition | GSAP fade in/out on page change |
| useFluidPointer | Track pointer state for canvas fluid sim |
| useScrollDirection | Detect scroll direction for nav/show-hide |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Topographic Speed Map (fluid sim) | Three.js + R3F + custom GLSL | Ping-pong FBO fluid simulation with display shader. Custom shaderMaterial with two render targets (512x512, HalfFloat). Pointer-driven iMouse uniform. | 🔒 High |
| Velocity Stack Typography | SCSS | 10-layer `<li>` stack with incremental `left` offsets, `clip-path` split pseudo-elements, `mix-blend-mode: screen`. Generated via SCSS `@for` loop. | 🔒 High |
| Page Transitions | GSAP | Fade out (opacity 1→0, 0.2s) → swap content → fade in (opacity 0→1, 0.3s, 0.1s delay). Triggered on activePage state change. | Low |
| Quick Action Cards Stagger | GSAP + ScrollTrigger | `translateX(30px)→0`, opacity 0→1, 0.4s each, 0.1s stagger. ScrollTrigger start: "top 80%". | Low |
| Skeleton Pulse | CSS | `background-position` animation on gradient. Pure CSS keyframes. | Low |
| Scroll Indicator Pulse | CSS | Animated `transform: translateY()` + opacity pulse. Infinite loop. | Low |
| Horizontal Event Scroll | CSS | `overflow-x: auto`, `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`. | Low |
| Touch Active States | CSS | `:active` pseudo-class `transform: scale(0.98)`. | Low |
| Filter Bar Sticky | CSS | `position: sticky`, `top: 0`. | Low |

---

## State & Logic Plan

### Zustand Store Architecture

Single store manages navigation state, cached API data, and derived selectors.

```typescript
interface AppState {
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

  // Actions
  setTracks: (tracks: WPTrack[]) => void;
  setEvents: (events: WPEvent[]) => void;
  setResources: (resources: WPResource[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  navigate: (page: PageType) => void;
  selectTrack: (id: number) => void;

  // Derived (via get())
  getFilteredTracks: (filter: string, search: string) => WPTrack[];
  getTrackById: (id: number) => WPTrack | undefined;
  getEventsByBody: (body: 'NZDRA' | 'IHRA') => WPEvent[];
  getResourcesByOrg: (org: 'NZDRA' | 'IHRA') => WPResource[];
}
```

### Navigation Logic

```typescript
type PageType = 'home' | 'tracks' | 'trackDetail' | 'nzdraEvents' | 'ihraEvents' | 'resources';
```

- `navigate(page)` — stores current as previous, sets new active
- `selectTrack(id)` — sets selectedTrackId + navigates to trackDetail
- `BottomNav` has 4 items mapping to pages: home, tracks, nzdraEvents, resources
- Back button on trackDetail returns to previousPage or defaults to tracks

### Data Fetching Strategy

- **Initial load**: Fetch all tracks, events, resources in parallel on app mount
- **Cache**: Store in Zustand — no refetch needed for single-page app
- **Error handling**: Retry once, then show error state with refresh button
- **Loading**: Skeleton cards during initial fetch

### Fluid Simulation State (separate from Zustand — useRef)

The Three.js fluid simulation runs independently via R3F's `useFrame`. State is held in refs (not React state) for 60fps performance:

- `fluidA`, `fluidB` — WebGLRenderTarget refs (ping-pong)
- `pointer`, `pointerPrev` — Vector2 refs for cursor position
- `pointerDown` — boolean ref
- `fluidMaterial`, `displayMaterial` — ShaderMaterial refs
- `scrollX`, `scrollY` — number refs for wheel accumulation

Pointer events update refs directly. `useFrame` reads refs each frame — no React re-renders.

### Page Transition Orchestration

On `activePage` change:
1. GSAP kills existing animations
2. Animate outgoing content: opacity → 0 (0.2s)
3. Scroll to top
4. Set new page content
5. Animate incoming content: opacity 0 → 1 (0.3s, 0.1s delay)

Use a `useEffect` watching `activePage` to trigger transitions.

---

## WordPress API Integration

### Endpoints

```
BASE_URL = 'https://fpp.ykm.mycrazydomains.me/wp-json/wp/v2'

GET /dc_track?per_page=100          — All tracks
GET /dc_event?per_page=100          — All events
GET /dc_resource?per_page=100       — All resources
```

### TypeScript Interfaces

```typescript
interface WPTrack {
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
}

interface WPEvent {
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

interface WPResource {
  id: number;
  title: { rendered: string };
  acf: {
    resource_type: string;
    organisation: 'NZDRA' | 'IHRA';
    official_url: string;
    summary: string;
  };
}
```

### CORS Handling

Direct fetch from browser to WordPress API. The WordPress instance must have CORS headers. If not, add a proxy in vite.config.js (see design.md Notes section).

---

## Project File Structure

```
/mnt/agents/output/app/
├── public/
│   ├── images/
│   │   ├── track-meremere.jpg
│   │   ├── track-ruapuna.jpg
│   │   ├── track-masterton.jpg
│   │   ├── track-nelson.jpg
│   │   ├── track-tokoroa.jpg
│   │   ├── track-teretonga.jpg
│   │   ├── track-alexandra.jpg
│   │   └── track-oamaru.jpg
│   └── favicon.ico
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   │
│   ├── store/
│   │   └── useStore.ts              # Zustand store
│   │
│   ├── types/
│   │   └── wordpress.ts             # WP API TypeScript interfaces
│   │
│   ├── api/
│   │   └── wordpress.ts             # Fetch functions for WP endpoints
│   │
│   ├── shaders/
│   │   ├── fluid.vert.glsl          # Fluid simulation vertex shader
│   │   ├── fluid.frag.glsl          # Fluid simulation fragment shader
│   │   ├── display.vert.glsl        # Display vertex shader
│   │   └── display.frag.glsl        # Display fragment shader
│   │
│   ├── components/
│   │   ├── TopographicCanvas.tsx    # R3F canvas + fluid sim
│   │   ├── BottomNav.tsx            # Fixed bottom navigation
│   │   ├── PageTransition.tsx       # GSAP fade wrapper
│   │   ├── Footer.tsx               # Copyright + social
│   │   ├── ScrollIndicator.tsx      # Hero scroll hint
│   │   ├── BackToTop.tsx            # Scroll-to-top button
│   │   ├── TrackCard.tsx            # Track list card
│   │   ├── EventCard.tsx            # Event preview card
│   │   ├── EventRow.tsx             # Event list row
│   │   ├── ResourceCard.tsx         # Resource card
│   │   ├── QuickActionCard.tsx      # Home action card
│   │   ├── VelocityStack.tsx        # Typography effect component
│   │   ├── SkeletonCard.tsx         # Loading placeholder
│   │   ├── FilterBar.tsx            # Track filter + search
│   │   ├── StatusBadge.tsx          # ACTIVE/CONDITIONAL badge
│   │   └── SanctioningBadge.tsx     # NZDRA/IHRA badge
│   │
│   ├── sections/
│   │   ├── HomeHero.tsx             # Hero section (logo + title)
│   │   ├── QuickActions.tsx         # 3 action cards
│   │   ├── EventsPreview.tsx        # Horizontal event scroll
│   │   ├── ResourcesPreview.tsx     # 2-col resource cards
│   │   ├── TrackDirectoryHeader.tsx # Tracks page hero
│   │   ├── TrackList.tsx            # Filtered track list
│   │   ├── TrackDetailHero.tsx      # Track detail hero
│   │   ├── TrackInfo.tsx            # Track detail info grid
│   │   ├── EventsHeader.tsx         # Events page hero
│   │   ├── EventsList.tsx           # Vertical event list
│   │   ├── ResourcesHeader.tsx      # Resources page hero
│   │   └── ResourcesList.tsx        # NZDRA + IHRA resources
│   │
│   ├── pages/
│   │   ├── HomePage.tsx             # Composes home sections
│   │   ├── TracksPage.tsx           # Composes tracks sections
│   │   ├── TrackDetailPage.tsx      # Composes track detail sections
│   │   ├── NzdraEventsPage.tsx      # Composes NZDRA events
│   │   ├── IhraEventsPage.tsx       # Composes IHRA events
│   │   └── ResourcesPage.tsx        # Composes resources
│   │
│   └── styles/
│       └── velocity-stack.scss      # Velocity stack SCSS
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

---

## Tailwind Configuration

Extend Tailwind theme with Drag Central design tokens:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'drag-red': '#C4161C',
        'carbon': '#0B0B0B',
        'asphalt': '#141414',
        'smoke': '#1E1E1E',
        'track-silver': '#A0A0A0',
        'nzdra-blue': '#0066CC',
        'ihra-gold': '#D4A017',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      },
    },
  },
  plugins: [],
};
```

---

## Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [react(), glsl()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fpp.ykm.mycrazydomains.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/wp-json/wp/v2'),
      },
    },
  },
});
```

---

## Key Technical Decisions

1. **No React Router** — SPA with zustand-managed page state. Simpler for a mobile-first app with 6 pages and no URL-sharing requirements.

2. **R3F Canvas as Fixed Background** — The `<Canvas>` is `position: fixed` behind all page content. All page sections have transparent/semi-transparent backgrounds so the fluid sim remains visible throughout. The hero title overlays the canvas directly.

3. **Fluid Sim in useFrame, Not useState** — All pointer tracking and render target swapping happens in refs and `useFrame` callbacks. Zero React re-renders during animation for 60fps.

4. **SCSS for Velocity Stack** — The 10-layer loop with incremental offsets and clip-path pseudo-elements is generated at compile time via SCSS `@for`. This is more performant than runtime generation.

5. **Parallel Data Fetch on Mount** — All three WP endpoints fetched simultaneously. Data cached in zustand store for the session.

6. **CSS Snap Scroll for Events** — Horizontal event scrolling uses native CSS `scroll-snap-type` with touch momentum. No library needed.
