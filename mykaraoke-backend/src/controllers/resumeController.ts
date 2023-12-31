import prisma from "../config/database.js";
import { Request, Response } from "express";
import { PythonShell } from "python-shell";
import { fileURLToPath } from "url";
import { dirname } from "path";
import process from "process";
import fs from "fs";
import openai from "../config/openai.js";

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
      returnResult.education = returnResult.education?.map((education: any) => {
        const newEducation = { ...education };
        newEducation.coursework = education.coursework
          ?.split("#@!")
          .filter((point: any) => point)
          .map((sum: any) => ({ value: sum }));
        return newEducation;
      });
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
      ?.map((point: any) => point.value)
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
          ?.map((sum: any) => sum.value)
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
          ?.map((sum: any) => sum.value)
          .join("#@!");
        return newProject;
      }),
    };
    transformBody.education = {
      create: transformBody.education?.map((education: any) => {
        const newEducation = { ...education };
        newEducation.date = {
          create: {
            from: new Date(newEducation.date.from),
            to: new Date(newEducation.date.to),
          },
        };
        newEducation.coursework = newEducation.coursework
          ?.map((point: any) => point.value)
          .join("#@!");
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

const tailorResume = async (req: Request, res: Response) => {
  try {
    const chatCompletion1 = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an assistant for tailoring a user's resume to a given job description. The user will give you a job description, and you should retrieve the most important qualifications, technical skills, and experiences from the job description. Ignore anything that is business-related or specific to the company. We will use what you return to tailor the user's resume in the next step.`,
        },
        { role: "user", content: req.body.jobDescription },
      ],
      model: "gpt-4",
    });
    const chatCompletion1Response = chatCompletion1.choices[0].message.content;
    console.log(chatCompletion1Response);
    for (const experience of req.body.resume.experiences) {
      const bullets = experience.summary
        ?.map((bullet) => bullet.value)
        .join(";");
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an assistant for tailoring a user's resume to a given job description. You are given the following job requirements:
            """
            ${chatCompletion1Response}
            """
            The user will give you a list of resume bullet points, delimited by semicolons. These bullet points are part of the user's work with their company as a ${experience.title}. Please tailor these bullet points to the job description. Use semicolons to separate each bullet point. Do not use spaces or dashes or new lines to separate the strings. Only use semicolons. Write the bullet point from the applicant's perspective. For example, the words "nice to have" should not be in the result.
            `,
          },
          { role: "user", content: bullets },
        ],
        model: "gpt-4",
      });
      const response = chatCompletion.choices[0].message.content;
      experience.summary = response
        ?.split(";")
        .map((point) => ({ value: point }));
    }
    const skills = req.body.resume.skills
      ?.map((skill) => skill.value)
      .join(";");
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are given a job description delimited by triple quotations:
                """
                ${req.body.jobDescription}
                """
                The user will give you a list of technical skills, delimited by semicolons. Please append or modify this list of skills for the given job description. Only include hard skills of specific technologies.
                `,
        },
        { role: "user", content: skills },
      ],
      model: "gpt-3.5-turbo",
    });

    req.body.resume.skills = chatCompletion.choices[0].message.content
      ?.split(";")
      .map((skill) => ({ value: skill }));
    return res.json(req.body);
  } catch (error) {
    console.error("Error querying resume:", error);
  }
};

const convertResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file received");
    }

    const pyShell = new PythonShell("convert_pdf_to_docx.py", {
      mode: "text",
      pythonPath: process.env.PYTHON_PATH,
      scriptPath: process.cwd(),
      args: [req.file.path],
    });

    pyShell.on("message", (message) => {
      console.log(message);
    });

    pyShell.on("error", (error) => {
      console.error(error);
      return res.status(500).send("An error occurred.");
    });

    pyShell.end((error) => {
      if (error) {
        res.send(error);
        return;
      }
      const docxFilePath = req.file!.path.replace(".pdf", ".docx");

      return res.download(docxFilePath, "converted.docx", (err) => {
        fs.unlinkSync(req.file!.path);
        fs.unlinkSync(docxFilePath);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export { getResume, updateResume, convertResume, tailorResume };
