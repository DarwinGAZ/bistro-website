import { RequestHandler } from "express";
import {
    createManyMenuItensService,
    getMenuItemsService,
} from "../services/menu";

export const homePage: RequestHandler = (req, res) => {
    res.render("../views/pages/home.ejs", {
        currentPage: "home",
    });
};

export const aboutPage: RequestHandler = (req, res) => {
    res.render("../views/pages/about.ejs", {
        currentPage: "about",
    });
};

export const menuPage: RequestHandler = async (req, res) => {
    const category = req.query.category;

    const items = await getMenuItemsService(category);

    res.render("../views/pages/menu.ejs", {
        currentPage: "menu",
        items,
        selectedCategory: category || "all",
    });
};

export const pagesPage: RequestHandler = (req, res) => {
    res.render("../views/pages/pages.ejs", {
        currentPage: "pages",
    });
};

export const contactPage: RequestHandler = (req, res) => {
    res.render("../views/pages/contact.ejs", {
        currentPage: "contact",
    });
};

export const bookPage: RequestHandler = (req, res) => {
    res.render("../views/pages/book.ejs", {
        currentPage: "book",
    });
};

export const createManyMenuItens: RequestHandler = async (req, res) => {
    const itens = await createManyMenuItensService();

    return itens;
};
