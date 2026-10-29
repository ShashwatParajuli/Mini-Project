
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PredictionCard from "../components/PredictionCard";
import EmptyState from "../components/EmptyState";

function estimateRetention(score, daysSincePractice) {
  return Math.max(
    20,
    Math.min(98, Math.round(score - daysSincePractice * 4))
  );
}

function Predictions() {
  const history = JSON.parse(
    localStorage.getItem("quizHistory") || "[]"
  );

  const latestByTopic = {};

  history.forEach((attempt) => {
    const topic = attempt.quizTitle || attempt.topicTitle;

    if (!topic) return;

    const existing = latestByTopic[topic];

    if (
      !existing ||
      new Date(attempt.date || 0) > new Date(existing.date || 0)
    ) {
      latestByTopic[topic] = attempt;
    }
  });

  const predictions = Object.entries(latestByTopic).map(
    ([topic, attempt]) => {
      const practicedDate = new Date(attempt.date);
      const validDate = !Number.isNaN(practicedDate.getTime());
      const daysSincePractice = validDate
        ? Math.max(
            0,
            Math.floor(
              (Date.now() - practicedDate.getTime()) / 86400000
            )
          )
        : 0;

      const retention = estimateRetention(
        attempt.percentage || 0,
        daysSincePractice
      );

      return {
        topic,
        retention,
        lastPracticed: validDate
          ? practicedDate.toLocaleDateString()
          : "Date unavailable",
        recommendation:
          retention < 50
            ? "Consider revising this topic and taking its quiz again."
            : retention < 75
              ? "A short revision session may help strengthen your recall."
              : "Continue practicing occasionally to maintain your progress.",
      };
    }
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Retention Predictions"
        description="Review estimated retention for topics you have practiced."
      />

      <div className="flex gap-4 rounded-3xl border border-neutral-800 bg-neutral-950 p-6 text-white shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-white">
          <Brain size={22} />
        </div>
        <div>
          <h2 className="font-bold text-white">
            About these estimates
          </h2>
          <p className="mt-1 text-sm leading-6 text-neutral-300">
            These are demonstration estimates based on your latest quiz
            score and time since practice. They are not predictions from
            a trained AI model and do not directly measure what you remember.
          </p>
        </div>
      </div>

      {predictions.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {predictions.map((prediction) => (
            <PredictionCard
              key={prediction.topic}
              topic={prediction.topic}
              retention={prediction.retention}
              lastPracticed={prediction.lastPracticed}
              recommendation={prediction.recommendation}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No predictions yet"
          description="Complete a quiz first. Your topic estimates will appear here."
        >
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.99]"
          >
            Explore courses
          </Link>
        </EmptyState>
      )}
    </div>
  );
}

export default Predictions;
