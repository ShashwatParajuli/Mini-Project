
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Trash2, ClipboardList } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import ConfirmDialog from "../components/ConfirmDialog";

function LearningHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quizHistory") || "[]");
    } catch {
      return [];
    }
  });

  const [showConfirm, setShowConfirm] = useState(false);

  function clearHistory() {
    localStorage.removeItem("quizHistory");
    setHistory([]);
    setShowConfirm(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning History"
        description="Review your previous quiz attempts and scores."
      />

      {history.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={17} />
            Clear history
          </button>
        </div>
      )}

      {history.length ? (
        <div className="space-y-3">
          {history.map((attempt, index) => (
            <div
              key={attempt.id || index}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <ClipboardList size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {attempt.quizTitle || "Quiz attempt"}
                  </h3>

                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <CalendarDays size={15} />
                    {attempt.date
                      ? new Date(attempt.date).toLocaleString()
                      : "Date unavailable"}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Score: {attempt.score ?? 0} / {attempt.totalQuestions ?? 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                    (attempt.percentage || 0) >= 75
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {attempt.percentage ?? 0}%
                </span>

                {attempt.quizId && (
                  <Link
                    to={`/quiz/${attempt.quizId}`}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Practice again
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No learning history yet"
          description="Your completed quizzes and scores will appear here."
        >
          <Link
            to="/courses"
            className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
          >
            Start practicing
          </Link>
        </EmptyState>
      )}

      <ConfirmDialog
        open={showConfirm}
        title="Clear learning history?"
        message="This will remove all quiz attempts saved in this browser. This action cannot be undone."
        confirmText="Clear history"
        cancelText="Keep history"
        onConfirm={clearHistory}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default LearningHistory;
