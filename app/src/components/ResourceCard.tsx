interface Props {
  title: string;
  description: string;
  url: string;
  buttonColor?: 'red' | 'blue' | 'gold';
}

export default function ResourceCard({ title, description, url, buttonColor = 'red' }: Props) {
  const colorClasses = {
    red: 'bg-drag-red',
    blue: 'bg-nzdra-blue',
    gold: 'bg-ihra-gold',
  };

  return (
    <div className="bg-asphalt rounded-md p-4">
      <h4 className="font-montserrat font-bold text-white text-sm mb-1">
        {title}
      </h4>
      <p className="text-track-silver text-xs font-inter mb-3">
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center px-4 py-2 ${colorClasses[buttonColor]} text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity`}
      >
        VIEW
      </a>
    </div>
  );
}
