import type { WPResource } from '@/types/wordpress';
import ResourceCard from '@/components/ResourceCard';
import SkeletonCard from '@/components/SkeletonCard';

interface Props {
  nzdraResources: WPResource[];
  ihraResources: WPResource[];
  loading: boolean;
}

export default function ResourcesList({ nzdraResources, ihraResources, loading }: Props) {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* NZDRA Resources */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-nzdra-blue rounded-full" />
          <h2 className="font-montserrat font-bold text-white text-lg uppercase tracking-wider">
            NZDRA Resources
          </h2>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : nzdraResources.length === 0 ? (
          <p className="text-track-silver text-sm font-inter">Information Pending agreement</p>
        ) : (
          <div className="space-y-3">
            {nzdraResources.map((r) => (
              <ResourceCard
                key={r.id}
                title={r.title.rendered}
                description={r.acf.summary}
                url={r.acf.official_url}
                buttonColor="blue"
              />
            ))}
          </div>
        )}
      </div>

      {/* IHRA Resources */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-ihra-gold rounded-full" />
          <h2 className="font-montserrat font-bold text-white text-lg uppercase tracking-wider">
            IHRA Resources
          </h2>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : ihraResources.length === 0 ? (
          <p className="text-track-silver text-sm font-inter">Information Pending agreement</p>
        ) : (
          <div className="space-y-3">
            {ihraResources.map((r) => (
              <ResourceCard
                key={r.id}
                title={r.title.rendered}
                description={r.acf.summary}
                url={r.acf.official_url}
                buttonColor="gold"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
