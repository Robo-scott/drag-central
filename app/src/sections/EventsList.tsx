import type { WPEvent } from '@/types/wordpress';
import EventRow from '@/components/EventRow';
import SkeletonCard from '@/components/SkeletonCard';

interface Props {
  events: WPEvent[];
  loading: boolean;
  ctaUrl: string;
  ctaColor: string;
  ctaText: string;
}

export default function EventsList({ events, loading, ctaUrl, ctaColor, ctaText }: Props) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.acf.start_at).getTime() - new Date(b.acf.start_at).getTime()
  );

  return (
    <div>
      {loading ? (
        <div className="px-4 py-3 space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="py-3">
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-12 px-4">
          <p className="text-track-silver text-sm font-inter">No events found.</p>
        </div>
      ) : (
        <>
          <div className="bg-carbon">
            {sortedEvents.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
          <div className="p-4">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 text-white font-montserrat font-bold uppercase tracking-wider text-sm rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ctaColor }}
            >
              {ctaText}
            </a>
          </div>
        </>
      )}
    </div>
  );
}
