import prisma from "../config/database.js";
import { Request, Response } from "express";

const getResume = async (req: Request, res: Response) => {
  try {
    const queryResult = await prisma.resume.findFirst({
      //   select: {
      //     id: req.body.id,
      //   },
    });
    if (queryResult) {
      res.json(queryResult);
    } else {
      return res.status(404).json({ message: "Resume not found." });
    }
  } catch (error) {
    console.error("Error querying resume:", error);
  }
};

const updateResume = async (req: Request, res: Response) => {
  try {
    let queryResult;
    const transformBody = { ...req.body };
    transformBody.summary = transformBody.summary
      .map((point) => point.value)
      .join("#@!");
    transformBody.skills = {
      connectOrCreate: transformBody.skills.map((point) => ({
        where: { name: point.value },
        create: { name: point.value },
      })),
    };

    transformBody.experiences = {
      create: transformBody.experiences.map((experience) => {
        const newExperience = { ...experience };
        newExperience.summary = newExperience.summary
          .map((sum) => sum.value)
          .join("#@!");
        return newExperience;
      }),
    };
    if (req.body.id) {
      queryResult = await prisma.resume.update({
        where: {
          id: req.body.id,
        },
        data: transformBody,
      });
    } else {
      queryResult = await prisma.resume.create({
        data: transformBody,
      });
    }
    if (queryResult) {
      res.json(queryResult);
    } else {
      return res.status(404).json({ message: "Resume not found." });
    }
  } catch (error) {
    console.error("Error querying resume:", error);
  }
};

export { getResume, updateResume };
