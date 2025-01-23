const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// Create Alert
router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Alert
router.put('/:id', async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Alert
router.delete('/:id', async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
