const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");

const calculateScore = (quiz, responses = []) => {
  const responseMap = new Map(
    responses.map((response) => [response.questionId, response.choiceId]),
  );

  let correctAnswers = 0;
  for (const question of quiz.questions) {
    if (responseMap.get(question.id) === question.correctChoiceId) {
      correctAnswers += 1;
    }
  }

  return quiz.questions.length
    ? Math.round((correctAnswers / quiz.questions.length) * 100)
    : 0;
};

exports.createAttempt = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();

    if (!quiz || quiz.visibility !== "student" || quiz.status !== "published") {
      return res.status(404).json({ message: "Quiz not available" });
    }

    const attempt = await QuizAttempt.create({
      quizId: quiz._id,
      studentId: req.user.id,
      studentName: req.user.fullName || req.user.username,
      studentEmail: req.user.email || "",
      status: "in_progress",
      startedAt: new Date(),
      responses: [],
      answersCount: 0,
      score: 0,
      timeSpentSeconds: 0,
    });

    res.status(201).json({ attempt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.submitAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findOne({
      _id: req.params.attemptId,
      studentId: req.user.id,
    });

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    const quiz = await Quiz.findById(attempt.quizId).lean();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const responses = Array.isArray(req.body.responses) ? req.body.responses : [];
    const submittedAt = new Date();
    const timeSpentSeconds = Math.max(
      0,
      Math.round((submittedAt.getTime() - new Date(attempt.startedAt).getTime()) / 1000),
    );

    attempt.responses = responses;
    attempt.answersCount = responses.length;
    attempt.score = calculateScore(quiz, responses);
    attempt.timeSpentSeconds = timeSpentSeconds;
    attempt.status = "completed";
    attempt.completedAt = submittedAt;

    await attempt.save();

    res.json({ attempt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
