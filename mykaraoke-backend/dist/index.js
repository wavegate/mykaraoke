var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield client.query("SELECT * FROM users;");
    res.json(results.rows);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
