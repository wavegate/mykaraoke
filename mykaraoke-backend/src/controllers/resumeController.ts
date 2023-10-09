import prisma from "../config/database.js";
import { Request, Response } from "express";

const getResume = async (req: Request, res: Response) => {
  try {
    const queryResult = await prisma.resume.findMany({
      include: {
        experiences: {
          include: {
            date: true,
          },
        },
        skills: true,
        projects: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    if (queryResult) {
      const returnResult = { ...queryResult[0] };
      returnResult.skills = returnResult.skills?.map((skill) => {
        return { value: skill.name };
      });
      returnResult.summary = returnResult.summary
        ?.split("#@!")
        .filter((point) => point)
        .map((sum) => ({ value: sum }));
      returnResult.experiences = returnResult.experiences?.map((experience) => {
        const newExperience = { ...experience };
        newExperience.summary = experience.summary
          ?.split("#@!")
          .filter((point) => point)
          .map((sum) => ({ value: sum }));
        return newExperience;
      });
      returnResult.projects = returnResult.projects?.map((project) => {
        const newProject = { ...project };
        newProject.summary = project.summary
          ?.split("#@!")
          .filter((point) => point)
          .map((sum) => ({ value: sum }));
        return newProject;
      });

      res.json(returnResult);
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
      connectOrCreate: transformBody.skills?.map((point) => ({
        where: { name: point.value },
        create: { name: point.value },
      })),
    };

    transformBody.experiences = {
      create: transformBody.experiences?.map((experience) => {
        const newExperience = { ...experience };
        newExperience.summary = newExperience.summary
          .map((sum) => sum.value)
          .join("#@!");
        newExperience.date = {
          create: {
            from: new Date(newExperience.date.from),
            to: new Date(newExperience.date.to),
          },
        };
        return newExperience;
      }),
    };
    transformBody.projects = {
      create: transformBody.projects?.map((project) => {
        const newProject = { ...project };
        newProject.summary = newProject.summary
          .map((sum) => sum.value)
          .join("#@!");
        return newProject;
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
