const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Create Employee
router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('assignedTasks');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('assignedTasks');
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
