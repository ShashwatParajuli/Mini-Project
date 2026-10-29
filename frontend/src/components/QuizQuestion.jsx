
import { CheckCircle2, Circle } from "lucide-react";

function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
      <p className="text-sm font-medium text-indigo-600">
        Question {questionNumber} of {totalQuestions}
      </p>

      <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 sm:text-xl">
        {question.question}
      </h2>

      <div className="mt-6 space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={`${question.id}-${index}`}
              type="button"
              onClick={() => onAnswer(index)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                  : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-gray-50"
              }`}
            >
              {isSelected ? (
                <CheckCircle2
                  size={21}
                  className="shrink-0 text-indigo-600"
                />
              ) : (
                <Circle
                  size={21}
                  className="shrink-0 text-gray-400"
                />
              )}

              <span className="text-sm leading-6">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizQuestion;
