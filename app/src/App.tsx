import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { fetchAllData } from '@/api/wordpress';
import BottomNav from '@/components/BottomNav';
import TopographicCanvas from '@/components/TopographicCanvas';
import HomePage from '@/pages/HomePage';
import TracksPage from '@/pages/TracksPage';
import TrackDetailPage from '@/pages/TrackDetailPage';
import NzdraEventsPage from '@/pages/NzdraEventsPage';
import IhraEventsPage from '@/pages/IhraEventsPage';
import ResourcesPage from '@/pages/ResourcesPage';
import ClassifiedsPage from '@/pages/ClassifiedsPage';
import AboutPage from '@/pages/AboutPage';
import BenefitsPage from '@/pages/BenefitsPage';
import AdvertisingPage from '@/pages/AdvertisingPage';
import NzdraClassesPage from '@/pages/NzdraClassesPage';
import ResultsPage from '@/pages/ResultsPage';
import MemberPortal from '@/pages/MemberPortal';
import VehicleProfilesPage from '@/pages/VehicleProfilesPage';
import LoginButton from '@/components/LoginButton';
import MemberLogin from '@/components/MemberLogin';

function PageRouter() {
  const activePage = useStore((s) => s.activePage);

  switch (activePage) {
    case 'home':
      return <HomePage />;
    case 'tracks':
      return <TracksPage />;
    case 'trackDetail':
      return <TrackDetailPage />;
    case 'nzdraEvents':
      return <NzdraEventsPage />;
    case 'ihraEvents':
      return <IhraEventsPage />;
    case 'resources':
      return <ResourcesPage />;
    case 'classifieds':
      return <ClassifiedsPage />;
    case 'about':
      return <AboutPage />;
    case 'benefits':
      return <BenefitsPage />;
    case 'advertising':
      return <AdvertisingPage />;
    case 'nzdraClasses':
      return <NzdraClassesPage />;
    case 'results':
      return <ResultsPage />;
    case 'memberPortal':
      return <MemberPortal />;
    case 'vehicleProfiles':
      return <VehicleProfilesPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  const setTracks = useStore((s) => s.setTracks);
  const setEvents = useStore((s) => s.setEvents);
  const setResources = useStore((s) => s.setResources);
  const setLoading = useStore((s) => s.setLoading);
  const setError = useStore((s) => s.setError);
  const activePage = useStore((s) => s.activePage);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch data on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const { tracks, events, resources } = await fetchAllData();
        if (!cancelled) {
          setTracks(tracks);
          setEvents(events);
          setResources(resources);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load data');
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [setTracks, setEvents, setResources, setLoading, setError]);

  // Scroll to top on page change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-[100dvh] bg-carbon">
      {/* Fixed background canvas */}
      <TopographicCanvas />

      {/* Full-screen logo watermark */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          backgroundImage: 'url(./images/hero-logo.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.14,
        }}
        aria-hidden="true"
      />

      {/* Login Button */}
      <LoginButton />

      {/* Login Modal */}
      <MemberLogin />

      {/* Top Navigation */}
      <BottomNav />

      {/* Page content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-[100dvh] pt-16"
      >
        <PageRouter />
      </div>
    </div>
  );
}
