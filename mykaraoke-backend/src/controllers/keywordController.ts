import prisma from "../config/database.js";
import { Request, Response } from "express";

const getKeywords = async (req: Request, res: Response) => {
  try {
    const keywords = await prisma.keyword.findMany({
      orderBy: {
        // count: "desc",
      },
    });
    if (keywords) {
      res.json(keywords);
    } else {
      return res.status(404).json({ message: "Keywords not found." });
    }
  } catch (error) {
    console.error("Error querying keywords:", error);
  }
};

export { getKeywords };
