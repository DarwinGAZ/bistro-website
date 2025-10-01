import { RequestHandler } from "express";
import { createManyBlogItemsService } from "../services/blog";

export const createManyBlogItems: RequestHandler = async (req, res) => {
    const items = await createManyBlogItemsService();

    res.status(201).json({ message: "Items criado com succeso", items });
};
