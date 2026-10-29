import { useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ProgressBar from "../components/ProgressBar";
import QuizQuestion from "../components/QuizQuestion";
import { getQuizById } from "../data/mockdata";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizById(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startedAt] = useState(Date.now());

  if (!quiz || !quiz.questions?.length) {
    return <Navigate to="/courses" replace />;
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const progress = Math.round(
    ((currentIndex + 1) / questions.length) * 100
  );

  function selectAnswer(answerIndex) {
    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: answerIndex,
    }));
  }

  function submitQuiz() {
    const correctCount = questions.reduce((total, question, index) => {
      return total + (
        answers[index] === question.correctAnswer ? 1 : 0
      );
    }, 0);

    const percentage = Math.round(
      (correctCount / questions.length) * 100
    );

    const attempt = {
      id: String(Date.now()),
      quizId: quiz.id,
      quizTitle: quiz.title,
      courseId: quiz.courseId || "",
      courseTitle: quiz.courseTitle || "",
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      answers,
      date: new Date().toISOString(),
      timeTakenSeconds: Math.round((Date.now() - startedAt) / 1000),
    };

    const history = JSON.parse(
      localStorage.getItem("quizHistory") || "[]"
    );

    history.unshift(attempt);
    localStorage.setItem("quizHistory", JSON.stringify(history));

    navigate("/quiz-result", {
      state: { attempt, quiz },
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600"
      >
        <ArrowLeft size={17} />
        Back to courses
      </Link>

      <PageHeader
        title={quiz.title}
        description="Answer each question and submit when you're ready."
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm text-gray-500">
            Your progress
          </span>
          <span className="text-sm font-semibold text-indigo-600">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <ProgressBar progress={progress} />
        <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Clock size={15} />
          Time taken is recorded when you submit.
        </p>
      </div>

      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onAnswer={selectAnswer}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((index) => index - 1)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={17} />
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            type="button"
            disabled={selectedAnswer === undefined}
            onClick={() => setCurrentIndex((index) => index + 1)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ArrowRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            disabled={Object.keys(answers).length !== questions.length}
            onClick={submitQuiz}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit quiz
          </button>
        )}
      </div>

      {Object.keys(answers).length !== questions.length && (
        <p className="text-right text-xs text-gray-500">
          Answer all questions before submitting.
        </p>
      )}
    </div>
  );
}

export default Quiz;
