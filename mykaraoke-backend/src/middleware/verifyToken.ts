import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

interface User {
  id: number;
  email: string;
  hashedPassword: string;
}

declare module "express" {
  interface Request {
    user?: Omit<User, "hashedPassword">;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token part

  if (token) {
    if (!process.env.TOKEN_SECRET) {
      throw Error("missing TOKEN_SECRET environmental variable");
    }
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET) as User;

    if (!tokenData) {
      return res.status(403).json({ message: "Token verification failed" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: tokenData.id,
      },
    });

    if (user) {
      const { hashedPassword, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      return next();
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default verifyToken;
