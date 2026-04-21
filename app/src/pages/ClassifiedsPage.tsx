import { useState } from 'react';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
}

const categories: Category[] = [
  {
    id: 'cars',
    name: 'CARS',
    description: 'Drag cars, street legal, project cars, rollers',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
      </svg>
    ),
  },
  {
    id: 'parts',
    name: 'PARTS',
    description: 'Engines, transmissions, superchargers, nitrous',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    id: 'trailers',
    name: 'TRAILERS',
    description: 'Car trailers, enclosed trailers, tow vehicles',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="18" height="10" rx="2"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="M2 14h18"/>
      </svg>
    ),
  },
  {
    id: 'safety',
    name: 'SAFETY GEAR',
    description: 'Helmets, suits, harnesses, fire systems',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'photography',
    name: 'PHOTOGRAPHY',
    description: 'Event photography, action shots, team photos',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    id: 'merchandise',
    name: 'MERCHANDISE',
    description: 'Team shirts, hats, stickers, memorabilia',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
];

export default function ClassifiedsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src="/images/track-meremere.jpg"
          alt="Classifieds"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-drag-red text-2xl uppercase tracking-[0.04em] text-center">
            Classifieds
          </h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">
            Buy, sell, and trade in the NZ drag racing community
          </p>
        </div>
      </div>

      {/* Category Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`touch-active bg-asphalt rounded-md p-4 text-left border transition-all ${
                activeCategory === cat.id
                  ? 'border-drag-red'
                  : 'border-transparent hover:border-smoke'
              }`}
            >
              <div className="text-drag-red mb-2">{cat.icon}</div>
              <h3 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider">
                {cat.name}
              </h3>
              <p className="text-track-silver text-[0.65rem] font-inter mt-1 leading-relaxed">
                {cat.description}
              </p>
            </button>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-6 bg-smoke rounded-md p-4 text-center border border-smoke">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-1">
            Coming Soon
          </h3>
          <p className="text-track-silver text-xs font-inter">
            The classifieds marketplace is under development. Listings will be available soon. Contact us to list your items early.
          </p>
        </div>

        {/* How It Works */}
        <div className="mt-6">
          <h2 className="font-rajdhani font-bold text-white text-lg uppercase tracking-[0.04em] mb-3">
            How It Works
          </h2>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Create Your Listing', desc: 'Add photos, description, and pricing for your item' },
              { step: '2', title: 'Connect with Buyers', desc: 'Receive enquiries directly via in-app messaging' },
              { step: '3', title: 'Complete the Sale', desc: 'Meet at events or arrange pickup — it is that easy' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 bg-asphalt rounded-md p-3">
                <span className="flex-shrink-0 w-8 h-8 bg-drag-red rounded-full flex items-center justify-center font-rajdhani font-bold text-white text-sm">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-track-silver text-[0.7rem] font-inter mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
