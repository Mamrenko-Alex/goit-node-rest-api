import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schemas/usersSchemas.js";
import { isValidToken } from "../middlewares/isValidToken.js";

const usersRouter = express.Router();

usersRouter.get("/", usersControllers.getAllusers);

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(createUserSchema),
  usersControllers.registerUser
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(loginUserSchema),
  usersControllers.loginUser
);

usersRouter.post("/logout", isValidToken, usersControllers.logoutUser);
usersRouter.get("/current", isValidToken, usersControllers.getOneUser);

// usersRouter.get("/:id", usersControllers.getOneUser);

// usersRouter.post(
//   "/:id",
//   isEmptyBody,
//   validateBody(updateUserSchema),
//   usersControllers.updateUser
// );

export default usersRouter;
