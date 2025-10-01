import { RequestHandler } from "express";
import { getMenuItemsService } from "../services/menu";
import { getManyBlogItemsService } from "../services/blog";

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
        publishableKey: process.env.STRIPE_PUBLIC_KEY,
    });
};

export const pagesPage: RequestHandler = async (req, res) => {
    const items = await getManyBlogItemsService();

    res.render("../views/pages/pages.ejs", {
        currentPage: "pages",
        items,
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

export const cartPage: RequestHandler = (req, res) => {
    res.render("../views/pages/cart.ejs", {
        currentPage: "",
    });
};

export const contactOKPage: RequestHandler = (req, res) => {
    res.render("../views/pages/contactOK.ejs", {
        currentPage: "",
    });
};

export const paymentOkPage: RequestHandler = (req, res) => {
    res.render("../views/pages/payment-ok.ejs", {
        currentPage: "",
    });
};

export const paymentErrorPage: RequestHandler = (req, res) => {
    res.render("../views/pages/payment-error.ejs", {
        currentPage: "",
    });
};

export const paymentPendingPage: RequestHandler = (req, res) => {
    res.render("../views/pages/payment-pending.ejs", {
        currentPage: "",
    });
};
