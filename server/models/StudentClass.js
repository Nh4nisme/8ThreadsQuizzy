const mongoose = require("mongoose");

const StudentClassSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    className: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// Ensure a student has only one class per teacher
StudentClassSchema.index({ studentId: 1, teacherId: 1 }, { unique: true });

module.exports =
  mongoose.models.StudentClass || mongoose.model("StudentClass", StudentClassSchema);
