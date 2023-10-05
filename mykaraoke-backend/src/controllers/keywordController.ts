import prisma from "../config/database.js";
import { Request, Response } from "express";

const getKeywords = async (req: Request, res: Response) => {
  try {
    const keywords = await prisma.keyword.findMany({
      include: {
        _count: {
          select: {
            jobListings: true,
          },
        },
      },
    });
    if (keywords) {
      const newKeywords = keywords.map((keyword) => {
        return {
          name: keyword.name,
          count: keyword._count.jobListings,
        };
      });
      res.json(newKeywords);
    } else {
      return res.status(404).json({ message: "Keywords not found." });
    }
  } catch (error) {
    console.error("Error querying keywords:", error);
  }
};

export { getKeywords };
