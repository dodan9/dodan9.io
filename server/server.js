const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "kimdaeun1245",
  database: "data",
});

app.get("/", (req, res) => {
  const sqlQuery = "INSERT INTO test_table (test_column) VALUES (1)";
  db.query(sqlQuery, (err, result) => {
    res.send("success!");
    if (err) console.log(err);
    if (result) console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
