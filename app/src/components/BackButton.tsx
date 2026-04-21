import { useStore } from '@/store/useStore';

interface Props {
  fallback?: string;
}

export default function BackButton({ fallback = 'tracks' }: Props) {
  const previousPage = useStore((s) => s.previousPage);
  const navigate = useStore((s) => s.navigate);

  const handleClick = () => {
    const target = previousPage ?? fallback;
    navigate(target as 'tracks');
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 text-drag-red text-sm font-montserrat font-bold uppercase tracking-wider hover:underline mb-4"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      BACK TO {fallback.toUpperCase()}
    </button>
  );
}
