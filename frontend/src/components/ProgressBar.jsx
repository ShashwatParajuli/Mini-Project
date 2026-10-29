
export default function ProgressBar({
  value,
  progress: progressProp,
  color = "bg-neutral-900",
  showLabel = false,
}) {
  const raw = value !== undefined ? value : progressProp;
  const progress = Math.min(100, Math.max(0, Number(raw) || 0));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-gray-700">
            {progress}%
          </span>
        </div>
      )}

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
