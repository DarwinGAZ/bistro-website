import { Router } from "express";
import * as pingController from "../controllers/ping.controller";
import * as pageController from "../controllers/page.controller";
import * as menuController from "../controllers/menu.controller";
import * as blogController from "../controllers/blog.controller";
import * as contactController from "../controllers/contact.controller";
import * as paymentController from "../controllers/payment.controller";
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
routes.get("/contactOK", pageController.contactOKPage);
routes.get("/payment-ok", pageController.paymentOkPage);
routes.get("/payment-error", pageController.paymentErrorPage);
routes.get("/payment-pending", pageController.paymentPendingPage);

routes.post("/createMenu", privateRoute, menuController.createManyMenuItens);

routes.post("/createBlog", privateRoute, blogController.createManyBlogItems);

routes.post("/sendContact", contactController.sendEmail);

routes.post("/checkout-session", paymentController.createCheckoutSession);
