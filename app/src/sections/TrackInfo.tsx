import type { WPTrack } from '@/types/wordpress';

interface Props {
  track: WPTrack;
}

export default function TrackInfo({ track }: Props) {
  const acf = track.acf;

  return (
    <div className="bg-[#F5F5F5] text-carbon -mx-4 px-4 py-6">
      <h2 className="font-rajdhani font-bold text-carbon text-xl uppercase tracking-[0.04em] mb-4">
        Track Information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Address</p>
          <p className="text-sm font-inter text-carbon">{acf.physical_location}</p>
        </div>
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Surface</p>
          <p className="text-sm font-inter text-carbon">{acf.primary_surface_raw}</p>
        </div>
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Configuration</p>
          <p className="text-sm font-inter text-carbon">{acf.track_configuration_raw}</p>
        </div>
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Venue Type</p>
          <p className="text-sm font-inter text-carbon">{acf.venue_category}</p>
        </div>
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Operating Entity</p>
          <p className="text-sm font-inter text-carbon">{acf.operating_entity}</p>
        </div>
        <div>
          <p className="text-xs font-inter font-medium uppercase tracking-wider text-gray-500 mb-0.5">Region</p>
          <p className="text-sm font-inter text-carbon">{acf.region}</p>
        </div>
      </div>

      {/* Contact Section */}
      <h3 className="font-montserrat font-bold text-carbon text-sm uppercase tracking-wider mb-3">
        Contact
      </h3>
      <div className="space-y-2">
        {acf.website_url && (
          <a
            href={acf.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-inter text-nzdra-blue hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Visit Website
          </a>
        )}
        {acf.contact_email && (
          <a
            href={`mailto:${acf.contact_email}`}
            className="flex items-center gap-2 text-sm font-inter text-nzdra-blue hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            {acf.contact_email}
          </a>
        )}
        {acf.contact_phone && (
          <a
            href={`tel:${acf.contact_phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-sm font-inter text-nzdra-blue hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {acf.contact_phone}
          </a>
        )}
      </div>

      {/* About Section */}
      {acf.operational_notes && (
        <div className="mt-6">
          <h3 className="font-montserrat font-bold text-carbon text-sm uppercase tracking-wider mb-2">
            About
          </h3>
          <div
            className="text-sm font-inter text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: acf.operational_notes }}
          />
        </div>
      )}
    </div>
  );
}
