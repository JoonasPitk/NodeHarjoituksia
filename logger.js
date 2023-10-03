const fs = require("fs/promises");

async function logger() {
  try {
    const timestamp = new Date();
    const isoTimestamp = timestamp.toISOString();
    let operation = "Data fetch operation";
    let status = "processed successfully";
    let entry = operation + " " + status + " @ " + isoTimestamp + "\n";
    console.log(entry);

    await fs.appendFile("./operations.log", entry);
  } catch (error) {
      let entry = error + " @ " + isoTimestamp + "\n";
      console.log(entry);
  }
}
logger();

// TODO: Create a function to do this; create a log message and timestamp.
