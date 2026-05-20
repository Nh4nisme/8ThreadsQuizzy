const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const StudentClass = require("../models/StudentClass");
const User = require("../models/User");

exports.getTeacherStudents = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // 1. Get all quizzes created by this teacher
    const quizzes = await Quiz.find({ "createdBy.id": String(teacherId) }).select("_id");
    const quizIds = quizzes.map((q) => q._id);

    // 2. Get all attempts for these quizzes
    const attempts = await QuizAttempt.find({ quizId: { $in: quizIds } }).lean();

    // 3. Get all class assignments for this teacher
    const classAssignments = await StudentClass.find({ teacherId }).lean();
    const classMap = new Map(
      classAssignments.map((ca) => [String(ca.studentId), ca.className]),
    );

    // Get info for students who have class assignments from this teacher
    const assignedStudentIds = classAssignments.map((ca) => ca.studentId);
    const assignedUsers = await User.find({ _id: { $in: assignedStudentIds } }).lean();

    // 4. Group attempts by student
    const studentStats = {};

    // Pre-populate with assigned students so they show up even with 0 quizzes taken
    assignedUsers.forEach((user) => {
      const studentId = String(user._id);
      studentStats[studentId] = {
        id: studentId,
        name: user.fullName || user.username,
        email: user.email,
        quizzesTaken: 0,
        totalScore: 0,
        lastActivity: null,
        class: classMap.get(studentId) || "Unassigned",
      };
    });

    attempts.forEach((attempt) => {
      if (!attempt.studentId) return; // Skip guest attempts if they don't have a user ID

      const studentId = String(attempt.studentId);
      if (!studentStats[studentId]) {
        studentStats[studentId] = {
          id: studentId,
          name: attempt.studentName,
          email: attempt.studentEmail,
          quizzesTaken: 0,
          totalScore: 0,
          lastActivity: attempt.completedAt || attempt.startedAt,
          class: classMap.get(studentId) || "Unassigned",
        };
      }

      studentStats[studentId].quizzesTaken += 1;
      studentStats[studentId].totalScore += attempt.score || 0;
      
      const activityDate = attempt.completedAt || attempt.startedAt;
      if (!studentStats[studentId].lastActivity || new Date(activityDate) > new Date(studentStats[studentId].lastActivity)) {
        studentStats[studentId].lastActivity = activityDate;
      }
    });

    const students = Object.values(studentStats).map((s) => ({
      ...s,
      averageScore: s.quizzesTaken > 0 ? Math.round(s.totalScore / s.quizzesTaken) : 0,
    }));

    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.searchStudentByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const student = await User.findOne({
      email: { $regex: new RegExp("^" + email.trim() + "$", "i") },
      role: "student",
    }).select("_id fullName username email");

    if (!student) {
      return res.status(404).json({ message: "Student not found with this email" });
    }

    res.json({
      student: {
        id: student._id,
        name: student.fullName || student.username,
        email: student.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.assignStudentToClass = async (req, res) => {
  try {
    const { studentIds, className } = req.body;
    console.log("Server received assign request:", { studentIds, className });
    const teacherId = req.user.id;

    if (!studentIds || !Array.isArray(studentIds) || !className) {
      return res.status(400).json({ message: "[DEBUG] Both studentIds (array) and className are required" });
    }

    const assignments = await Promise.all(
      studentIds.map((studentId) =>
        StudentClass.findOneAndUpdate(
          { studentId, teacherId },
          { className },
          { upsert: true, new: true },
        ),
      ),
    );

    res.json({ message: "Students assigned to class successfully", assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
