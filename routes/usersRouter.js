import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(createUserSchema),
  usersControllers.registerUser
);
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.post("/current");

export default usersRouter;
