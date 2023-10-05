import express from "express";
import {
  getJobListings,
  getJobListingsByState,
} from "../controllers/jobListingController.js";

const router = express.Router();

router.get("/jobListings", getJobListings);
router.get("/jobListingsByState", getJobListingsByState);

const jobListingRouter = router;

export default jobListingRouter;
