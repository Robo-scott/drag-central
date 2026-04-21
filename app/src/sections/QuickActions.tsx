import QuickActionCard from '@/components/QuickActionCard';

const TrackIcon = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 40h32"/><path d="M8 32h32"/><path d="M8 24h32"/><path d="M8 16h32"/><path d="M16 8v32"/><path d="M32 8v32"/>
  </svg>
);

const CalendarIcon = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="10" width="32" height="30" rx="3"/><line x1="32" y1="6" x2="32" y2="14"/><line x1="16" y1="6" x2="16" y2="14"/><line x1="8" y1="20" x2="40" y2="20"/>
  </svg>
);

const TagIcon = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M40 26L26 40l-14-14L8 12V8h4l14 4 14 14a4 4 0 0 1 0 5.66z"/><circle cx="18" cy="18" r="2"/>
  </svg>
);

const actions = [
  {
    page: 'tracks' as const,
    title: 'NZ Track Directory',
    subtitle: '8 tracks nationwide',
    borderColor: '#C4161C',
    icon: <TrackIcon color="#C4161C" />,
  },
  {
    page: 'nzdraEvents' as const,
    title: 'NZDRA Events',
    subtitle: '2025–2026 Season',
    borderColor: '#0066CC',
    icon: <CalendarIcon color="#0066CC" />,
  },
  {
    page: 'ihraEvents' as const,
    title: 'IHRA Events',
    subtitle: '2025–2026 Season',
    borderColor: '#D4A017',
    icon: <CalendarIcon color="#D4A017" />,
  },
  {
    page: 'classifieds' as const,
    title: 'Classifieds',
    subtitle: 'Cars, parts, gear & more',
    borderColor: '#C4161C',
    icon: <TagIcon color="#C4161C" />,
  },
];

export default function QuickActions() {
  return (
    <section className="px-4 py-8 space-y-3">
      {actions.map((action) => (
        <QuickActionCard key={action.page} {...action} />
      ))}
    </section>
  );
}
