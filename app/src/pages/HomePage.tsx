import HomeHero from '@/sections/HomeHero';
import QuickActions from '@/sections/QuickActions';
import EventsPreview from '@/sections/EventsPreview';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <div className="relative z-10">
        <QuickActions />
        <EventsPreview />
        <Footer />
      </div>
    </div>
  );
}
