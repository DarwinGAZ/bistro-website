import { Request, RequestHandler, Response } from "express";
import { createCheckoutPreference } from "../services/payment";

export const createCheckoutSession: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const { totalNum, orderId } = req.body;

        if (!totalNum) {
            return res.status(400).json({ error: "Total não informado" });
        }

        const preference = await createCheckoutPreference(
            totalNum,
            orderId || `order_${Date.now()}`
        );

        return res.status(201).json({
            id: preference.id,
            init_point: preference.init_point,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar preferência" });
    }
};
