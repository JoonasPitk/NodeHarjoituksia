// LIBRARIES AND MODULES

// The pg-pool library for PostgreSQL Server.
const Pool = require("pg").Pool;

// The node-cron library to schedule API call to porssisahko.net.
const cron = require("node-cron");

// Homemade library to access price API from porssisahko.net.
const getPrices = require("./getNewPrices");

// Logger to write operation messages to a log file.
const { logger } = require("./logger")


// APP SETTINGS

// Create a new pool for Postgre connections.
const pool = new Pool({
  user: "postgres", // In production, always create a new user for the app.
  password: "Q2werty",
  host: "localhost", // localhost or 127.0.0.1 if in the same computer.
  database: "smarthome",
  port: 5432,
});


// GET, PROCESS AND SAVE DATA

// Use a date variable to keep track of successful data retrievals.
let lastFetchedDate = "1.1.2023"; // Initial value, use a settings file in production.

// Try to run an operation in 10-second intervals.
cron.schedule("*/10 * * * * *", () => {
  try {
    let timestamp = new Date(); // Get the current timestamp.
    let dateStr = timestamp.toLocaleDateString(); // Take the date part of the timestamp.

    // If the date of last successful fetch is not the current day, fetch data.
    if (lastFetchedDate != dateStr) {
      logger("Started fetching price data...");
      getPrices.fetchLatestPriceData().then((json) => {

        // Loop through prices data, and pick startDate and price elements.
        json.prices.forEach(async (element) => {
          let values = [element.startDate, element.price];

          // Build an SQL clauset to insert values into table.
          const sqlClause = "INSERT INTO public.hourly_price VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *";

          // Function for running SQL operations asyncronously.
          const runQuery = async () => {
            let resultset = await pool.query(sqlClause, values);
            return resultset;
          }

          // Call query function and echo results to log.
          runQuery().then((resultset) => {

            /* Have clearer messages for added or skipped rows.
            Otherwise a new row would return "[object Object]"
            and a skipped row would return "undefined" */
            if (resultset.rows[0] != undefined) {
              logger("Added a row.")
            } else {
              logger("Skipped a row.")
            }
          });  
        });
      });
      lastFetchedDate = dateStr; // Set fetch date to current date.
      logger("Price data fetched on " + lastFetchedDate);
    } else {
      logger("Data has been successfully retrieved earlier today!");
    }
  } catch (error) {
    logger("An error occurred ("+ error.toString() +"), trying again in 10 seconds...");
  }
});
