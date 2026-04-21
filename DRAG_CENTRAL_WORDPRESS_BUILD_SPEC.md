# Drag Central NZ — WordPress Build Specification

## Overview
Rebuild the existing Drag Central NZ React app as a WordPress theme. This is a mobile-first, single-page application style website with a fixed top navigation bar, interactive background, and multiple content pages managed through WordPress.

**Current live reference:** https://ggd5xczn7fp4u.kimi.show

---

## 1. Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Drag Red | #C4161C | Primary accent, CTAs, active states |
| Carbon Black | #0B0B0B | Primary background, deepest layer |
| Asphalt Grey | #141414 | Card backgrounds, elevated surfaces |
| Smoke Grey | #1E1E1E | Secondary backgrounds, dividers |
| Track Silver | #A0A0A0 | Secondary text, borders, inactive elements |
| Pure White | #FFFFFF | Primary headings, key data |
| NZDRA Blue | #0066CC | NZDRA-specific indicators, badges |
| IHRA Gold | #D4A017 | IHRA-specific indicators, badges |

### Typography
| Role | Family | Weight | Size | Usage |
|------|--------|--------|------|-------|
| Display | Rajdhani (Google Fonts) | 700 | clamp(2.5rem, 10vw, 4.5rem) | Hero titles, section headings |
| Heading | Montserrat (Google Fonts) | 700 | 1.2rem | Card titles, subheadings |
| Body | Inter (Google Fonts) | 400, 500 | 0.95rem | Body text, descriptions, UI labels |

Root font-size: `calc(12px + 0.4vw)`

### Spacing
- Page margin: `clamp(1rem, 4vw, 2rem)`
- Card padding: `1.25rem`
- Grid gap: `1rem`
- Border radius sm: `6px`, md: `12px`, lg: `20px`

---

## 2. Global Layout

### Fixed Background
- Full-viewport interactive canvas (Three.js WebGL) with topographic contour lines
- Fixed position, z-index 0, behind all content
- Subtle Drag Central NZ logo watermark at 14% opacity, centered, fixed
- Users can touch/drag to create fluid shockwave ripples

### Top Navigation Bar
- Fixed at top, height 64px, z-index 50
- Background: Carbon Black at 95% opacity with backdrop blur
- Bottom border: 1px Smoke Grey
- 6 items with icon + label: HOME, TRACKS, EVENTS, INFO, FOR SALE, ABOUT
- Active item: Drag Red text and icon
- Inactive: Track Silver
- Icons: Flame (Home), Track grid (Tracks), Calendar (Events), Document (Info), Tag (For Sale), Info circle (About)

### Member Login Button
- Fixed position, top-right below nav (top: 72px, right: 12px)
- Logged out: "MEMBER LOGIN" — Asphalt bg, Drag Red border/text
- Logged in: "MY ACCOUNT" — Drag Red bg, white text

### Footer (all pages)
- Social icons: Facebook, Instagram, YouTube (Track Silver)
- Governance disclaimer:
  > "Drag Central NZ is an independent information and signposting platform. Information is sourced directly from NZDRA, IHRA, and individual track websites and is not altered, interpreted, or owned by Drag Central. All licensing, regulations, and governance remain solely with NZDRA, IHRA, and the respective tracks."
- Copyright: "© 2026 Drag Central. All Rights Reserved"

---

## 3. Pages

### 3.1 HOME
- **Hero Section**: Full-viewport height. Dark radial gradient overlay. "DRAG" in white, "CENTRAL NZ" in Drag Red (Rajdhani 700). Tagline: "New Zealand's Home of Drag Racing" in Track Silver uppercase.
- **Scroll Indicator**: Pulsing Drag Red line with "EXPLORE" label at bottom-center.
- **Quick Action Cards** (stacked, full width, ~90% viewport):
  1. NZ Track Directory — Drag Red accent, "8 tracks nationwide"
  2. NZDRA Events — NZDRA Blue accent, "2025-2026 Season"
  3. IHRA Events — IHRA Gold accent, "2025-2026 Season"
  4. Classifieds — Drag Red accent, "Cars, parts, gear & more"
- **Upcoming Events Preview**: Horizontal scroll-snap row of next 3-4 NZDRA events. Each card: date badge (Drag Red bg), event name, track, "VIEW EVENT" link.
- **Footer**

### 3.2 TRACK DIRECTORY (nav: TRACKS)
- **Header**: Full-width track hero image with dark gradient overlay. Title "NZ TRACK DIRECTORY", subtitle "Find information on all drag racing tracks in New Zealand"
- **Filter Bar** (sticky): ALL / ACTIVE / CONDITIONAL toggle buttons + search input "Search tracks..."
- **Track List**: Vertical cards. Left: track photo thumbnail. Middle: track name (Montserrat 700), location, configuration. Right: "VIEW" button (Drag Red). Sanctioning badge (NZDRA=blue, IHRA=gold) + Status badge (ACTIVE=green, CONDITIONAL=amber).
- **8 Tracks** (from WordPress API `dc_track`):
  1. NAPA Auto Parts Dragway Meremere — Meremere, Waikato
  2. Ruapuna Park Power Built Dragway — Templeton, Canterbury
  3. Masterton Motorplex — Masterton, Wairarapa
  4. Nelson Drag Racing Association Motueka — Motueka, Tasman
  5. Tokoroa Airfield Amisfield Dragstrip — Tokoroa, Waikato
  6. Southern Dragways Teretonga — Invercargill, Southland
  7. Southern Dragways Alexandra Airport — Alexandra, Central Otago
  8. Whitestone Rodders Oamaru Airport Drags — Oamaru, North Otago

### 3.3 TRACK DETAIL (sub-page of TRACKS)
- **Hero**: Full-width track photo with gradient overlay. Track name (Rajdhani 700), sanctioning badge, configuration, city/region.
- **Info Section** (light background #F5F5F5, dark text): 2-column grid — Address, Surface, Configuration, Status (coloured badge), Venue Type, Operating Entity, Region.
- **Contact**: Website link (external), email link, phone (tap to call).
- **About**: Operational notes paragraph.
- **Back Button**: "BACK TO TRACKS" in Drag Red.

### 3.4 NZDRA EVENTS (nav: EVENTS → NZDRA)
- **Header**: "NZDRA EVENTS CALENDAR" in NZDRA Blue. Subtitle: "Events sourced from individual tracks and NZDRA"
- **Online Entries Card** (Asphalt bg, NZDRA Blue border):
  - Text: "Subject to approval from the relevant track and regulating bodies. Online entry opens once event dates are confirmed and published. Information required is the same as collected at the track on the day. Entries can be submitted for a single event or multiple dates. Vehicle breakdown / unforeseen circumstances — contact us directly to discuss options."
  - Race pack list: Driver and crew wristbands, Site map and contact details, Health and safety information, Proposed race schedule, Sponsor information, Any additional event-specific documentation
  - "Gate entry fees continue to be paid on the day as usual."
- **Event Calendar**: Monthly calendar with prev/next arrows. Today highlighted. Days with events show blue dots. Clickable to expand event details.
- **CTA**: "Visit NZDRA Official Website" button (NZDRA Blue bg)

### 3.5 IHRA EVENTS (nav: EVENTS → IHRA)
- Same structure as NZDRA Events but with IHRA Gold accent colour.
- Subtitle: "Events sourced from individual tracks and IHRA"
- CTA: "Visit IHRA Official Website" (IHRA Gold bg)

### 3.6 INFO / RESOURCES (nav: INFO)
- **Header**: "RESOURCES & LICENSING" in Drag Red
- **Sub-page CTAs** (stacked cards with icon + title + description + chevron):
  1. **Vehicle Profiles** (IHRA Gold accent) → /vehicle-profiles
  2. **Results** (Drag Red accent) → /results
  3. **NZDRA Race Classes** (NZDRA Blue accent) → /nzdra-classes
- **NZDRA Resources Card** (NZDRA Blue border):
  - Rule Book → https://www.nzdra.co.nz/technical/rule-book
  - Licence Application → https://www.nzdra.co.nz/technical/licence-application-form
  - Licence Transfer → https://www.nzdra.co.nz/technical/licence-transfer
  - Rule Submission / Amendments → https://www.nzdra.co.nz/technical/rule-submissions-amendments
  - About NZDRA → https://www.nzdra.co.nz/about-us
- **IHRA Resources Card** (IHRA Gold border):
  - IHRA Rule Book → https://www.ihra.com
  - IHRA Licence Application → https://www.ihra.com
  - IHRA Licence Renewal → https://www.ihra.com
- **Safety Requirements Notice**:
  > "All drivers must hold current licences and comply with class-specific safety equipment rules. Refer to the official rulebooks for detailed requirements. Drag Central does not interpret regulations — always consult the official sanctioning body."
- **Licensing Pathways**: NZDRA and IHRA cards with apply/renew links

### 3.7 VEHICLE PROFILES (sub-page of INFO)
- **Header**: "VEHICLE PROFILES" in Drag Red. Subtitle: "NZ drag racing vehicles and their specs"
- **Search bar**: "Search by race number, car, driver, class..."
- **Class filters**: All, Top Alcohol, Competition, Super Sedan, Super Street, Modified, Sport Compact, Boosted Outlaw, Top Sportsman
- **Vehicle Cards** (expandable):
  - Summary: Competition number badge, Year/Make/Model, Vehicle name (if set), Class, Colour, Fuel type, Driver name (linked), Source attribution
  - Expanded: Vehicle Details grid (Comp #, Class, Fuel, Colour), Performance (Best ET, Best Speed), Drivetrain (Engine, Transmission), Sponsors, About/Announcer info, Source link
- **8 Demo Vehicles** (see data file for full specs)
- **Disclaimer**: "Vehicle profiles are sourced from NZDRA, IHRA, and individual track websites and driver profiles. Images from For Sale listings are excluded."

### 3.8 RESULTS (sub-page of INFO)
- **Header**: "RESULTS" in Drag Red. Subtitle: "Past event results by date and track"
- **Search + Season filters** (All / 2025/26 / 2024/25 / 2023/24) + **Track filters**
- **Result Cards** (expandable): Date, event name, track, sanctioning body badge, source attribution
  - Expanded: Classes in competition with entry counts, qualifying/elimination status, link to source
- **22 Demo Results** from Masterton Motorplex, NZDRA, Meremere, Southern Dragways, Nelson, Tokoroa
- **Disclaimer**: "Results are sourced directly from NZDRA, IHRA, and individual track websites. Updated as new results are published."

### 3.9 NZDRA RACE CLASSES (sub-page of INFO)
- **Header**: "NZDRA RACE CLASSES" in NZDRA Blue
- **Search bar** + **Category filters**: All, Junior Dragster, Group 3 - Bracket Racing, Group 2 - Index Racing, Group 1 - Heads Up
- **13 Classes** (expandable cards):
  - Junior Dragster (7-8yr), Intermediate Dragster (9-11yr), Senior Dragster (12-18yr)
  - Super Street, Modified, Super Sedan, Supercharged Outlaws, Modified Bike
  - Top Street / Modified Street, Sport Compact, Competition, Competition Bike
  - Top Doorslammer, Top Alcohol
- Each class shows: Category, Tree type, ET range, Field size, Turnaround, Requirements list, Licence info, Safety rules, Vehicle specs

### 3.10 CLASSIFIEDS (nav: FOR SALE)
- **Header**: "CLASSIFIEDS" in Drag Red. Subtitle: "Buy, sell, and trade in the NZ drag racing community"
- **Category Grid** (2 columns): Cars, Parts, Trailers, Safety Gear, Photography, Merchandise — each with icon, name, description
- **Coming Soon Banner**: "The classifieds marketplace is under development. Listings will be available soon."
- **How It Works**: 3-step process (Create Listing → Connect with Buyers → Complete the Sale)
- **Member Login Button** visible

### 3.11 ABOUT (nav: ABOUT)
- **Header**: "ABOUT DRAG CENTRAL" with hero-logo watermark bg
- **Sections**:
  - Our Vision — unified digital ecosystem statement
  - What Drag Central Does — 6 features (tracks, events, signposting, classifieds, digital registration, licensing)
  - What Drag Central Does NOT Do — 4 governance principles (no data alteration, no licence issuance, source-first attribution, authority stays official)
  - Future Capabilities — checklist of planned features
  - Contact: info@dragcentral.co.nz

### 3.12 BENEFITS (nav: BENEFITS — currently removed from nav, content preserved)
- Two sections: For Event Organisers & Tracks (7 items), For Racers (7 items)

### 3.13 ADVERTISING (nav: ADS — currently removed from nav, content preserved)
- Advertising Opportunities (5 items with emojis)
- Who You'll Reach (4 items with emojis)
- Contact CTA

### 3.14 MEMBER PORTAL (after login)
- **7 Tabs** (horizontal scroll):
  1. **Dashboard**: Stats cards (entries, classifieds, vehicles, purchases), upcoming events, quick actions (+ List Item, + Event Entry)
  2. **My Profile**: Full name, email, phone, street address, city, postcode, emergency contact — all editable form fields
  3. **Licences**: Civil driver licence (number, issue/expiry dates, class, front/back photo upload), NZDRA race licence, IHRA race licence — all with photo upload areas
  4. **My Vehicles**: Vehicle list + add form (make, model, year, colour, competition class, engine, transmission, personal best ET, tech inspection upload)
  5. **My Classifieds**: Listing management + "New Listing" button
  6. **Event Entries**: Registered events + how-to guide
  7. **Purchases**: Classified items, team merchandise, "coming soon" banner
- **Security Disclaimer**:
  > "You are providing your personal information at your own risk. Whilst every precaution is taken to protect your data, no system is completely secure. **No financial or payment information is ever stored** on Drag Central. All payments are processed through secure third-party providers."

---

## 4. Data Sources

### WordPress REST API (Headless)
Base URL: `https://fpp.ykm.mycrazydomains.me/wp-json/wp/v2`

| Endpoint | Data |
|----------|------|
| `GET /dc_track?per_page=100` | All 8 NZ drag tracks |
| `GET /dc_event?per_page=100` | All events (NZDRA + IHRA) |
| `GET /dc_resource?per_page=100` | All resources (NZDRA + IHRA) |

### Track Data Fields (ACF)
`track_id, sanctioning_body, venue_category, track_configuration_raw, primary_surface_raw, city_or_town, region, physical_location, operating_entity, website_url, contact_email, contact_phone, operational_notes, operational_status`

### Event Data Fields (ACF)
`start_at, end_at, track_id, sanctioning_body, official_url, event_status, featured, track[]`

### Resource Data Fields (ACF)
`resource_type, organisation, official_url, summary`

### External Links
- NZDRA: https://www.nzdra.co.nz
- IHRA: https://www.ihra.com
- Masterton Motorplex: https://www.mastertonmotorplex.co.nz
- Meremere Dragway: https://www.meremeredragway.co.nz

---

## 5. Assets Required

### Images (generated, in `/images/`)
- `hero-logo.png` — Drag Central NZ logo artwork (drag car, Xmas tree, flag)
- `track-meremere.jpg` — Aerial drag strip at sunset
- `track-ruapuna.jpg` — Motorsport park with drag strip
- `track-masterton.jpg` — Motorplex in Wairarapa
- `track-nelson.jpg` — Drag strip in Tasman
- `track-tokoroa.jpg` — Airfield runway drag
- `track-teretonga.jpg` — Teretonga Park drag strip
- `track-alexandra.jpg` — Alexandra Airport runway
- `track-oamaru.jpg` — Oamaru Airport drag event

### Icons (SVG inline)
All navigation icons, social icons, and UI chevrons/arrows are inline SVGs. No icon library needed.

---

## 6. Interactive Features

| Feature | Implementation |
|---------|---------------|
| Page navigation | SPA-style, no page reload. Fade transition between pages. Scroll to top on change. |
| Topographic background | Three.js WebGL canvas, fixed position. Custom GLSL shaders for fluid simulation + contour display. Optional — can be simplified to a static dark gradient for WordPress. |
| Logo watermark | Fixed div with `background-image`, `opacity: 0.14`, `pointer-events: none` |
| Search/filter | Client-side JavaScript filtering on track lists, vehicle profiles, results, NZDRA classes |
| Expandable cards | Click to toggle expanded state, show/hide detail panel with CSS transition |
| Calendar | JavaScript-generated month grid. Event dots from data. Prev/next month navigation. |
| Login modal | Overlay with email/password form. Demo mode (any credentials). Sets login state. |
| Member portal | Tabbed interface, 7 sections, all form fields (no backend storage in current version) |
| Horizontal scroll | CSS `overflow-x: auto` with `scroll-snap-type: x mandatory` for event cards |
| Touch feedback | `:active` state `transform: scale(0.98)` on all cards/buttons |

---

## 7. File Structure Reference

```
/mnt/agents/output/app/
├── public/
│   ├── images/ (8 track photos + hero logo)
│   ├── icons/ (PWA icons 72x72 to 512x512)
│   ├── manifest.json (PWA manifest)
│   └── sw.js (service worker)
├── src/
│   ├── main.tsx (entry point, service worker registration)
│   ├── App.tsx (root: canvas, nav, page router)
│   ├── index.css (global styles, Tailwind, animations)
│   ├── types/
│   │   ├── wordpress.ts (WP API types, PageType)
│   │   └── vehicle.ts (VehicleProfile type)
│   ├── store/
│   │   └── useStore.ts (Zustand state management)
│   ├── api/
│   │   └── wordpress.ts (fetch functions for WP API)
│   ├── data/
│   │   ├── nzdraClasses.ts (13 NZDRA class definitions)
│   │   ├── resultsData.ts (22 past event results)
│   │   └── vehicleProfiles.ts (8 vehicle profiles)
│   ├── shaders/
│   │   ├── fluid.vert.glsl / fluid.frag.glsl
│   │   └── display.vert.glsl / display.frag.glsl
│   ├── components/
│   │   ├── TopographicCanvas.tsx (Three.js background)
│   │   ├── BottomNav.tsx (top nav bar, 6 items)
│   │   ├── LoginButton.tsx (member login/my account)
│   │   ├── MemberLogin.tsx (login modal overlay)
│   │   ├── EventCalendar.tsx (monthly event calendar)
│   │   ├── TrackCard.tsx, EventCard.tsx, EventRow.tsx
│   │   ├── ResourceCard.tsx, QuickActionCard.tsx
│   │   ├── StatusBadge.tsx, SanctioningBadge.tsx
│   │   ├── FilterBar.tsx, BackButton.tsx
│   │   ├── SkeletonCard.tsx (loading placeholder)
│   │   └── Footer.tsx
│   ├── sections/ (page section components)
│   │   ├── HomeHero.tsx, QuickActions.tsx
│   │   ├── EventsPreview.tsx, ResourcesPreview.tsx
│   │   ├── TrackDirectoryHeader.tsx, TrackList.tsx
│   │   ├── TrackDetailHero.tsx, TrackInfo.tsx
│   │   ├── EventsHeader.tsx, EventsList.tsx
│   │   ├── ResourcesHeader.tsx, ResourcesList.tsx
│   │   └── ResourcesPreview.tsx
│   └── pages/ (full page components)
│       ├── HomePage.tsx, TracksPage.tsx, TrackDetailPage.tsx
│       ├── NzdraEventsPage.tsx, IhraEventsPage.tsx
│       ├── ResourcesPage.tsx, ClassifiedsPage.tsx
│       ├── AboutPage.tsx, BenefitsPage.tsx, AdvertisingPage.tsx
│       ├── NzdraClassesPage.tsx, ResultsPage.tsx
│       ├── VehicleProfilesPage.tsx, MemberPortal.tsx
```

---

## 8. Progressive Web App (PWA)

- **Manifest**: `manifest.json` with app name, icons, theme colours, shortcuts
- **Service Worker**: `sw.js` for offline caching
- **Icons**: 72x72 through 512x512 + Apple touch icon (180x180)
- **Meta tags**: `theme-color`, `apple-mobile-web-app-capable`, `mobile-web-app-capable`

---

## 9. Notes for WordPress Developer

1. **This is a React SPA, not traditional WordPress pages.** The entire app is a single HTML file with JavaScript routing. WordPress serves as the headless CMS (content via REST API).

2. **The WordPress backend already exists** at `fpp.ykm.mycrazydomains.me` with custom post types: `dc_track`, `dc_event`, `dc_resource`. ACF fields are already configured.

3. **For a WordPress theme approach**: You could use the data structure above to create WordPress pages with Gutenberg blocks, or use a plugin like WPGraphQL + a frontend framework.

4. **The interactive background** (Three.js WebGL) is optional — it can be replaced with a static dark gradient or CSS animation for simpler hosting.

5. **Member portal** requires backend integration (user authentication, database storage). Current version is frontend-only demo.

6. **All external links** open in new tab (`target="_blank" rel="noopener noreferrer"`).

7. **CORS**: The WordPress API must have CORS headers enabled, or requests must be proxied.

---

*Generated: 2026-04-21*
*Reference build: Version e9a2477*
