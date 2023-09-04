import express from "express";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
import { SALT } from "./constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token part
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token verification failed" });
            }
            req.user = decoded;
            next();
        });
    }
    else {
        return res.status(401).json({ message: "No token provided" });
    }
};
app.get("/", async (req, res) => {
    const results = await client.query("SELECT * FROM users;");
    res.json(results.rows);
});
app.post("/login", async (req, res) => {
    const requestBody = req.body;
    const results = await client.query("SELECT * from users WHERE username = $1", [requestBody.username]);
    return res.json(results.rows);
});
app.get("/user", verifyToken, async (req, res) => {
    return res.json(req.user);
});
app.post("/register", async (req, res) => {
    const requestBody = req.body;
    const results = await client.query("SELECT * from users WHERE username = $1", [requestBody.username]);
    if (results.rows.length > 0) {
        return res.status(409).json({ message: "Username is already registered." });
    }
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(requestBody.password, salt);
    const newUser = (await client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email;", [requestBody.username, requestBody.email, hashedPassword])).rows[0];
    const token = jwt.sign(newUser, process.env.TOKEN_SECRET);
    return res.json(token);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
