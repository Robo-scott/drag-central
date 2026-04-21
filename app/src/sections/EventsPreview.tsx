import { useStore } from '@/store/useStore';
import EventCard from '@/components/EventCard';
import SkeletonCard from '@/components/SkeletonCard';

export default function EventsPreview() {
  const events = useStore((s) => s.events);
  const loading = useStore((s) => s.loading);

  const upcomingEvents = events
    .filter((e) => new Date(e.acf.start_at) >= new Date())
    .sort((a, b) => new Date(a.acf.start_at).getTime() - new Date(b.acf.start_at).getTime())
    .slice(0, 6);

  return (
    <section className="py-6">
      <div className="flex items-center gap-2 px-4 mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <h2 className="font-rajdhani font-bold text-drag-red uppercase tracking-[0.04em] text-lg">
          Upcoming Events
        </h2>
      </div>

      {loading ? (
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar snap-scroll pb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-[280px]">
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : upcomingEvents.length === 0 ? (
        <p className="text-track-silver text-sm font-inter px-4">No upcoming events found.</p>
      ) : (
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar snap-scroll pb-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
