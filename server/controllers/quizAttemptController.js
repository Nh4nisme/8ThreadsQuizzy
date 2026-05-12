const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Event = require("../models/Event");

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

    const { eventId } = req.body;

    // If part of an event, check retake permissions
    if (eventId) {
      const event = await Event.findById(eventId).lean();
      if (!event) return res.status(404).json({ message: "Event not found" });

      const existingAttempt = await QuizAttempt.findOne({
        eventId,
        studentId: req.user.id,
        status: "completed"
      });

      if (existingAttempt && !event.allowRetakes) {
        return res.status(400).json({ 
          success: false, 
          message: "Retakes are not allowed for this event." 
        });
      }
    }

    const attempt = await QuizAttempt.create({
      quizId: quiz._id,
      studentId: req.user.id,
      eventId: eventId || null,
      studentName: req.user.fullName || req.user.username,
      studentEmail: req.user.email || "",
      status: "in_progress",
      startedAt: new Date(),
      responses: [],
      answersCount: 0,
      score: 0,
      timeSpentSeconds: 0,
    });

    // If part of an event, ensure participant exists (don't overwrite if already there)
    if (eventId) {
      const event = await Event.findById(eventId);
      const participantIndex = event.participants.findIndex(p => String(p.studentId) === String(req.user.id));
      
      if (participantIndex === -1) {
        event.participants.push({
          studentId: req.user.id,
          studentName: req.user.fullName || req.user.username,
          joinedAt: new Date(),
        });
        await event.save();
      }
    }

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

    // If part of an event, update participant score only if it's higher
    if (attempt.eventId) {
      const event = await Event.findById(attempt.eventId);
      if (event) {
        const participantIndex = event.participants.findIndex(p => String(p.studentId) === String(req.user.id));
        if (participantIndex !== -1) {
          const currentScore = event.participants[participantIndex].score || 0;
          if (attempt.score > currentScore) {
            event.participants[participantIndex].score = attempt.score;
            event.participants[participantIndex].completedAt = submittedAt;
          }
          // Mark as completed even if score isn't higher if it was previously null
          if (!event.participants[participantIndex].completedAt) {
            event.participants[participantIndex].completedAt = submittedAt;
          }
          await event.save();
        }
      }
    }

    res.json({ attempt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
