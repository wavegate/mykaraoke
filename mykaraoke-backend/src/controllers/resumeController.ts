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
        education: {
          include: { date: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    if (queryResult) {
      const returnResult: any = { ...queryResult[0] };
      returnResult.skills = returnResult.skills?.map((skill: any) => {
        return { value: skill.name };
      });
      returnResult.summary = returnResult.summary
        ?.split("#@!")
        .filter((point: any) => point)
        .map((sum: any) => ({ value: sum }));
      returnResult.experiences = returnResult.experiences?.map(
        (experience: any) => {
          const newExperience = { ...experience };
          newExperience.summary = experience.summary
            ?.split("#@!")
            .filter((point: any) => point)
            .map((sum: any) => ({ value: sum }));
          return newExperience;
        }
      );
      returnResult.projects = returnResult.projects?.map((project: any) => {
        const newProject = { ...project };
        newProject.summary = project.summary
          ?.split("#@!")
          .filter((point: any) => point)
          .map((sum: any) => ({ value: sum }));
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
      .map((point: any) => point.value)
      .join("#@!");
    transformBody.skills = {
      connectOrCreate: transformBody.skills?.map((point: any) => ({
        where: { name: point.value },
        create: { name: point.value },
      })),
    };

    transformBody.experiences = {
      create: transformBody.experiences?.map((experience: any) => {
        const newExperience = { ...experience };
        newExperience.summary = newExperience.summary
          .map((sum: any) => sum.value)
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
      create: transformBody.projects?.map((project: any) => {
        const newProject = { ...project };
        newProject.summary = newProject.summary
          .map((sum: any) => sum.value)
          .join("#@!");
        return newProject;
      }),
    };
    transformBody.education = {
      create: transformBody.education?.map((education: any) => {
        const newEducation = { ...education };
        newEducation.gpa = Number(newEducation.gpa);
        newEducation.date = {
          create: {
            from: new Date(newEducation.date.from),
            to: new Date(newEducation.date.to),
          },
        };
        return newEducation;
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
