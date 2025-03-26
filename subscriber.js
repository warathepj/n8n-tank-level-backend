const mqtt = require('mqtt');

// Keep track of the last received message
let lastMessage = null;

// Create MQTT client
const client = mqtt.connect('mqtt://test.mosquitto.org');

// Handle connection event
client.on('connect', () => {
  console.log('Subscriber connected to MQTT broker');
  
  // Subscribe to the tank status topic
  client.subscribe('corgidev/tank/status', (err) => {
    if (err) {
      console.error('Subscribe error:', err);
    } else {
      console.log('Subscribed to corgidev/tank/status');
    }
  });
});

// Handle incoming messages
client.on('message', (topic, payload) => {
  try {
    const message = JSON.parse(payload.toString());
    console.log('Received message:');
    console.log('  Topic:', topic);
    console.log('  Device:', message.device);
    console.log('  Level:', message.level);
    console.log('  Timestamp:', message.timestamp);
    console.log('  Message:', message.message);
    
    // Store the last received message
    lastMessage = message;
    
    // Here you could add additional processing logic
    // For example, updating a database, triggering alerts, etc.
    
  } catch (err) {
    console.error('Error parsing message:', err);
    console.log('Raw payload:', payload.toString());
  }
});

// Handle errors
client.on('error', (err) => {
  console.error('MQTT error:', err);
});

// Function to get the last received message (for testing)
const getLastMessage = () => {
  return lastMessage;
};

// Function to close the connection
const disconnect = () => {
  return new Promise((resolve) => {
    client.end(true, resolve);
  });
};

module.exports = {
  getLastMessage,
  disconnect
};