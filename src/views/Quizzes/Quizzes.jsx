"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchQuizDetail } from "../../lib/quiz-client.js";
import QuizDetail from "./QuizDetail.jsx";
import QuizLibrary from "./QuizLibrary.jsx";

export default function Quizzes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuizId = searchParams.get("quizId");
  const [selectedQuizId, setSelectedQuizId] = useState(initialQuizId);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!selectedQuizId) {
      return;
    }

    const loadDetail = async () => {
      try {
        const data = await fetchQuizDetail(selectedQuizId);
        setDetail(data);
      } catch {
        setDetail(null);
      }
    };

    loadDetail();
  }, [selectedQuizId]);

  const handleSelectQuiz = (quizId) => {
    if (!quizId) {
      setDetail(null);
    }

    setSelectedQuizId(quizId);

    if (quizId) {
      router.replace(`/quizzes?quizId=${quizId}`);
      return;
    }

    router.replace("/quizzes");
  };

  return (
    <>
      <QuizDetail
        detail={detail}
        onEdit={() => {
          if (selectedQuizId) {
            router.push(`/quizzes/create?quizId=${selectedQuizId}`);
          }
        }}
      />
      <QuizLibrary selectedQuizId={selectedQuizId} onSelectQuiz={handleSelectQuiz} />
    </>
  );
}
