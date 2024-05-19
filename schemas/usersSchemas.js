import Joi from "joi";
import { emailRegexp } from "../constants/user_constants.js";
import { subscriptionsList } from "../constants/subscriptions.js";

export const createUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "you entered an invalid email",
  }),
  password: Joi.string().min(8).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "you entered an invalid email",
  }),
  password: Joi.string().min(8).messages({
    "string.min": "Password should have a minimum length of 8 characters",
  }),
});

export const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionsList)
    .required()
    .messages({
      "any.only": `Subscription must be one of the following values: ${subscriptionsList.join(
        ", "
      )}`,
    }),
});
