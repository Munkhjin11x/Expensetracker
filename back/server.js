import express from "express";
import dotenv from "dotenv";
import bp from "body-parser";
import { pool } from "./db.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(bp.json());
app.listen(PORT, (req, res) => {
  console.log(`ON, ${PORT}`);
});
app.get("/user", async (req, res) => {
  try {
    const queryText = `SELECLT * FROM users`;
    const response = await pool.query(queryText);
    res.send(response.rows);
  } catch (error) {
    console.error(error);
  }
});
app.get("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const queryText = `SELECT * FROM users WHERE name='${name} AND email='${email}`;
    const response = await pool.query(queryText);
    res.send(response.rows);
  } catch (error) {
    console.error(error);
  }
});
app.post("/createTable", async (_, res) => {
  try {
    const tableQueryText = `
        CREATE TABLE IF NOT EXIST users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
        )`;
  } catch (error) {
    console.log(error);
  }
});
app.post("/user", async (req, response) => {
  const { name, email } = req.body;
  console.log(name, email, "req.body");
  try {
    const queryText =
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const res = await pool.query(queryText, [name, email]);
    response.send(res.rows[0]);
  } catch (error) {
    console.error(error);
    response.send("error query");
  }
});
