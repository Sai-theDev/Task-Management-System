const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  estimatedHours: Number,
  actualHours: Number,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  parentTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
});

module.exports = mongoose.model('Task', taskSchema);