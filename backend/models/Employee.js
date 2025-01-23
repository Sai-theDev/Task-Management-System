const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Engineer', 'Worker'], required: true },
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Employee', employeeSchema);
