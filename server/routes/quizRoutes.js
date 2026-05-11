const express = require("express");
const {
  createQuiz,
  deleteQuiz,
  duplicateQuiz,
  getQuizDetail,
  getStudentQuizBySlug,
  getStudentQuizzes,
  getTeacherQuizzes,
  updateQuiz,
} = require("../controllers/quizController");
const {
  createAttempt,
  submitAttempt,
} = require("../controllers/quizAttemptController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/student", getStudentQuizzes);
router.get("/student/slug/:slug", getStudentQuizBySlug);
router.get("/", authMiddleware, requireRole("teacher"), getTeacherQuizzes);
router.post("/", authMiddleware, requireRole("teacher"), createQuiz);
router.post("/:id/attempts", authMiddleware, requireRole("student"), createAttempt);
router.patch(
  "/:id/attempts/:attemptId/submit",
  authMiddleware,
  requireRole("student"),
  submitAttempt,
);
router.get("/:id", authMiddleware, requireRole("teacher"), getQuizDetail);
router.put("/:id", authMiddleware, requireRole("teacher"), updateQuiz);
router.post("/:id/duplicate", authMiddleware, requireRole("teacher"), duplicateQuiz);
router.delete("/:id", authMiddleware, requireRole("teacher"), deleteQuiz);

module.exports = router;
