const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../server/.env') });

const StudentClass = require('../../server/models/StudentClass');
const Event = require('../../server/models/Event');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const classes = await StudentClass.find({});
  console.log('StudentClass records:', classes.length);
  classes.forEach(c => console.log(`- Student: ${c.studentId}, Teacher: ${c.teacherId}, Class: ${c.className}`));

  const events = await Event.find({});
  console.log('Event records:', events.length);
  events.forEach(e => console.log(`- Event: ${e.title}, Classes: ${e.assignedClasses}`));

  await mongoose.disconnect();
}

check();
