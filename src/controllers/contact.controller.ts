import { RequestHandler } from "express";
import { sendEmailService } from "../services/contact";

export const sendEmail: RequestHandler = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const message = await sendEmailService(email, name);

    if (!message) {
        return res.status(500).json({ error: "Um erro ocorreu!" });
    }

    return res.redirect("/contactOK");
};
