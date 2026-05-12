const Event = require("../models/Event");
const Quiz = require("../models/Quiz");
const StudentClass = require("../models/StudentClass");

const getTeacherEvents = async (req, res) => {
  try {
    const events = await Event.find({ "createdBy.id": req.user.id })
      .populate("quizId", "title questions")
      .sort({ startTime: 1 });
    
    // Update statuses based on current time
    const now = new Date();
    const updatedEvents = events.map(event => {
      let status = event.status;
      if (status !== "active" || now > event.endTime) {
         if (now < event.startTime) status = "upcoming";
         else if (now >= event.startTime && now <= event.endTime) status = "active";
         else if (now > event.endTime) status = "completed";
      }
      return { ...event.toObject(), currentStatus: status };
    });

    res.json({ success: true, events: updatedEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentEvents = async (req, res) => {
  try {
    const studentId = req.user.id;
    const now = new Date();
    
    // Find all classes this student is assigned to
    const studentClasses = await StudentClass.find({ studentId }).lean();
    const classNames = studentClasses.map(sc => sc.className);

    // Find events assigned to any of the student's classes
    const events = await Event.find({
      assignedClasses: { $in: classNames },
    })
      .populate("quizId", "title description durationMinutes questions")
      .sort({ startTime: 1 });

    const updatedEvents = events.map(event => {
      let status = event.status;
      if (status !== "active" || now > event.endTime) {
         if (now < event.startTime) status = "upcoming";
         else if (now >= event.startTime && now <= event.endTime) status = "active";
         else if (now > event.endTime) status = "completed";
      }
      return { ...event.toObject(), currentStatus: status };
    });

    res.json({ success: true, events: updatedEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, quizId, startTime, endTime, allowRetakes, assignedClasses } = req.body;
    
    // Validation: Start time must be in the future (allow 1 minute buffer for lag)
    const now = new Date();
    const startTimeDate = new Date(startTime);
    if (startTimeDate < new Date(now.getTime() - 60000)) {
      return res.status(400).json({ success: false, message: "Start time cannot be in the past" });
    }

    if (new Date(endTime) <= startTimeDate) {
      return res.status(400).json({ success: false, message: "End time must be after start time" });
    }

    const newEvent = new Event({
      title,
      description,
      quizId,
      startTime,
      endTime,
      allowRetakes,
      assignedClasses: assignedClasses || [],
      createdBy: {
        id: req.user.id,
        name: req.user.fullName || req.user.username,
      },
    });

    await newEvent.save();
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, "createdBy.id": req.user.id },
      { status },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, "createdBy.id": req.user.id });
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, quizId, startTime, endTime, allowRetakes, assignedClasses } = req.body;
    
    // Check if event exists and belongs to user
    const event = await Event.findOne({ _id: req.params.id, "createdBy.id": req.user.id });
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    // Only allow editing if not completed
    if (event.status === "completed") {
      return res.status(400).json({ success: false, message: "Cannot edit completed events" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.quizId = quizId || event.quizId;
    event.startTime = startTime || event.startTime;
    event.endTime = endTime || event.endTime;
    event.allowRetakes = allowRetakes !== undefined ? allowRetakes : event.allowRetakes;
    event.assignedClasses = assignedClasses || event.assignedClasses;

    await event.save();
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTeacherEvents,
  getStudentEvents,
  createEvent,
  updateEventStatus,
  updateEvent,
  deleteEvent,
};
