import { useStore } from '@/store/useStore';
import type { PageType } from '@/types/wordpress';

interface NavItem {
  page: PageType;
  label: string;
  icon: React.ReactNode;
}

const FlameIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const TrackIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20"/><path d="M2 16h20"/><path d="M2 12h20"/><path d="M2 8h20"/><path d="M6 4v16"/><path d="M18 4v16"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const DocIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const TagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const navItems: NavItem[] = [
  { page: 'home', label: 'HOME', icon: <FlameIcon /> },
  { page: 'tracks', label: 'TRACKS', icon: <TrackIcon /> },
  { page: 'nzdraEvents', label: 'EVENTS', icon: <CalendarIcon /> },
  { page: 'resources', label: 'INFO', icon: <DocIcon /> },
  { page: 'classifieds', label: 'FOR SALE', icon: <TagIcon /> },
  { page: 'about', label: 'ABOUT', icon: <InfoIcon /> },
];

export default function BottomNav() {
  const activePage = useStore((s) => s.activePage);
  const navigate = useStore((s) => s.navigate);

  const isActive = (item: NavItem) => {
    if (item.page === activePage) return true;
    if (item.page === 'tracks' && activePage === 'trackDetail') return true;
    if (item.page === 'nzdraEvents' && (activePage === 'nzdraEvents' || activePage === 'ihraEvents')) return true;
    return false;
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-carbon/95 backdrop-blur-sm border-b border-smoke"
      style={{ height: 64 }}
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`flex flex-col items-center justify-center gap-0.5 w-12 h-full transition-colors duration-200 ${
                active ? 'text-drag-red' : 'text-track-silver'
              }`}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-[0.5rem] font-inter font-medium tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
