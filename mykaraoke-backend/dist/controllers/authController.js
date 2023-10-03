var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT } from "../constants.js";
const login = async (req, res) => {
    const requestBody = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: requestBody.email,
            },
        });
        if (user) {
            const valid = await bcrypt.compare(requestBody.password, user.hashedPassword);
            if (valid) {
                const { hashedPassword } = user, userWithoutPassword = __rest(user, ["hashedPassword"]);
                const token = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET);
                return res.json(token);
            }
            else {
                return res.status(401).json({ message: "Incorrect password." });
            }
        }
        else {
            return res.status(404).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.error("Error querying user:", error);
    }
};
const register = async (req, res) => {
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
        const token = jwt.sign(newUser, process.env.TOKEN_SECRET);
        return res.json(token);
    }
    catch (error) {
        console.error("Error querying user");
    }
};
const user = async (req, res) => {
    return res.json(req.user);
};
export { login, register, user };
