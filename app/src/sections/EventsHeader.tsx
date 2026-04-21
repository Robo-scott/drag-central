interface Props {
  title: string;
  accentColor: string;
  backgroundImage: string;
}

export default function EventsHeader({ title, accentColor, backgroundImage }: Props) {
  return (
    <div className="relative h-[180px] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Events"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.95) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1
          className="font-rajdhani font-bold text-2xl uppercase tracking-[0.04em] text-center"
          style={{ color: accentColor }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
