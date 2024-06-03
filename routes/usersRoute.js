import express from "express";
import UsersController from "../controllers/usersController.js";

const UsersRouter = express.Router();

UsersRouter.get("/", UsersController.getList);
UsersRouter.get("/:id", UsersController.getById);
UsersRouter.post("/", UsersController.add);
UsersRouter.put("/:id", UsersController.update);
UsersRouter.delete("/:id", UsersController.delete);

export default UsersRouter;
