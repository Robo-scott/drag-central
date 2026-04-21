import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { resultsData, seasons, tracks, sourceLabels } from '@/data/resultsData';
import Footer from '@/components/Footer';

export default function ResultsPage() {
  const [search, setSearch] = useState('');
  const [activeSeason, setActiveSeason] = useState('All');
  const [activeTrack, setActiveTrack] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useStore((s) => s.navigate);

  const filtered = resultsData.filter((r) => {
    const matchesSeason = activeSeason === 'All' || r.season === activeSeason;
    const matchesTrack = activeTrack === 'All' || r.track === activeTrack;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.eventName.toLowerCase().includes(q) ||
      r.track.toLowerCase().includes(q) ||
      r.sanctioningBody.toLowerCase().includes(q) ||
      r.season.toLowerCase().includes(q) ||
      r.classes.some((c) => c.className.toLowerCase().includes(q));
    return matchesSeason && matchesTrack && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[160px] overflow-hidden">
        <img src="/images/track-meremere.jpg" alt="Results" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-drag-red text-2xl uppercase tracking-[0.04em] text-center">Results</h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">Past event results by date and track</p>
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
          <input type="text" placeholder="Search event, track, class..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-white text-xs font-inter w-full outline-none placeholder:text-track-silver" />
          {search && <button onClick={() => setSearch('')} className="text-track-silver hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
        </div>

        {/* Season filter */}
        <div>
          <p className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1.5">Season</p>
          <div className="flex flex-wrap gap-2">
            {seasons.map((s) => (
              <button key={s} onClick={() => setActiveSeason(s)} className={`px-3 py-1.5 text-[0.65rem] font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors ${activeSeason === s ? 'bg-drag-red text-white' : 'bg-asphalt text-track-silver hover:text-white'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Track filter */}
        <div>
          <p className="text-track-silver text-[0.6rem] font-inter uppercase tracking-wider mb-1.5">Track</p>
          <div className="flex flex-wrap gap-2">
            {tracks.map((t) => (
              <button key={t} onClick={() => setActiveTrack(t)} className={`px-3 py-1.5 text-[0.65rem] font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors ${activeTrack === t ? 'bg-nzdra-blue text-white' : 'bg-asphalt text-track-silver hover:text-white'}`}>{t === 'All' ? 'All Tracks' : t.split(' ').slice(0, 2).join(' ')}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-track-silver text-xs font-inter">{sorted.length} result{sorted.length !== 1 ? 's' : ''} found</p>

        {/* Results list */}
        <div className="space-y-3">
          {sorted.map((result) => {
            const isExpanded = expandedId === result.id;
            const date = new Date(result.date);
            const dateStr = date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
            const sourceLabel = sourceLabels[result.source] || `(from ${result.source})`;

            return (
              <div key={result.id} className="bg-asphalt rounded-md overflow-hidden border border-smoke">
                {/* Header row */}
                <button onClick={() => setExpandedId(isExpanded ? null : result.id)} className="touch-active w-full p-3 text-left flex items-start gap-3">
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="font-rajdhani font-bold text-drag-red text-lg leading-none block">{date.getDate()}</span>
                    <span className="text-track-silver text-[0.6rem] font-inter uppercase">{date.toLocaleDateString('en-NZ', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-montserrat font-bold text-white text-sm">{result.eventName}</h3>
                    <p className="text-track-silver text-xs font-inter mt-0.5">{result.track}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[0.6rem] font-inter font-medium uppercase px-1.5 py-0.5 rounded-sm ${result.sanctioningBody === 'NZDRA' ? 'bg-nzdra-blue/20 text-nzdra-blue' : result.sanctioningBody === 'IHRA' ? 'bg-ihra-gold/20 text-ihra-gold' : 'bg-smoke text-track-silver'}`}>{result.sanctioningBody}</span>
                      <span className="text-track-silver text-[0.6rem] font-inter">{dateStr} {sourceLabel}</span>
                    </div>
                    {result.notes && <p className="text-track-silver text-[0.65rem] font-inter mt-1 italic">{result.notes}</p>}
                  </div>
                  <div className="flex-shrink-0 text-track-silver self-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-smoke">
                    {result.classes.length > 0 ? (
                      <div className="pt-2">
                        <h4 className="text-white text-[0.65rem] font-montserrat font-bold uppercase tracking-wider mb-2">Classes in Competition</h4>
                        <div className="space-y-1.5">
                          {result.classes.map((cls, i) => (
                            <div key={i} className="flex items-center justify-between bg-smoke rounded-sm px-2 py-1.5">
                              <span className="text-white text-xs font-inter">{cls.className}</span>
                              <div className="flex items-center gap-2">
                                {cls.entries > 0 && <span className="text-track-silver text-[0.6rem] font-inter">{cls.entries} entries</span>}
                                {cls.hasQualifying && <span className="text-nzdra-blue text-[0.55rem] font-inter uppercase">Qual</span>}
                                {cls.hasEliminations && <span className="text-drag-red text-[0.55rem] font-inter uppercase">Elim</span>}
                                {cls.notes && <span className="text-track-silver text-[0.55rem] font-inter italic">{cls.notes}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2">
                        <p className="text-track-silver text-xs font-inter">Detailed class results available at source website.</p>
                      </div>
                    )}
                    <a href={result.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-drag-red text-xs font-inter font-medium mt-3 hover:underline">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View full results at {result.source}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-8">
            <p className="text-track-silver text-sm font-inter">No results found matching your search.</p>
          </div>
        )}

        {/* Note about updates */}
        <div className="bg-smoke rounded-md p-3 border border-smoke">
          <p className="text-track-silver text-[0.6rem] font-inter leading-relaxed text-center">
            Results are sourced directly from NZDRA, IHRA, and individual track websites. Information is updated as new results are published on the respective sites. Always refer to the official source for the most current and complete results.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
