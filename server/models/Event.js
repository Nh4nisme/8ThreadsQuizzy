const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    quizId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Quiz", 
      required: true 
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    allowRetakes: { type: Boolean, default: false },
    status: {
      type: String,
      default: "upcoming",
      enum: ["upcoming", "active", "completed"],
      index: true,
    },
    assignedClasses: [{ type: String, trim: true }],
    createdBy: {
      id: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
    },
    participants: [
      {
        studentId: { type: String, required: true },
        studentName: { type: String, required: true },
        score: { type: Number },
        completedAt: { type: Date },
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
