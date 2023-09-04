import express, { Request, Response } from "express";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
import { SALT } from "./constants.js";
import bcrypt from "bcrypt";
dotenv.config();

const client = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const results = await client.query("SELECT * FROM users;");
  res.json(results.rows);
});

app.post("/login", async (req: Request, res: Response) => {
  const requestBody = req.body;
  const results = await client.query(
    "SELECT * from users WHERE username = $1",
    [requestBody.username]
  );
  return res.json(results.rows);
});

app.post("/register", async (req: Request, res: Response) => {
  const requestBody = req.body;
  const results = await client.query(
    "SELECT * from users WHERE username = $1",
    [requestBody.username]
  );
  if (results.rows.length > 0) {
    return res.status(409).json({ message: "Username is already registered." });
  }
  const salt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(requestBody.password, salt);
  const newUser = await client.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
    [requestBody.username, requestBody.email, hashedPassword]
  );
  return res.json(newUser.rows);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
