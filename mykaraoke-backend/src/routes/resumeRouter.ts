import express from "express";
import { getResume, updateResume } from "../controllers/resumeController.js";

const router = express.Router();

router.get("/resume", getResume);
router.post("/resume", updateResume);

const resumeRouter = router;

export default resumeRouter;
