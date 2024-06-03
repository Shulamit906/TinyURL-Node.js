import express from "express";
import LinksController from "../controllers/linksController.js";

const LinksRouter = express.Router();

LinksRouter.get("/", LinksController.getList);
LinksRouter.get("/:id", LinksController.getById);
LinksRouter.post("/", LinksController.add);
LinksRouter.put("/:id", LinksController.update);
LinksRouter.delete("/:id", LinksController.delete);
LinksRouter.get('/redirect/:id', LinksController.redirectLink); 
LinksRouter.get('/:id/clicks', LinksController.getClicksByTarget); 

export default LinksRouter;
