const mongoose = require('mongoose');

const workDetailSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  hours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  statusBefore: String,
  statusAfter: String
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  deadline: Date,
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  workDetails: [workDetailSchema],
  assignedTo: String
});

module.exports = mongoose.model('Project', projectSchema);