import prisma from "../config/database.js";
import { Request, Response } from "express";

const getJobListings = async (req: Request, res: Response) => {
  try {
    const queryResult = await prisma.jobListing.findMany({
      orderBy: {
        // count: "desc",
      },
    });
    if (queryResult) {
      res.json(queryResult);
    } else {
      return res.status(404).json({ message: "Job listings not found." });
    }
  } catch (error) {
    console.error("Error querying Job listings:", error);
  }
};

export { getJobListings };
