import express from "express";
import path from "path";
import { routes } from "./routes/main";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "public"));

server.use(express.static(path.join(__dirname, "public")));
server.use(routes);

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
