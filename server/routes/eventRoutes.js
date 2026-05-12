const express = require("express");
const {
  getTeacherEvents,
  getStudentEvents,
  createEvent,
  updateEventStatus,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/student", authMiddleware, getStudentEvents);
router.get("/", authMiddleware, requireRole("teacher"), getTeacherEvents);
router.post("/", authMiddleware, requireRole("teacher"), createEvent);
router.put("/:id", authMiddleware, requireRole("teacher"), updateEvent);
router.patch("/:id/status", authMiddleware, requireRole("teacher"), updateEventStatus);
router.delete("/:id", authMiddleware, requireRole("teacher"), deleteEvent);

module.exports = router;
