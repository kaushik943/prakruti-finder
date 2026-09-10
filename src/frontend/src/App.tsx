import { useState } from "react";
import type { QuizResult } from "./backend";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export type AppPage = "landing" | "quiz" | "results";

export default function App() {
  const [page, setPage] = useState<AppPage>("landing");
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStart = () => setPage("quiz");
  const handleComplete = (result: QuizResult) => {
    setQuizResult(result);
    setPage("results");
  };
  const handleRetake = () => {
    setQuizResult(null);
    setPage("quiz");
  };
  const handleHome = () => {
    setQuizResult(null);
    setPage("landing");
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {page === "landing" && <LandingPage onStart={handleStart} />}
      {page === "quiz" && (
        <QuizPage onComplete={handleComplete} onBack={handleHome} />
      )}
      {page === "results" && quizResult && (
        <ResultsPage
          result={quizResult}
          onRetake={handleRetake}
          onHome={handleHome}
        />
      )}
    </div>
  );
}
