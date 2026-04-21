import type { WPEvent } from '@/types/wordpress';

interface Props {
  event: WPEvent;
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

export default function EventRow({ event }: Props) {
  const start = formatDateShort(event.acf.start_at);
  const end = formatDateShort(event.acf.end_at);
  const dateRange = start === end ? start : `${start} – ${end}`;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-smoke px-4">
      <div className="w-24 flex-shrink-0">
        <span className="font-rajdhani font-bold text-drag-red text-sm">
          {dateRange}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-montserrat font-bold text-white text-sm truncate">
          {event.title.rendered}
        </h4>
      </div>
      <div className="flex-shrink-0 text-track-silver">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  );
}
