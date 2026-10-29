
import { BookOpen } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Your information will appear here when available.",
  icon: Icon = BookOpen,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Icon size={26} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
