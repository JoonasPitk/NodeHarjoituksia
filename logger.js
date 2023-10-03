const fs = require("fs/promises");

async function logger(data) {
  const timestamp = new Date();
  let entry = data + " @ " + timestamp.toISOString() + "\n";
  
  try {
    await fs.appendFile("./operations.log", entry);
  } catch (error) {
      console.log(error + " @ " + timestamp + "\n");
  }
}

module.exports = { logger }
