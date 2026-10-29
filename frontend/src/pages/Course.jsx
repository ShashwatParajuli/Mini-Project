import PageHeader from "../components/PageHeader";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import { sampleCourses } from "../data/mockdata";

function Courses() {
  const history = JSON.parse(
    localStorage.getItem("quizHistory") || "[]"
  );

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
    <div className="space-y-6">
      <PageHeader
        title="My Courses"
        description="Explore subjects, practice quizzes, and review your progress."
      />

      {sampleCourses.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sampleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getProgress(course)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No courses yet"
          description="Available courses will appear here."
        />
      )}
    </div>
  );
}

export default Courses;
