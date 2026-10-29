
import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Calculator,
  FlaskConical,
  Monitor,
} from "lucide-react";
import ProgressBar from "./ProgressBar";

const iconMap = {
  Calculator,
  FlaskConical,
  Monitor,
  BookOpen,
};

const courseThemes = {
  blue: {
    cardBg: "bg-sky-50/50 hover:bg-sky-50/80 border-sky-100/80",
    iconBg: "bg-white text-sky-700 border border-sky-100 shadow-xs",
    badge: "bg-white text-sky-800 border-sky-200/70",
    progressColor: "bg-sky-600",
  },
  purple: {
    cardBg: "bg-purple-50/50 hover:bg-purple-50/80 border-purple-100/80",
    iconBg: "bg-white text-purple-700 border border-purple-100 shadow-xs",
    badge: "bg-white text-purple-800 border-purple-200/70",
    progressColor: "bg-purple-600",
  },
  green: {
    cardBg: "bg-emerald-50/50 hover:bg-emerald-50/80 border-emerald-100/80",
    iconBg: "bg-white text-emerald-700 border border-emerald-100 shadow-xs",
    badge: "bg-white text-emerald-800 border-emerald-200/70",
    progressColor: "bg-emerald-600",
  },
  orange: {
    cardBg: "bg-amber-50/50 hover:bg-amber-50/80 border-amber-100/80",
    iconBg: "bg-white text-amber-700 border border-amber-100 shadow-xs",
    badge: "bg-white text-amber-800 border-amber-200/70",
    progressColor: "bg-amber-600",
  },
};

function CourseCard({ course, progress = 0 }) {
  const Icon = iconMap[course.icon] || BookOpen;
  const theme = courseThemes[course.color] || courseThemes.blue;

  return (
    <div
      className={`rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.cardBg}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconBg}`}
        >
          <Icon size={22} />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme.badge}`}
        >
          {course.category || "Course"}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-950">
        {course.title}
      </h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
        {course.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs font-semibold">
          <span className="text-gray-500 uppercase tracking-wider">Progress</span>
          <span className="text-gray-900">{progress}%</span>
        </div>

        <ProgressBar progress={progress} color={theme.progressColor} />
      </div>

      <Link
        to={`/courses/${course.id}`}
        className="mt-5 flex items-center justify-between rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99]"
      >
        <span>Explore course</span>
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

export default CourseCard;
