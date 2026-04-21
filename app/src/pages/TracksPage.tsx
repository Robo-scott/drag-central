import TrackDirectoryHeader from '@/sections/TrackDirectoryHeader';
import TrackList from '@/sections/TrackList';
import Footer from '@/components/Footer';

export default function TracksPage() {
  return (
    <div className="relative z-10">
      <TrackDirectoryHeader />
      <TrackList />
      <Footer />
    </div>
  );
}
