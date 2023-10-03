import express from "express";
import { getKeywords } from "../controllers/keywordController.js";

const router = express.Router();

router.get("/keywords", getKeywords);

const keywordRouter = router;

export default keywordRouter;
