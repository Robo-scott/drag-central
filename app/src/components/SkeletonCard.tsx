export default function SkeletonCard() {
  return (
    <div className="w-full flex items-center gap-4 bg-asphalt rounded-md p-3 animate-pulse">
      <div className="w-[120px] h-[68px] bg-smoke rounded-sm flex-shrink-0 skeleton" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-smoke rounded-sm w-3/4 skeleton" />
        <div className="h-3 bg-smoke rounded-sm w-1/2 skeleton" />
        <div className="h-3 bg-smoke rounded-sm w-2/3 skeleton" />
      </div>
    </div>
  );
}
