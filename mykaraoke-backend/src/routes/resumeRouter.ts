import express from "express";
import path from "path";
import {
  convertResume,
  getResume,
  updateResume,
} from "../controllers/resumeController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, filename, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/resume", getResume);
router.post("/resume", updateResume);
router.post("/convert", upload.single("blob"), convertResume);

const resumeRouter = router;

export default resumeRouter;
