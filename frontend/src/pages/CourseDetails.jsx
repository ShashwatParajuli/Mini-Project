import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { getCourseById, getQuizById } from "../data/mockdata";

function CourseDetails() {
  const { id } = useParams();
  const course = getCourseById(id);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const history = JSON.parse(
    localStorage.getItem("quizHistory") || "[]"
  );

  return (
    <div className="space-y-6">
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft size={17} />
        Back to courses
      </Link>

      <PageHeader
        title={course.title}
        description={course.description}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Course overview</h2>
            <p className="text-sm text-gray-500">
              {course.topics?.length || 0} learning topics
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Learning topics
        </h2>

        {course.topics?.length ? (
          <div className="space-y-3">
            {course.topics.map((topic, index) => {
              const topicId =
                typeof topic === "string" ? topic : topic.id;
              const topicTitle =
                typeof topic === "string" ? topic : topic.title;
              const quiz = getQuizById(topicId);

              const completed = history.some(
                (attempt) => attempt.quizId === quiz?.id
              );

              return (
                <div
                  key={topicId || index}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
                      {completed ? (
                        <CheckCircle2 size={21} />
                      ) : (
                        <BookOpen size={21} />
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {topicTitle}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {completed ? "Previously practiced" : "Not practiced yet"}
                      </p>
                    </div>
                  </div>

                  {quiz ? (
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      <PlayCircle size={18} />
                      Start quiz
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Quiz not available
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No topics available"
            description="Topics for this course have not been added yet."
          />
        )}
      </section>
    </div>
  );
}

export default CourseDetails;
