import { useStore } from '@/store/useStore';
import type { WPTrack } from '@/types/wordpress';
import SanctioningBadge from './SanctioningBadge';
import StatusBadge from './StatusBadge';

interface Props {
  track: WPTrack;
}

const trackImageMap: Record<string, string> = {
  'NZ-T01': '/images/track-meremere.jpg',
  'NZ-T02': '/images/track-ruapuna.jpg',
  'NZ-T03': '/images/track-masterton.jpg',
  'NZ-T04': '/images/track-nelson.jpg',
  'NZ-T05': '/images/track-tokoroa.jpg',
  'NZ-T06': '/images/track-teretonga.jpg',
  'NZ-T07': '/images/track-alexandra.jpg',
  'NZ-T08': '/images/track-oamaru.jpg',
};

export default function TrackCard({ track }: Props) {
  const selectTrack = useStore((s) => s.selectTrack);
  const image = trackImageMap[track.acf.track_id] || '/images/track-meremere.jpg';

  return (
    <button
      onClick={() => selectTrack(track.id)}
      className="touch-active w-full flex items-center gap-4 bg-asphalt rounded-md p-3 text-left border-b border-smoke"
    >
      <img
        src={image}
        alt={track.title.rendered}
        className="w-[120px] h-[68px] object-cover rounded-sm flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <SanctioningBadge body={track.acf.sanctioning_body} />
          <StatusBadge status={track.acf.operational_status} />
        </div>
        <h3 className="font-montserrat font-bold text-white text-sm truncate">
          {track.title.rendered}
        </h3>
        <p className="text-track-silver text-xs font-inter mt-0.5">
          {track.acf.city_or_town}, {track.acf.region}
        </p>
        <p className="text-track-silver text-[0.65rem] font-inter mt-0.5">
          {track.acf.track_configuration_raw} &middot; {track.acf.primary_surface_raw}
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center px-3 py-1.5 bg-drag-red text-white text-xs font-montserrat font-bold uppercase rounded-sm">
          VIEW
        </span>
      </div>
    </button>
  );
}
