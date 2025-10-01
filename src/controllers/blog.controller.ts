import { RequestHandler } from "express";
import { createManyBlogItemsService } from "../services/blog";

export const createManyBlogItems: RequestHandler = async (req, res) => {
    const items = await createManyBlogItemsService();

    res.status(201).json({ message: "Items criado com succeso", items });

    return items;
};

export const getManyBlogItems: RequestHandler = async (req, res) => {
    const items = await createManyBlogItemsService();

    res.status(200).json({ message: "Items pegos com succeso", items });
    return items;
};
