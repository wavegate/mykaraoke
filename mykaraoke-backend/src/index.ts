import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SALT } from "./constants.js";
import bcrypt from "bcrypt";
import axios from "axios";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import authRouter from "./routes/authRouter.js";
import keywordRouter from "./routes/keywordRouter.js";
import jobListingRouter from "./routes/jobListingRouter.js";
import resumeRouter from "./routes/resumeRouter.js";

dotenv.config();

const app = express();
const port = 3000;

if (process.env.ENVIRONMENT === "development") {
  app.use(cors());
}

app.use(express.json());

// const upload = multer();

// const randomFileName = (bytes = 32) => crypto.randomBytes(16).toString("hex");

app.use(authRouter);
app.use(keywordRouter);
app.use(jobListingRouter);
app.use(resumeRouter);

// app.post("/job", verifyToken, async (req: Request, res: Response) => {
//   const requestBody = req.body;
//   const newJob = (
//     await client.query(
//       "INSERT INTO jobs (title, link, description) VALUES ($1, $2, $3) RETURNING *;",
//       [requestBody.title, requestBody.link, requestBody.description]
//     )
//   ).rows[0];
//   return res.json(newJob);
// });

// app.get("/jobs", verifyToken, async (req: Request, res: Response) => {
//   const jobs = (await client.query("SELECT * from indeed_jobs;")).rows;
//   return res.json(jobs);
// });

// app.post("/questions", verifyToken, async (req: Request, res: Response) => {
//   const requestBody = req.body;
//   const postData = {
//     text: requestBody.question,
//     voice: "larry",
//     quality: "medium",
//     output_format: "mp3",
//     speed: 1,
//     sample_rate: 24000,
//   };
//   const link = await axios
//     .post("https://play.ht/api/v2/tts", postData, {
//       headers: {
//         accept: "application/json",
//         AUTHORIZATION: process.env.PLAYHT_KEY,
//         "X-USER-ID": process.env.PLAYHT_ID,
//         "content-type": "application/json",
//       },
//     })
//     .then((res) => {
//       return res.data?._links?.[2]?.href;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   const fileName = randomFileName();

//   axios
//     .get(link, {
//       headers: {
//         accept: "application/json",
//         AUTHORIZATION: process.env.PLAYHT_KEY,
//         "X-USER-ID": process.env.PLAYHT_ID,
//       },
//       responseType: "stream",
//     })
//     .then((res) => {
//       const upload = new Upload({
//         client: s3,
//         params: {
//           Bucket: bucketName,
//           Key: fileName,
//           Body: res.data,
//           ContentType: "text/plain",
//         },
//       });

//       upload.done();
//     });

//   const newQuestion = (
//     await client.query(
//       "INSERT INTO questions (question, answer, audio_url) VALUES ($1, $2, $3) RETURNING *;",
//       [requestBody.question, requestBody.answer, fileName]
//     )
//   ).rows[0];
//   return res.json(newQuestion);
// });

// app.get("/questions", verifyToken, async (req: Request, res: Response) => {
//   const questions = (await client.query("SELECT * from questions;")).rows;
//   for (const question of questions) {
//     if (question.audio_url) {
//       const getObjectParams = {
//         Bucket: bucketName,
//         Key: question.audio_url,
//       };
//       const command = new GetObjectCommand(getObjectParams);
//       const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//       question.audio_url = url;
//     }
//   }
//   for (const question of questions) {
//     if (question.user_answer) {
//       const getObjectParams = {
//         Bucket: bucketName,
//         Key: question.user_answer,
//       };
//       const command = new GetObjectCommand(getObjectParams);
//       const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//       question.user_answer = url;
//     }
//   }
//   return res.json(questions);
// });

// app.post(
//   "/answer",
//   upload.single("file"),
//   verifyToken,
//   async (req: Request, res: Response) => {
//     const requestBody = req.body;
//     const requestFile = req.file;

//     if (!requestFile) {
//       return res.status(404).json({ message: "No file uploaded." });
//     }
//     const fileName = randomFileName();

//     const params = {
//       Bucket: bucketName,
//       Key: fileName,
//       Body: requestFile?.buffer,
//       ContentType: requestFile?.mimetype,
//     };

//     const command = new PutObjectCommand(params);
//     await s3.send(command);

//     fs.writeFileSync("test.webm", requestFile.buffer);

//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream("test.webm"),
//       model: "whisper-1",
//     });

//     const question = (
//       await client.query("SELECT * FROM questions WHERE id = ($1);", [
//         requestBody.id,
//       ])
//     ).rows[0];

//     const analysis = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: `You are an interviewer for a tech company. The user will give you an answer. The question the user is answering is ${question.question}. The answer for that question is ${question.answer}. Provide a short review of the user's answer to the provided question and provided answer as well as a score of the user's answer from 1 to 10.`,
//         },
//         { role: "user", content: transcription.text },
//       ],
//       model: "gpt-3.5-turbo",
//     });

//     const question_answer = await client.query(
//       "UPDATE questions SET user_answer = ($1), user_answer_transcription = ($2), analysis = ($3) WHERE id = ($4) RETURNING *;",
//       [
//         fileName,
//         transcription.text,
//         analysis.choices[0].message.content,
//         requestBody.id,
//       ]
//     );
//     return res.json(question_answer);
//   }
// );

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
