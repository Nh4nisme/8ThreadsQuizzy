import { Suspense } from "react";
import Quizzes from "../../../views/Quizzes/Quizzes.jsx";

export default function QuizzesPage() {
  return (
    <Suspense fallback={null}>
      <Quizzes />
    </Suspense>
  );
}
