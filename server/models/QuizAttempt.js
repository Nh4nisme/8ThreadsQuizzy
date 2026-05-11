const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    studentName: { type: String, required: true, trim: true },
    studentEmail: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "completed",
      index: true,
    },
    score: { type: Number, default: 0, min: 0, max: 100 },
    timeSpentSeconds: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: null },
    startedAt: { type: Date, default: Date.now },
    answersCount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.QuizAttempt || mongoose.model("QuizAttempt", QuizAttemptSchema);
