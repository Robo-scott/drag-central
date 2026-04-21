import { useStore } from '@/store/useStore';
import ResourceCard from '@/components/ResourceCard';

export default function ResourcesPreview() {
  const resources = useStore((s) => s.resources);

  const nzdraResources = resources.filter((r) => r.acf.organisation === 'NZDRA').slice(0, 3);
  const ihraResources = resources.filter((r) => r.acf.organisation === 'IHRA').slice(0, 3);

  return (
    <section className="px-4 py-6">
      <h2 className="font-rajdhani font-bold text-drag-red uppercase tracking-[0.04em] text-lg mb-4">
        Resources & Licensing
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* NZDRA Resources */}
        <div className="bg-asphalt rounded-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-nzdra-blue rounded-full" />
            <h3 className="font-montserrat font-bold text-white text-sm">NZDRA RESOURCES</h3>
          </div>
          {nzdraResources.length > 0 ? (
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
          ) : (
            <p className="text-track-silver text-xs font-inter">Information Pending agreement</p>
          )}
        </div>

        {/* IHRA Resources */}
        <div className="bg-asphalt rounded-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-ihra-gold rounded-full" />
            <h3 className="font-montserrat font-bold text-white text-sm">IHRA RESOURCES</h3>
          </div>
          {ihraResources.length > 0 ? (
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
          ) : (
            <p className="text-track-silver text-xs font-inter">Information Pending agreement</p>
          )}
        </div>
      </div>
    </section>
  );
}
