import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SALT } from "../constants.js";

const login = async (req: Request, res: Response) => {
  const requestBody = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });
    if (user) {
      const valid = await bcrypt.compare(
        requestBody.password,
        user.hashedPassword
      );
      if (valid) {
        const { hashedPassword, ...userWithoutPassword } = user;
        const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET!);
        return res.json(token);
      } else {
        return res.status(401).json({ message: "Incorrect password." });
      }
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error querying user:", error);
  }
};

const register = async (req: Request, res: Response) => {
  const requestBody = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });
    if (user) {
      return res
        .status(409)
        .json({ message: "Username is already registered." });
    }
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(requestBody.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: requestBody.email,
        hashedPassword: hashedPassword,
      },
    });

    const token = jwt.sign(newUser, process.env.TOKEN_SECRET!);
    return res.json(token);
  } catch (error) {
    console.error("Error querying user");
  }
};

const user = async (req: Request, res: Response) => {
  return res.json(req.user);
};

export { login, register, user };
