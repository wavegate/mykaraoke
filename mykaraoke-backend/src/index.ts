import express, { Request, Response } from "express";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
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

app.get("/", async (req: Request, res: Response) => {
  const results = await client.query("SELECT * FROM users;");
  res.json(results.rows);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
