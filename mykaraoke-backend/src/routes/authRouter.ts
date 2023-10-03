import express from "express";
import { login, register, user } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user", verifyToken, user);

const authRouter = router;

export default authRouter;
