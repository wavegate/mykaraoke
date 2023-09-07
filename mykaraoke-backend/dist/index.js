var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import express from "express";
import cors from "cors";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
import { SALT } from "./constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
dotenv.config();
import { GetObjectCommand, S3Client, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});
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
const randomFileName = (bytes = 32) => crypto.randomBytes(16).toString("hex");
// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token part
    if (token) {
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!tokenData) {
            return res.status(403).json({ message: "Token verification failed" });
        }
        const results = await client.query("SELECT id, username, email from users WHERE id = $1", [tokenData.id]);
        if (results.rows.length > 0) {
            req.user = results.rows[0];
            return next();
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    else {
        return res.status(401).json({ message: "No token provided" });
    }
};
app.get("/", async (req, res) => {
    const results = await client.query("SELECT * FROM users;");
    res.json(results.rows);
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
    const newUser = (await client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email;", [requestBody.username, requestBody.email, hashedPassword])).rows[0];
    const token = jwt.sign(newUser, process.env.TOKEN_SECRET);
    return res.json(token);
});
app.post("/job", verifyToken, async (req, res) => {
    const requestBody = req.body;
    const newJob = (await client.query("INSERT INTO jobs (title, link, description) VALUES ($1, $2, $3) RETURNING *;", [requestBody.title, requestBody.link, requestBody.description])).rows[0];
    return res.json(newJob);
});
app.get("/jobs", verifyToken, async (req, res) => {
    const jobs = (await client.query("SELECT * from jobs;")).rows;
    return res.json(jobs);
});
app.post("/questions", verifyToken, async (req, res) => {
    const requestBody = req.body;
    const postData = {
        text: requestBody.question,
        voice: "denis",
        quality: "medium",
        output_format: "mp3",
        speed: 1,
        sample_rate: 24000,
    };
    const link = await axios
        .post("https://play.ht/api/v2/tts", postData, {
        headers: {
            accept: "application/json",
            AUTHORIZATION: process.env.PLAYHT_KEY,
            "X-USER-ID": process.env.PLAYHT_ID,
            "content-type": "application/json",
        },
    })
        .then((res) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a._links) === null || _b === void 0 ? void 0 : _b[2]) === null || _c === void 0 ? void 0 : _c.href;
    })
        .catch((err) => {
        console.log(err);
    });
    const fileName = randomFileName();
    axios
        .get(link, {
        headers: {
            accept: "application/json",
            AUTHORIZATION: process.env.PLAYHT_KEY,
            "X-USER-ID": process.env.PLAYHT_ID,
        },
        responseType: "stream",
    })
        .then((res) => {
        const upload = new Upload({
            client: s3,
            params: {
                Bucket: bucketName,
                Key: fileName,
                Body: res.data,
                ContentType: "text/plain",
            },
        });
        upload.done();
    });
    const newQuestion = (await client.query("INSERT INTO questions (question, answer, audio_url) VALUES ($1, $2, $3) RETURNING *;", [requestBody.question, requestBody.answer, fileName])).rows[0];
    return res.json(newQuestion);
});
app.get("/questions", verifyToken, async (req, res) => {
    const questions = (await client.query("SELECT * from questions;")).rows;
    for (const question of questions) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: question.audio_url,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        question.audio_url = url;
    }
    return res.json(questions);
});
app.post("/login", async (req, res) => {
    const requestBody = req.body;
    const results = await client.query("SELECT id, username, email, password from users WHERE username = $1", [requestBody.username]);
    if (results.rows.length > 0) {
        const valid = await bcrypt.compare(requestBody.password, results.rows[0].password);
        if (valid) {
            const _a = results.rows[0], { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET);
            return res.json(token);
        }
        else {
            return res.status(401).json({ message: "Incorrect password." });
        }
    }
    else {
        return res.status(404).json({ message: "User not found." });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
