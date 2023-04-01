const express = require("express");
const bodyParser = require("body-parser");
const i2c = require("i2c-bus");

const app = express();
const port = 3000;

const address = 8; // Address of the Arduino
const command = 0x01; // Command to read humidity value

const bus = i2c.openSync(1); // 1 indicates /dev/i2c-1

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route for getting humidity data
app.post("/humidity", (req, res) => {
  // Send command to Arduino and read response
  const buffer = Buffer.alloc(1);
  bus.readI2cBlockSync(address, command, 1, buffer);
  const humidity = buffer.readUInt8(0);

  console.log(`Humidity: ${humidity}%`);

  res.json({ humidity });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
