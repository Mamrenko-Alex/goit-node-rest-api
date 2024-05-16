import HttpError from "../helpers/HttpError.js";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, "You must provide the correct ID"));
  }
  next();
};