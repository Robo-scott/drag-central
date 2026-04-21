import Footer from '@/components/Footer';

interface AdItem {
  emoji: string;
  text: string;
}

const opportunities: AdItem[] = [
  { emoji: '🖥️', text: 'Website banner advertising' },
  { emoji: '📱', text: 'In-app advertising placements' },
  { emoji: '🤝', text: 'Potential event and series sponsorship' },
  { emoji: '🏷️', text: 'Classified category sponsorships' },
  { emoji: '⭐', text: 'Featured listings and promoted content' },
];

const audience: AdItem[] = [
  { emoji: '🏎️', text: 'Active drag racers, race teams, spectators' },
  { emoji: '🏁', text: 'Event organisers and track operators' },
  { emoji: '🏆', text: 'Motorsport enthusiasts' },
  { emoji: '🛠️', text: 'Your key target market in one place' },
];

function AdCard({ item }: { item: AdItem }) {
  return (
    <div className="flex items-center gap-3 bg-asphalt rounded-md px-3 py-2.5">
      <span className="text-lg flex-shrink-0">{item.emoji}</span>
      <span className="text-white text-xs font-inter leading-relaxed">{item.text}</span>
    </div>
  );
}

export default function AdvertisingPage() {
  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src="/images/hero-logo.png"
          alt="Advertising"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.98) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-drag-red text-3xl uppercase tracking-[0.04em] text-center">
            Advertising
          </h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">
            Promote your brand to the NZ drag racing community
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Advertising Opportunities */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-drag-red rounded-full" />
            <h2 className="font-rajdhani font-bold text-white text-xl uppercase tracking-[0.04em]">
              Advertising Opportunities
            </h2>
          </div>
          <div className="space-y-2">
            {opportunities.map((item, i) => (
              <AdCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* Who You'll Reach */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-nzdra-blue rounded-full" />
            <h2 className="font-rajdhani font-bold text-nzdra-blue text-xl uppercase tracking-[0.04em]">
              Who You&apos;ll Reach
            </h2>
          </div>
          <div className="space-y-2">
            {audience.map((item, i) => (
              <AdCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="bg-asphalt rounded-md p-4 text-center border border-smoke">
            <p className="text-track-silver text-xs font-inter mb-2">
              Interested in advertising with Drag Central?
            </p>
            <a
              href="mailto:info@dragcentral.co.nz"
              className="text-drag-red text-sm font-montserrat font-bold uppercase tracking-wider hover:underline"
            >
              info@dragcentral.co.nz
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
