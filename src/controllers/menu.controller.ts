import { RequestHandler } from "express";
import { createManyMenuItensService } from "../services/menu";

export const createManyMenuItens: RequestHandler = async (req, res) => {
    const itens = await createManyMenuItensService();

    res.status(201).json({ itens });
};
