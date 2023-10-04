import express from "express";
import { getJobListings } from "../controllers/jobListingController.js";

const router = express.Router();

router.get("/jobListings", getJobListings);

const jobListingRouter = router;

export default jobListingRouter;
