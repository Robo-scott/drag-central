interface Props {
  status: 'ACTIVE' | 'CONDITIONAL';
}

export default function StatusBadge({ status }: Props) {
  const isActive = status === 'ACTIVE';
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[0.65rem] font-inter font-medium uppercase tracking-wider rounded-sm ${
        isActive
          ? 'bg-green-900/40 text-green-400 border border-green-700/50'
          : 'bg-amber-900/40 text-amber-400 border border-amber-700/50'
      }`}
    >
      {status}
    </span>
  );
}
