import { RequestHandler } from "express";
import dotenv from "dotenv";

dotenv.config();

export const privateRoute: RequestHandler = (req, res, next) => {
    const key = req.headers.authorization;

    if (key === process.env.SECRET_KEY) {
        return next();
    }

    return res.status(401).json({ error: "Acesso Negado!" });
};
