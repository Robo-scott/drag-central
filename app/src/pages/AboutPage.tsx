import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="relative z-10">
      {/* Header */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src="/images/hero-logo.png"
          alt="Drag Central NZ"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.98) 100%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-rajdhani font-bold text-white text-3xl uppercase tracking-[0.04em] text-center">
            About Drag Central
          </h1>
          <p className="text-track-silver text-sm font-inter text-center mt-1">
            New Zealand&apos;s unified digital platform for drag racing
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Vision */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-drag-red rounded-full" />
            <h2 className="font-rajdhani font-bold text-drag-red text-xl uppercase tracking-[0.04em]">
              Our Vision
            </h2>
          </div>
          <p className="text-white text-sm font-inter leading-relaxed">
            Drag Central NZ is designed as a unified digital ecosystem for drag racing in New Zealand. 
            The platform provides a single digital front door for regulations, licensing access, 
            event calendars, track directories, classifieds, and future operational tools. The goal 
            is to strengthen and modernise the sport while preserving full authority with sanctioning 
            bodies and tracks.
          </p>
        </section>

        {/* What Drag Central Does */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-nzdra-blue rounded-full" />
            <h2 className="font-rajdhani font-bold text-nzdra-blue text-xl uppercase tracking-[0.04em]">
              What Drag Central Does
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Track Directory',
                desc: 'Complete listings of all NZ drag racing tracks with contact info, facilities, and operational status.',
              },
              {
                title: 'Event Calendars',
                desc: 'NZDRA and IHRA event calendars sourced directly from official sanctioning bodies.',
              },
              {
                title: 'Resource Signposting',
                desc: 'Direct links to official rulebooks, licensing forms, and regulations from NZDRA and IHRA.',
              },
              {
                title: 'Classifieds Marketplace',
                desc: 'Buy and sell drag cars, parts, trailers, safety gear, photography services, and team merchandise.',
              },
              {
                title: 'Digital Event Registrations',
                desc: 'Online driver and crew registration for sanctioned events (coming soon).',
              },
              {
                title: 'Licensing Pathways',
                desc: 'Clear links to official NZDRA and IHRA licence applications, renewals, and requirements.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-asphalt rounded-md p-3 border-l-2 border-nzdra-blue">
                <h3 className="font-montserrat font-bold text-white text-sm">{item.title}</h3>
                <p className="text-track-silver text-xs font-inter mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Drag Central Does NOT Do */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-ihra-gold rounded-full" />
            <h2 className="font-rajdhani font-bold text-ihra-gold text-xl uppercase tracking-[0.04em]">
              What Drag Central Does NOT Do
            </h2>
          </div>
          <p className="text-track-silver text-sm font-inter mb-3 leading-relaxed">
            Drag Central operates under strict governance principles to ensure authority remains 
            with the official sanctioning bodies and tracks:
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'No Data Alteration',
                desc: 'All information is replicated exactly from source websites. No data is altered, rewritten, interpreted, or overridden.',
              },
              {
                title: 'No Licence Issuance',
                desc: 'Drag Central does not issue licences or interpret regulations. All authority remains with NZDRA, IHRA, and individual tracks.',
              },
              {
                title: 'Source-First Attribution',
                desc: 'Clear attribution and linking to official sources is always provided.',
              },
              {
                title: 'Governance Remains Official',
                desc: 'Governance authority always remains with NZDRA, IHRA, and individual tracks. Drag Central is a platform, not a governing body.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-asphalt rounded-md p-3 border-l-2 border-ihra-gold">
                <h3 className="font-montserrat font-bold text-white text-sm">{item.title}</h3>
                <p className="text-track-silver text-xs font-inter mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Capabilities */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-drag-red rounded-full" />
            <h2 className="font-rajdhani font-bold text-drag-red text-xl uppercase tracking-[0.04em]">
              Future Capabilities
            </h2>
          </div>
          <p className="text-track-silver text-xs font-inter mb-3">
            All future features are subject to sanctioning body consultation and approval:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              'Digital event registrations (drivers and crews)',
              'Event accreditation and wristband printing',
              'Read-only licence status visibility',
              'Digital vehicle logbook companions',
              'Digital technical inspections with photo evidence',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 bg-asphalt rounded-md px-3 py-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4161C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-white text-xs font-inter">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="pb-4">
          <div className="bg-asphalt rounded-md p-4 text-center">
            <p className="text-track-silver text-xs font-inter mb-2">
              For enquiries, partnerships, or feedback
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
