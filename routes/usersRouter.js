import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import {
  createUserSchema,
  loginUserSchema,
  changeSubscriptionSchema,
  updateUserSchema,
} from "../schemas/usersSchemas.js";
import { isValidToken } from "../middlewares/isValidToken.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.get("/", usersControllers.getAllusers);

usersRouter.patch(
  "/",
  isValidToken,
  isEmptyBody,
  validateBody(changeSubscriptionSchema),
  usersControllers.changeSubscription
);

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

usersRouter.patch(
  "/avatars",
  isValidToken,
  upload.single("avatar"),
  usersControllers.updateAvatar
);

usersRouter.post("/logout", isValidToken, usersControllers.logoutUser);

usersRouter.get("/current", isValidToken, usersControllers.getOneUser);

export default usersRouter;
