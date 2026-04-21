import type { WPTrack } from '@/types/wordpress';
import SanctioningBadge from '@/components/SanctioningBadge';
import StatusBadge from '@/components/StatusBadge';

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

export default function TrackDetailHero({ track }: Props) {
  const image = trackImageMap[track.acf.track_id] || '/images/track-meremere.jpg';

  return (
    <div className="relative h-[250px] overflow-hidden">
      <img
        src={image}
        alt={track.title.rendered}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.95) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <SanctioningBadge body={track.acf.sanctioning_body} />
          <StatusBadge status={track.acf.operational_status} />
        </div>
        <h1 className="font-rajdhani font-bold text-white text-2xl uppercase tracking-[0.02em]">
          {track.title.rendered}
        </h1>
        <p className="text-track-silver text-sm font-inter mt-1">
          {track.acf.track_configuration_raw} &middot; {track.acf.primary_surface_raw} &middot; {track.acf.city_or_town}, {track.acf.region}
        </p>
      </div>
    </div>
  );
}
