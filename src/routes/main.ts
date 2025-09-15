import { Router } from "express";
import * as pingController from "../controllers/ping.controller";
import * as pageController from "../controllers/page.controller";
import * as menuController from "../controllers/menu.controller";
import { privateRoute } from "../middleware/private-route";

export const routes = Router();

routes.get("/ping", pingController.ping);

routes.get("/", pageController.homePage);
routes.get("/about", pageController.aboutPage);
routes.get("/menu", pageController.menuPage);
routes.get("/pages", pageController.pagesPage);
routes.get("/contact", pageController.contactPage);
routes.get("/book", pageController.bookPage);
routes.get("/cart", pageController.cartPage);

routes.post("/createMenu", privateRoute, menuController.createManyMenuItens);
