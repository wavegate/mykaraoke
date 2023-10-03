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
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token part
    if (token) {
        if (!process.env.TOKEN_SECRET) {
            throw Error("missing TOKEN_SECRET environmental variable");
        }
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!tokenData) {
            return res.status(403).json({ message: "Token verification failed" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: tokenData.id,
            },
        });
        if (user) {
            const { hashedPassword } = user, userWithoutPassword = __rest(user, ["hashedPassword"]);
            req.user = userWithoutPassword;
            return next();
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    else {
        return res.status(401).json({ message: "No token provided" });
    }
};
export default verifyToken;
