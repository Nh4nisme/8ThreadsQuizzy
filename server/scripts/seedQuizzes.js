require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const studentQuizMocks = require("../data/studentQuizMocks");
const quizAttempts = require("../data/quizAttempts");

async function seedQuizzes() {
  await connectDB();

  try {
    for (const quiz of studentQuizMocks) {
      await Quiz.findOneAndUpdate(
        { slug: quiz.slug },
        { $set: quiz },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    for (const quizSeed of quizAttempts) {
      const quiz = await Quiz.findOne({ slug: quizSeed.quizSlug });

      if (!quiz) {
        continue;
      }

      await QuizAttempt.deleteMany({ quizId: quiz._id });

      await QuizAttempt.insertMany(
        quizSeed.attempts.map((attempt) => ({
          ...attempt,
          quizId: quiz._id,
        })),
      );
    }

    console.log(`Seeded ${studentQuizMocks.length} quizzes.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedQuizzes().catch((error) => {
  console.error("Failed to seed quizzes:", error.message);
  process.exit(1);
});
