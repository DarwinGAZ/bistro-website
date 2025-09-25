import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmailService = async (email: string, name: string) => {
    const transport = await nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        },
    });

    const message = await transport.sendMail({
        from: "bliss.bistro@gmail.com",
        to: email,
        subject: "We recevied your contact!",
        text: `Hello ${name}, we love you haha`,
    });

    return message;
};
