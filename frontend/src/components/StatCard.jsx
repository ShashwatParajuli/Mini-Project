
import { TrendingUp } from "lucide-react";

const cardThemes = {
  blue: {
    cardBg: "bg-sky-50/60 hover:bg-sky-50/80 border-sky-100/80",
    iconBg: "bg-white text-sky-600 shadow-sm border border-sky-100",
    label: "text-sky-900/70",
  },
  purple: {
    cardBg: "bg-purple-50/60 hover:bg-purple-50/80 border-purple-100/80",
    iconBg: "bg-white text-purple-600 shadow-sm border border-purple-100",
    label: "text-purple-900/70",
  },
  green: {
    cardBg: "bg-emerald-50/60 hover:bg-emerald-50/80 border-emerald-100/80",
    iconBg: "bg-white text-emerald-600 shadow-sm border border-emerald-100",
    label: "text-emerald-900/70",
  },
  orange: {
    cardBg: "bg-amber-50/60 hover:bg-amber-50/80 border-amber-100/80",
    iconBg: "bg-white text-amber-600 shadow-sm border border-amber-100",
    label: "text-amber-900/70",
  },
  red: {
    cardBg: "bg-rose-50/60 hover:bg-rose-50/80 border-rose-100/80",
    iconBg: "bg-white text-rose-600 shadow-sm border border-rose-100",
    label: "text-rose-900/70",
  },
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon = TrendingUp,
  color = "blue",
}) {
  const theme = cardThemes[color] || cardThemes.blue;

  return (
    <div
      className={`rounded-2xl border p-5 shadow-xs transition duration-200 ${theme.cardBg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${theme.label}`}>
            {title}
          </p>

          <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-gray-950">
            {value}
          </h3>

          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.iconBg}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
