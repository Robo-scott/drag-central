import { useState } from 'react';

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
}

const filters = ['ALL', 'ACTIVE', 'CONDITIONAL'];

export default function FilterBar({ activeFilter, onFilterChange, search, onSearchChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-carbon/95 backdrop-blur-sm border-b border-smoke px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3 py-1.5 text-xs font-montserrat font-bold uppercase tracking-wider rounded-sm transition-colors ${
                activeFilter === f
                  ? 'bg-drag-red text-white'
                  : 'bg-asphalt text-track-silver hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className={`flex-1 flex items-center gap-2 bg-asphalt rounded-sm px-3 py-1.5 border transition-colors ${
          isFocused ? 'border-drag-red' : 'border-transparent'
        }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-track-silver flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search tracks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="bg-transparent text-white text-xs font-inter w-full outline-none placeholder:text-track-silver"
          />
        </div>
      </div>
    </div>
  );
}
