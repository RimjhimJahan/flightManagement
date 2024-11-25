const express = require("express");
const mysql = require("mysql");
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static("public")); // For serving static files

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nov18",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// API endpoint to get cities
app.get("/cities", (req, res) => {
  db.query("SELECT * FROM City", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
