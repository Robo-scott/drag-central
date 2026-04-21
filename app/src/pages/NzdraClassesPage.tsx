import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { nzdraClasses, categories } from '@/data/nzdraClasses';
import Footer from '@/components/Footer';

export default function NzdraClassesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useStore((s) => s.navigate);

  const filtered = nzdraClasses.filter((cls) => {
    const matchesCategory = activeCategory === 'All' || cls.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      cls.name.toLowerCase().includes(q) ||
      cls.category.toLowerCase().includes(q) ||
      cls.etRange.toLowerCase().includes(q) ||
      cls.description.toLowerCase().includes(q) ||
      cls.requirements.some((r) => r.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src="/images/track-meremere.jpg"
          alt="NZDRA Classes"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-nzdra-blue text-2xl uppercase tracking-[0.04em] text-center">
            NZDRA Race Classes
          </h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">
            Classes, ET ranges, requirements, and specifications
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate('resources')}
          className="inline-flex items-center gap-1 text-drag-red text-sm font-montserrat font-bold uppercase tracking-wider hover:underline"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          BACK TO INFO
        </button>

        {/* Search */}
        <div className="bg-asphalt rounded-md px-3 py-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-track-silver flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search classes, ET times, requirements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-xs font-inter w-full outline-none placeholder:text-track-silver"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-track-silver hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[0.65rem] font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-nzdra-blue text-white'
                  : 'bg-asphalt text-track-silver hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-track-silver text-xs font-inter">
          {filtered.length} class{filtered.length !== 1 ? 'es' : ''} found
        </p>

        {/* Classes list */}
        <div className="space-y-3">
          {filtered.map((cls) => (
            <div key={cls.id} className="bg-asphalt rounded-md overflow-hidden border border-smoke">
              {/* Header */}
              <div className="p-3 border-b border-smoke">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-nzdra-blue text-[0.6rem] font-inter font-medium uppercase tracking-wider">
                    {cls.category}
                  </span>
                  <span className="text-nzdra-blue text-[0.6rem] font-inter font-medium uppercase tracking-wider bg-nzdra-blue/10 px-2 py-0.5 rounded-sm">
                    {cls.tree}
                  </span>
                </div>
                <h3 className="font-montserrat font-bold text-white text-sm">{cls.name}</h3>
                <p className="text-track-silver text-xs font-inter mt-1">{cls.description}</p>
              </div>

              {/* ET Range */}
              <div className="px-3 py-2 bg-nzdra-blue/10 border-b border-smoke">
                <span className="text-nzdra-blue text-xs font-inter font-medium">ET: {cls.etRange}</span>
                <span className="text-track-silver text-[0.6rem] font-inter ml-2">
                  | Field: {cls.fieldSize} | Turnaround: {cls.turnaround}
                </span>
              </div>

              {/* Requirements */}
              <div className="p-3 space-y-3">
                <div>
                  <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1.5">
                    Requirements
                  </h4>
                  <ul className="space-y-1">
                    {cls.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-track-silver text-xs font-inter leading-relaxed">
                        <span className="text-nzdra-blue flex-shrink-0 mt-0.5">-</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1">
                    Licence
                  </h4>
                  <p className="text-track-silver text-xs font-inter leading-relaxed">
                    {cls.licence}
                  </p>
                </div>

                {cls.safety.length > 0 && (
                  <div>
                    <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1">
                      Safety
                    </h4>
                    <ul className="space-y-1">
                      {cls.safety.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-track-silver text-xs font-inter leading-relaxed">
                          <span className="text-nzdra-blue flex-shrink-0 mt-0.5">-</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {cls.vehicle.length > 0 && (
                  <div>
                    <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1">
                      Vehicle Specs
                    </h4>
                    <ul className="space-y-1">
                      {cls.vehicle.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-track-silver text-xs font-inter leading-relaxed">
                          <span className="text-nzdra-blue flex-shrink-0 mt-0.5">-</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-2 border-t border-smoke">
                  <span className="text-track-silver text-[0.6rem] font-inter">
                    <span className="text-white font-medium">Qualifying:</span> {cls.qualifying}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-track-silver text-sm font-inter">No classes found matching your search.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-smoke rounded-md p-3 border border-smoke">
          <p className="text-track-silver text-[0.6rem] font-inter leading-relaxed text-center">
            All class information sourced from the NZDRA National Drag Racing Championship Regulations. 
            Always refer to the official NZDRA Rule Book for the most current and complete information. 
            Drag Central does not interpret regulations.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
