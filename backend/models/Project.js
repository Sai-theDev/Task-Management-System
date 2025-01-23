const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], required: true },
  budget: { type: Number, required: true },
});

module.exports = mongoose.model('Project', projectSchema);