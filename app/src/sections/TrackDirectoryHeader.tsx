export default function TrackDirectoryHeader() {
  return (
    <div className="relative h-[200px] overflow-hidden">
      <img
        src="/images/track-meremere.jpg"
        alt="Drag strip"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="font-rajdhani font-bold text-white text-3xl uppercase tracking-[0.04em] text-center">
          NZ Track Directory
        </h1>
        <p className="text-track-silver text-sm font-inter text-center mt-1">
          Find information on all drag racing tracks in New Zealand
        </p>
      </div>
    </div>
  );
}
