const mongoose = require("mongoose");

const QuizChoiceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const QuizQuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 1 },
    prompt: { type: String, required: true, trim: true },
    points: { type: Number, default: 100, min: 0 },
    type: {
      type: String,
      default: "multiple_choice",
      enum: ["multiple_choice"],
    },
    explanation: { type: String, default: "", trim: true },
    choices: {
      type: [QuizChoiceSchema],
      validate: {
        validator: (choices) => Array.isArray(choices) && choices.length >= 2,
        message: "Each question must have at least two choices.",
      },
    },
    correctChoiceId: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, required: true, trim: true, index: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
      index: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    estimatedPlayers: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published", "archived"],
      index: true,
    },
    visibility: {
      type: String,
      default: "student",
      enum: ["student", "teacher", "private"],
      index: true,
    },
    tags: { type: [String], default: [] },
    settings: {
      passingScore: { type: Number, default: 70, min: 0, max: 100 },
      randomizeQuestions: { type: Boolean, default: false },
      immediateResults: { type: Boolean, default: false },
    },
    createdBy: {
      id: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
    },
    questions: {
      type: [QuizQuestionSchema],
      validate: {
        validator: (questions) => Array.isArray(questions) && questions.length > 0,
        message: "A quiz must contain at least one question.",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
