import { useStore } from '@/store/useStore';
import EventCalendar from '@/components/EventCalendar';
import Footer from '@/components/Footer';

export default function NzdraEventsPage() {
  const events = useStore((s) => s.events).filter(
    (e) => e.acf.sanctioning_body === 'NZDRA'
  );

  return (
    <div className="relative z-10">
      <div className="px-4 pt-4">
        <h1 className="font-rajdhani font-bold text-drag-red text-2xl uppercase tracking-[0.04em] text-center mb-4">
          NZDRA Events Calendar
        </h1>
        <p className="text-track-silver text-xs font-inter text-center mb-4">
          Events sourced from individual tracks and NZDRA
        </p>
      </div>

      {/* Online Entries */}
      <div className="px-4 pt-2">
        <div className="bg-asphalt rounded-md p-4 border border-nzdra-blue/30">
          <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">
            Online Entries
          </h3>
          <p className="text-track-silver text-xs font-inter leading-relaxed mb-3">
            Subject to approval from the relevant track and regulating bodies.
            Online entry opens once event dates are confirmed and published.
            Information required is the same as collected at the track on the day.
            Entries can be submitted for a single event or multiple dates.
            Vehicle breakdown / unforeseen circumstances — contact us directly to discuss options.
          </p>
          <p className="text-white text-xs font-inter font-medium leading-relaxed mb-2">
            Your race pack collection includes:
          </p>
          <ul className="text-track-silver text-xs font-inter leading-relaxed mb-3 space-y-1">
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Driver and crew wristbands</li>
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Site map and contact details</li>
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Health and safety information</li>
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Proposed race schedule</li>
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Sponsor information</li>
            <li className="flex items-start gap-2"><span className="text-nzdra-blue flex-shrink-0">-</span>Any additional event-specific documentation</li>
          </ul>
          <p className="text-track-silver text-xs font-inter leading-relaxed">
            Gate entry fees continue to be paid on the day as usual.
          </p>
        </div>
      </div>

      {/* Monthly Calendar */}
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-nzdra-blue rounded-full" />
          <h2 className="font-rajdhani font-bold text-white text-lg uppercase tracking-[0.04em]">
            Event Calendar
          </h2>
        </div>
        <EventCalendar events={events} accentColor="#0066CC" />
      </div>

      <div className="px-4 pt-6 pb-4">
        <a
          href="https://www.nzdra.co.nz"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 text-white font-montserrat font-bold uppercase tracking-wider text-sm rounded-md bg-nzdra-blue hover:opacity-90 transition-opacity"
        >
          Visit NZDRA Official Website
        </a>
      </div>

      <Footer />
    </div>
  );
}
