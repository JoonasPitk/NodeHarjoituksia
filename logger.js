// Function for writing log entries when hourly price rows are added or skipped to the database.

const fs = require("fs/promises");

async function logger(data) {
  const timestamp = new Date();
  let entry = timestamp.toISOString() + ": " + data + "\n"; // ie. 2023-10-03T12:21:40.495Z: Price data fetched.
  
  try {
    await fs.appendFile("./operations.log", entry);
  } catch (error) {
      console.log(error + " @ " + timestamp + "\n");
  }
}

module.exports = { logger }
