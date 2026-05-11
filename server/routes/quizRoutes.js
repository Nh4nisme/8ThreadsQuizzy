const express = require("express");
const {
  createQuiz,
  deleteQuiz,
  duplicateQuiz,
  getQuizDetail,
  getStudentQuizzes,
  getTeacherQuizzes,
  updateQuiz,
} = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/student", getStudentQuizzes);
router.get("/", authMiddleware, requireRole("teacher"), getTeacherQuizzes);
router.post("/", authMiddleware, requireRole("teacher"), createQuiz);
router.get("/:id", authMiddleware, requireRole("teacher"), getQuizDetail);
router.put("/:id", authMiddleware, requireRole("teacher"), updateQuiz);
router.post("/:id/duplicate", authMiddleware, requireRole("teacher"), duplicateQuiz);
router.delete("/:id", authMiddleware, requireRole("teacher"), deleteQuiz);

module.exports = router;
