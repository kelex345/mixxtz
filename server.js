const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory database (for production, use a real database)
let entries = [];

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API Routes
// Create a new entry
app.post('/api/entries', (req, res) => {
  try {
    const { name, yasPin } = req.body;

    if (!name || !yasPin) {
      return res.status(400).json({ error: 'Name and YAS PIN are required' });
    }

    if (yasPin.length !== 4 || !/^\d+$/.test(yasPin)) {
      return res.status(400).json({ error: 'YAS PIN must be exactly 4 digits' });
    }

    const entry = {
      id: uuidv4(),
      name,
      yasPin,
      createdAt: new Date().toISOString(),
      fee: 800000 // Default fee in TSh
    };

    entries.push(entry);

    res.status(201).json({
      success: true,
      message: 'Entry registered successfully',
      data: entry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all entries
app.get('/api/entries', (req, res) => {
  try {
    res.json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get entry by ID
app.get('/api/entries/:id', (req, res) => {
  try {
    const entry = entries.find(e => e.id === req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update entry
app.put('/api/entries/:id', (req, res) => {
  try {
    const { name, yasPin } = req.body;
    const entry = entries.find(e => e.id === req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (name) entry.name = name;
    if (yasPin) {
      if (yasPin.length !== 4 || !/^\d+$/.test(yasPin)) {
        return res.status(400).json({ error: 'YAS PIN must be exactly 4 digits' });
      }
      entry.yasPin = yasPin;
    }

    entry.updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Entry updated successfully',
      data: entry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete entry
app.delete('/api/entries/:id', (req, res) => {
  try {
    const index = entries.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    const deletedEntry = entries.splice(index, 1);
    res.json({
      success: true,
      message: 'Entry deleted successfully',
      data: deletedEntry[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      totalEntries: entries.length,
      totalFees: entries.length * 800000,
      currency: 'TSh'
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Mixx TZ Server running on http://localhost:${PORT}`);
  console.log(`📝 Registration form: http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
});
