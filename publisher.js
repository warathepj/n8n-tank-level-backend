const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Keep the MQTT client connection
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  console.log('Publisher connected to MQTT broker');
  // Subscribe to the topic after connection
  client.subscribe('corgidev/tank/status', (err) => {
    if (err) {
      console.error('Subscribe error:', err);
    } else {
      console.log('Subscribed to corgidev/tank/status');
    }
  });
});

// Add message handler
client.on('message', (topic, payload) => {
  try {
    const message = JSON.parse(payload.toString());
    console.log('Received message:');
    console.log('  Topic:', topic);
    console.log('  Device:', message.device);
    console.log('  Level:', message.level);
    console.log('  Timestamp:', message.timestamp);
    console.log('  Message:', message.message);
  } catch (err) {
    console.error('Error parsing message:', err);
    console.log('Raw payload:', payload.toString());
  }
});

// Export the publish function
const publishTankStatus = async ({ device, timestamp, level, message }) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      device,
      timestamp,
      level,
      message
    });
    
    client.publish('corgidev/tank/status', payload, (err) => {
      if (err) {
        console.error('Publish error:', err);
        reject(err);
      } else {
        console.log('Tank status published:', payload);
        resolve();
      }
    });
  });
};

// Error handling for MQTT client
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { publishTankStatus };


// Add a new endpoint to handle POST requests from the frontend
app.post('/publish', async (req, res) => {
  try {
    const { device, timestamp, level, message } = req.body;
    
    // Validate required fields
    if (!device || !timestamp || !level || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Publish to MQTT
    await publishTankStatus({ device, timestamp, level, message });
    
    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error publishing tank status:', error);
    res.status(500).json({ error: 'Failed to publish tank status' });
  }
});
