import { Suspense } from "react";
import { requireServerRole } from "../../lib/auth-server.js";
import StudentQuizPortal from "../../views/Quizzes/StudentQuizPortal.jsx";

export default async function QuizzForStudentPage() {
  await requireServerRole("student");
  return (
    <Suspense fallback={null}>
      <StudentQuizPortal />
    </Suspense>
  );
}
