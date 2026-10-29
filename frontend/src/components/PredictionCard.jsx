
import { Brain, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import ProgressBar from "./ProgressBar";

function PredictionCard({
  topic,
  retention,
  lastPracticed,
  recommendation,
}) {
  const score = Math.max(0, Math.min(100, Number(retention) || 0));

  const status =
    score >= 75
      ? {
          label: "Good retention",
          color: "text-green-700 bg-green-50",
          icon: TrendingUp,
        }
      : score >= 50
        ? {
            label: "Needs practice",
            color: "text-amber-700 bg-amber-50",
            icon: RotateCcw,
          }
        : {
            label: "Revise soon",
            color: "text-red-700 bg-red-50",
            icon: TrendingDown,
          };

  const StatusIcon = status.icon;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-xs">
            <Brain size={20} />
          </div>

          <div>
            <h3 className="font-bold text-gray-950">
              {topic}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Last practiced: {lastPracticed || "Not available"}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
        >
          <StatusIcon size={14} />
          {status.label}
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">Estimated retention</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {score}%
          </p>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar progress={score} />
      </div>

      {recommendation && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3">
          <p className="text-sm leading-6 text-gray-600">
            {recommendation}
          </p>
        </div>
      )}
    </div>
  );
}

export default PredictionCard;
