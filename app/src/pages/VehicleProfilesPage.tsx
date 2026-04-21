import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { vehicleProfiles, classOptions } from '@/data/vehicleProfiles';
import Footer from '@/components/Footer';

export default function VehicleProfilesPage() {
  const [search, setSearch] = useState('');
  const [activeClass, setActiveClass] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useStore((s) => s.navigate);

  const filtered = vehicleProfiles.filter((v) => {
    const matchesClass = activeClass === 'All' || v.classIndex.includes(activeClass);
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      v.competitionNumber.toLowerCase().includes(q) ||
      v.vehicleName?.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.driverName.toLowerCase().includes(q) ||
      v.classIndex.toLowerCase().includes(q);
    return matchesClass && matchesSearch;
  });

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[160px] overflow-hidden">
        <img src="/images/track-masterton.jpg" alt="Vehicle Profiles" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-drag-red text-2xl uppercase tracking-[0.04em] text-center">Vehicle Profiles</h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">NZ drag racing vehicles and their specs</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {/* Back button */}
        <button onClick={() => navigate('resources')} className="inline-flex items-center gap-1 text-drag-red text-sm font-montserrat font-bold uppercase tracking-wider hover:underline">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          BACK TO INFO
        </button>

        {/* Search */}
        <div className="bg-asphalt rounded-md px-3 py-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-track-silver flex-shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search by race number, car, driver, class..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-white text-xs font-inter w-full outline-none placeholder:text-track-silver" />
          {search && <button onClick={() => setSearch('')} className="text-track-silver hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
        </div>

        {/* Class filter */}
        <div className="flex flex-wrap gap-2">
          {classOptions.map((c) => (
            <button key={c} onClick={() => setActiveClass(c)} className={`px-3 py-1.5 text-[0.65rem] font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors ${activeClass === c ? 'bg-drag-red text-white' : 'bg-asphalt text-track-silver hover:text-white'}`}>{c}</button>
          ))}
        </div>

        <p className="text-track-silver text-xs font-inter">{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Vehicle cards */}
        <div className="space-y-3">
          {filtered.map((v) => {
            const isExpanded = expandedId === v.id;
            return (
              <div key={v.id} className="bg-asphalt rounded-md overflow-hidden border border-smoke">
                {/* Summary row */}
                <button onClick={() => setExpandedId(isExpanded ? null : v.id)} className="touch-active w-full p-3 text-left flex items-start gap-3">
                  <div className="flex-shrink-0 w-14 h-14 bg-drag-red/10 rounded-md flex items-center justify-center border border-drag-red/20">
                    <span className="font-rajdhani font-bold text-drag-red text-lg">#{v.competitionNumber}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-montserrat font-bold text-white text-sm truncate">{v.year} {v.make} {v.model}</h3>
                      {v.vehicleName && <span className="text-track-silver text-xs font-inter italic">&ldquo;{v.vehicleName}&rdquo;</span>}
                    </div>
                    <p className="text-drag-red text-xs font-inter font-medium">{v.classIndex}</p>
                    <p className="text-track-silver text-xs font-inter mt-0.5">{v.colour} &middot; {v.fuelType}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <button
                        onClick={(e) => { e.stopPropagation(); /* driver profile link */ }}
                        className="text-nzdra-blue text-xs font-inter hover:underline"
                      >
                        {v.driverName}
                      </button>
                      <span className="text-track-silver text-[0.55rem] font-inter">(from {v.source})</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-track-silver self-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-smoke space-y-3">
                    {/* Vehicle Details */}
                    <div className="pt-2">
                      <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-2">Vehicle Details</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-smoke rounded-sm px-2 py-1.5">
                          <p className="text-track-silver text-[0.55rem] font-inter uppercase">Competition #</p>
                          <p className="text-white text-xs font-inter font-medium">{v.competitionNumber}</p>
                        </div>
                        <div className="bg-smoke rounded-sm px-2 py-1.5">
                          <p className="text-track-silver text-[0.55rem] font-inter uppercase">Class / Index</p>
                          <p className="text-white text-xs font-inter font-medium">{v.classIndex}</p>
                        </div>
                        <div className="bg-smoke rounded-sm px-2 py-1.5">
                          <p className="text-track-silver text-[0.55rem] font-inter uppercase">Fuel Type</p>
                          <p className="text-white text-xs font-inter font-medium">{v.fuelType}</p>
                        </div>
                        <div className="bg-smoke rounded-sm px-2 py-1.5">
                          <p className="text-track-silver text-[0.55rem] font-inter uppercase">Colour</p>
                          <p className="text-white text-xs font-inter font-medium">{v.colour}</p>
                        </div>
                      </div>
                    </div>

                    {/* Performance */}
                    {(v.bestET || v.bestSpeed) && (
                      <div>
                        <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-2">Performance</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {v.bestET && (
                            <div className="bg-smoke rounded-sm px-2 py-1.5">
                              <p className="text-track-silver text-[0.55rem] font-inter uppercase">Best ET</p>
                              <p className="text-drag-red text-sm font-rajdhani font-bold">{v.bestET}s</p>
                            </div>
                          )}
                          {v.bestSpeed && (
                            <div className="bg-smoke rounded-sm px-2 py-1.5">
                              <p className="text-track-silver text-[0.55rem] font-inter uppercase">Best Speed</p>
                              <p className="text-nzdra-blue text-sm font-rajdhani font-bold">{v.bestSpeed} mph</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Drivetrain */}
                    <div>
                      <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-2">Drivetrain</h4>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2"><span className="text-track-silver text-[0.6rem] font-inter uppercase w-24 flex-shrink-0">Engine:</span><span className="text-white text-xs font-inter">{v.engine}</span></div>
                        <div className="flex items-start gap-2"><span className="text-track-silver text-[0.6rem] font-inter uppercase w-24 flex-shrink-0">Transmission:</span><span className="text-white text-xs font-inter">{v.transmission}</span></div>
                      </div>
                    </div>

                    {/* Sponsors */}
                    {v.sponsors && (
                      <div>
                        <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1">Sponsors</h4>
                        <p className="text-track-silver text-xs font-inter">{v.sponsors}</p>
                      </div>
                    )}

                    {/* Announcer Info */}
                    {v.announcerInfo && (
                      <div>
                        <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-1">About</h4>
                        <p className="text-track-silver text-xs font-inter italic">{v.announcerInfo}</p>
                      </div>
                    )}

                    {/* Source link */}
                    <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-drag-red text-xs font-inter font-medium hover:underline pt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View on {v.source}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8">
            <p className="text-track-silver text-sm font-inter">No vehicles found matching your search.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-smoke rounded-md p-3 border border-smoke">
          <p className="text-track-silver text-[0.6rem] font-inter leading-relaxed text-center">
            Vehicle profiles are sourced from NZDRA, IHRA, and individual track websites and driver profiles. Images from For Sale listings are excluded. Information is updated as new data becomes available from the respective sources.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
