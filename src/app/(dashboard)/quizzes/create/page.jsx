import { Suspense } from "react";
import CreateQuiz from "../../../../views/Quizzes/CreateQuiz.jsx";

export default function CreateQuizPage() {
  return (
    <Suspense fallback={null}>
      <CreateQuiz />
    </Suspense>
  );
}
