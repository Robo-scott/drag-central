interface Props {
  body: 'NZDRA' | 'IHRA';
}

export default function SanctioningBadge({ body }: Props) {
  const isNzdrd = body === 'NZDRA';
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[0.65rem] font-inter font-medium uppercase tracking-wider rounded-sm ${
        isNzdrd
          ? 'bg-nzdra-blue/20 text-blue-400 border border-nzdra-blue/40'
          : 'bg-ihra-gold/20 text-yellow-400 border border-ihra-gold/40'
      }`}
    >
      {body}
    </span>
  );
}
