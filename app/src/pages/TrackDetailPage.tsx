import { useStore } from '@/store/useStore';
import BackButton from '@/components/BackButton';
import TrackDetailHero from '@/sections/TrackDetailHero';
import TrackInfo from '@/sections/TrackInfo';
import Footer from '@/components/Footer';

export default function TrackDetailPage() {
  const selectedTrackId = useStore((s) => s.selectedTrackId);
  const getTrackById = useStore((s) => s.getTrackById);

  const track = selectedTrackId ? getTrackById(selectedTrackId) : undefined;

  if (!track) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-track-silver text-sm font-inter mb-4">Track not found.</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div className="px-4 pt-4">
        <BackButton fallback="tracks" />
      </div>
      <TrackDetailHero track={track} />
      <div className="px-4 py-4">
        <TrackInfo track={track} />
      </div>
      <Footer />
    </div>
  );
}
