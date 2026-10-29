import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, XCircle, RotateCcw, BookOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ProgressBar from "../components/ProgressBar";

function QuizResult() {
  const location = useLocation();
  const attempt = location.state?.attempt;
  const quiz = location.state?.quiz;

  if (!attempt || !quiz) {
    return <Navigate to="/history" replace />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Quiz Results"
        description={`Your results for ${quiz.title}`}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <CheckCircle2 size={34} />
        </div>

        <p className="mt-4 text-sm text-gray-500">Your score</p>
        <h2 className="mt-1 text-4xl font-bold text-gray-900">
          {attempt.percentage}%
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {attempt.score} out of {attempt.totalQuestions} answers correct
        </p>

        <div className="mx-auto mt-6 max-w-md">
          <ProgressBar progress={attempt.percentage} />
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Review your answers
        </h2>

        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const selected = attempt.answers?.[index];
            const isCorrect = selected === question.correctAnswer;

            return (
              <div
                key={question.id || index}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                  ) : (
                    <XCircle
                      size={21}
                      className="mt-0.5 shrink-0 text-red-500"
                    />
                  )}

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {index + 1}. {question.question}
                    </h3>

                    <p className="mt-3 text-sm text-gray-600">
                      Your answer:{" "}
                      <span className="font-medium">
                        {selected === undefined
                          ? "Not answered"
                          : question.options[selected]}
                      </span>
                    </p>

                    {!isCorrect && (
                      <p className="mt-2 text-sm text-green-700">
                        Correct answer:{" "}
                        {question.options[question.correctAnswer]}
                      </p>
                    )}

                    {question.explanation && (
                      <p className="mt-3 rounded-xl bg-gray-50 p-3 text-sm leading-6 text-gray-600">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/quiz/${quiz.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <RotateCcw size={17} />
          Try again
        </Link>

        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <BookOpen size={17} />
          Browse courses
        </Link>
      </div>
    </div>
  );
}

export default QuizResult;
