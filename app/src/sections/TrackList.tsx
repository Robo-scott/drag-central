import { useState } from 'react';
import { useStore } from '@/store/useStore';
import TrackCard from '@/components/TrackCard';
import FilterBar from '@/components/FilterBar';
import SkeletonCard from '@/components/SkeletonCard';

export default function TrackList() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const loading = useStore((s) => s.loading);
  const getFilteredTracks = useStore((s) => s.getFilteredTracks);

  const tracks = getFilteredTracks(filter, search);

  return (
    <div>
      <FilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />
      <div className="px-4 py-3 space-y-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : tracks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-track-silver text-sm font-inter">No tracks found matching your criteria.</p>
          </div>
        ) : (
          tracks.map((track) => <TrackCard key={track.id} track={track} />)
        )}
      </div>
    </div>
  );
}
