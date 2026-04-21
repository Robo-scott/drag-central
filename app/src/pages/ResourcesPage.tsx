import { useStore } from '@/store/useStore';
import ResourcesList from '@/sections/ResourcesList';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const getResourcesByOrg = useStore((s) => s.getResourcesByOrg);
  const loading = useStore((s) => s.loading);
  const navigate = useStore((s) => s.navigate);

  const nzdraResources = getResourcesByOrg('NZDRA');
  const ihraResources = getResourcesByOrg('IHRA');

  return (
    <div className="relative z-10">
      <div className="relative h-[160px] overflow-hidden">
        <img
          src="/images/track-meremere.jpg"
          alt="Resources"
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
            Resources & Licensing
          </h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">
            Access NZDRA and IHRA rulebooks, licensing info, and more
          </p>
        </div>
      </div>

      {/* Vehicle Profiles CTA */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate('vehicleProfiles')}
          className="touch-active w-full bg-asphalt rounded-md p-4 border border-ihra-gold/40 flex items-center gap-4 text-left"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-ihra-gold/20 rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">
              Vehicle Profiles
            </h3>
            <p className="text-track-silver text-xs font-inter mt-0.5">
              NZ drag racing vehicles, specs, race numbers, and driver links — sourced from track websites
            </p>
          </div>
          <div className="flex-shrink-0 text-ihra-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Results CTA */}
      <div className="px-4 pt-3">
        <button
          onClick={() => navigate('results')}
          className="touch-active w-full bg-asphalt rounded-md p-4 border border-drag-red/40 flex items-center gap-4 text-left"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-drag-red/20 rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">
              Results
            </h3>
            <p className="text-track-silver text-xs font-inter mt-0.5">
              Past event results by date and track, searchable by season, venue, and class
            </p>
          </div>
          <div className="flex-shrink-0 text-drag-red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </button>
      </div>

      {/* NZDRA Classes CTA */}
      <div className="px-4 pt-3">
        <button
          onClick={() => navigate('nzdraClasses')}
          className="touch-active w-full bg-asphalt rounded-md p-4 border border-nzdra-blue/40 flex items-center gap-4 text-left"
        >
          <div className="flex-shrink-0 w-12 h-12 bg-nzdra-blue/20 rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">
              NZDRA Race Classes
            </h3>
            <p className="text-track-silver text-xs font-inter mt-0.5">
              Browse all NZDRA bracket, index, and heads-up classes with ET ranges, requirements, and specs
            </p>
          </div>
          <div className="flex-shrink-0 text-nzdra-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Licensing Pathways */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-drag-red rounded-full" />
          <h2 className="font-rajdhani font-bold text-drag-red text-lg uppercase tracking-[0.04em]">
            Licensing Pathways
          </h2>
        </div>
        <p className="text-track-silver text-xs font-inter mb-3">
          All licences are issued by the official sanctioning bodies. Drag Central provides direct links to official application processes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* NZDRA Resources */}
          <div className="bg-asphalt rounded-md p-4 border border-nzdra-blue/30">
            <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-2">
              NZDRA Resources
            </h3>
            <p className="text-track-silver text-xs font-inter mb-3">
              New Zealand Drag Racing Association official documents. All applications processed through NZDRA.
            </p>
            <div className="space-y-2">
              <a
                href="https://www.nzdra.co.nz/technical/rule-book"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-nzdra-blue text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                Rule Book
              </a>
              <a
                href="https://www.nzdra.co.nz/technical/licence-application-form"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-nzdra-blue text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                Licence Application
              </a>
              <a
                href="https://www.nzdra.co.nz/technical/licence-transfer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-nzdra-blue text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Licence Transfer
              </a>
              <a
                href="https://www.nzdra.co.nz/technical/rule-submissions-amendments"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-nzdra-blue text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Rule Submission / Amendments
              </a>
              <a
                href="https://www.nzdra.co.nz/about-us"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-nzdra-blue text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                About NZDRA
              </a>
            </div>
          </div>

          {/* IHRA Licensing */}
          <div className="bg-asphalt rounded-md p-4 border border-ihra-gold/30">
            <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-2">
              IHRA Licensing
            </h3>
            <p className="text-track-silver text-xs font-inter mb-3">
              International Hot Rod Association competition licences. All applications processed through IHRA.
            </p>
            <div className="space-y-2">
              <a
                href="https://www.ihra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ihra-gold text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Apply for IHRA Licence
              </a>
              <a
                href="https://www.ihra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ihra-gold text-xs font-inter hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Renew IHRA Licence
              </a>
            </div>
          </div>
        </div>

        {/* Safety Requirements Note */}
        <div className="bg-smoke rounded-md p-4 mb-6 border border-smoke">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div>
              <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider mb-1">
                Safety Requirements
              </h4>
              <p className="text-track-silver text-xs font-inter leading-relaxed">
                All drivers must hold current licences and comply with class-specific safety equipment rules. 
                Refer to the official rulebooks for detailed requirements. Drag Central does not interpret 
                regulations — always consult the official sanctioning body.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ResourcesList
        nzdraResources={nzdraResources}
        ihraResources={ihraResources}
        loading={loading}
      />
      <Footer />
    </div>
  );
}
