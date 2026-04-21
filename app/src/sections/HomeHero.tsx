export default function HomeHero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4">
      {/* Dark radial overlay to ensure text readability over watermark */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.4) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md">
        {/* Tagline */}
        <p className="text-track-silver text-xs font-inter font-medium uppercase tracking-[0.2em] mb-6">
          New Zealand&apos;s Home of Drag Racing
        </p>

        {/* Main Title */}
        <h1
          className="font-rajdhani font-bold leading-[0.95] tracking-[0.02em]"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}
        >
          <span
            className="block text-white"
            style={{ textShadow: '0 0 40px rgba(11,11,11,0.9), 0 0 80px rgba(11,11,11,0.7)' }}
          >
            DRAG
          </span>
          <span
            className="block text-drag-red"
            style={{ textShadow: '0 0 40px rgba(11,11,11,0.9), 0 0 80px rgba(11,11,11,0.7)' }}
          >
            CENTRAL NZ
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-track-silver text-[0.6rem] font-inter font-medium uppercase tracking-[0.15em]">
          Explore
        </span>
        <div className="w-[2px] h-8 bg-drag-red animate-pulse-line rounded-full" />
      </div>
    </section>
  );
}
