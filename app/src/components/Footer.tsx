export default function Footer() {
  return (
    <footer className="border-t border-smoke py-6 pb-8">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="text-track-silver hover:text-drag-red transition-colors" aria-label="Facebook">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="#" className="text-track-silver hover:text-drag-red transition-colors" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href="#" className="text-track-silver hover:text-drag-red transition-colors" aria-label="YouTube">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.46z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
          </svg>
        </a>
      </div>
      <p className="text-center text-track-silver/60 text-[0.6rem] font-inter leading-relaxed px-4 mb-2">
        Drag Central NZ is an independent information and signposting platform. Information is sourced directly from NZDRA, IHRA, and individual track websites and is not altered, interpreted, or owned by Drag Central. All licensing, regulations, and governance remain solely with NZDRA, IHRA, and the respective tracks.
      </p>
      <p className="text-center text-track-silver text-xs font-inter">
        &copy; 2026 Drag Central. All Rights Reserved
      </p>
    </footer>
  );
}
