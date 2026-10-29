import { Link } from "react-router-dom";
import {
  BookOpen,
  ClipboardCheck,
  Target,
  TrendingUp,
  Brain,
  ArrowRight,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import { sampleCourses } from "../data/mockdata";

function Dashboard() {
  let currentUser = {};
  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  } catch {
    currentUser = {};
  }

  const history = JSON.parse(
    localStorage.getItem("quizHistory") || "[]"
  );

  const totalAttempts = history.length;
  const averageScore = totalAttempts
    ? Math.round(
        history.reduce((sum, item) => sum + (item.percentage || 0), 0) /
          totalAttempts
      )
    : 0;

  const uniqueCourses = new Set(
    history.map((item) => item.courseId).filter(Boolean)
  ).size;

  const courses = sampleCourses.slice(0, 4);

  function getProgress(course) {
    const attempts = history.filter(
      (item) =>
        item.courseId === course.id ||
        item.courseTitle === course.title
    );

    if (!attempts.length) return 0;

    return Math.round(
      attempts.reduce((sum, item) => sum + (item.percentage || 0), 0) /
        attempts.length
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            <span>Memolearn</span>
            <img
              src="/brainicon.png"
              alt="Brain Icon"
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            />
          </span>
        }
        description={
          currentUser.name
            ? `Welcome back, ${currentUser.name}! Review your learning activity and discover what to practice next.`
            : "Review your learning activity and discover what to practice next."
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Available Courses"
          value={sampleCourses.length}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Quiz Attempts"
          value={totalAttempts}
          icon={ClipboardCheck}
          color="purple"
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Courses Practiced"
          value={uniqueCourses}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-950">
              Explore your courses
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a topic and start practicing.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-sm font-semibold text-gray-900 hover:text-black hover:underline"
          >
            View all
          </Link>
        </div>

        {courses.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={getProgress(course)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No courses available"
            description="Courses will appear here when they are added."
          />
        )}
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-white shadow-md">
        <div className="pointer-events-none absolute -bottom-10 -right-6 text-neutral-800/50">
          <Brain size={220} strokeWidth={0.8} />
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
            <Brain size={14} />
            Memory retention booster
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Want to strengthen your memory?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-300">
            Check your retention estimates to identify topics that may need
            more practice and stay on top of your learning goals.
          </p>

          <Link
            to="/predictions"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-gray-100 active:scale-[0.99]"
          >
            <span>View retention predictions</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
