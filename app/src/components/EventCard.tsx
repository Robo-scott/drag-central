import type { WPEvent } from '@/types/wordpress';

interface Props {
  event: WPEvent;
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const startDay = s.getDate();
  const endDay = e.getDate();
  const startMonth = months[s.getMonth()];
  const endMonth = months[e.getMonth()];

  if (startMonth === endMonth) {
    return `${startDay} – ${endDay} ${startMonth}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="flex-shrink-0 w-[280px] bg-smoke rounded-md overflow-hidden">
      <div className="bg-drag-red px-3 py-2">
        <span className="text-white text-xs font-inter font-medium uppercase">
          {formatDateRange(event.acf.start_at, event.acf.end_at)}
        </span>
      </div>
      <div className="p-3">
        <h4 className="font-montserrat font-bold text-white text-sm line-clamp-1">
          {event.title.rendered}
        </h4>
        <p className="text-track-silver text-xs font-inter mt-1 line-clamp-2">
          {event.acf.sanctioning_body} Event
        </p>
        {event.acf.official_url && (
          <a
            href={event.acf.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-drag-red text-xs font-montserrat font-bold uppercase tracking-wider hover:underline"
          >
            VIEW EVENT →
          </a>
        )}
      </div>
    </div>
  );
}
