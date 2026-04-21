import { useStore } from '@/store/useStore';
import type { PageType } from '@/types/wordpress';

interface Props {
  page: PageType;
  title: string;
  subtitle: string;
  borderColor: string;
  icon: React.ReactNode;
}

export default function QuickActionCard({ page, title, subtitle, borderColor, icon }: Props) {
  const navigate = useStore((s) => s.navigate);

  return (
    <button
      onClick={() => navigate(page)}
      className="touch-active w-full flex items-center gap-4 bg-asphalt rounded-md p-4 text-left relative overflow-hidden"
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: borderColor }}
      />
      <div className="flex-shrink-0" style={{ color: borderColor }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-track-silver text-xs font-inter mt-0.5">
          {subtitle}
        </p>
      </div>
      <div className="flex-shrink-0 text-track-silver">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </button>
  );
}
