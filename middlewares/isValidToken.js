import HttpError from "../helpers/HttpError.js";
import { validateToken } from "../helpers/jwt.js";
import usersServices from "../services/usersServices.js";

export const isValidToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = validateToken(token);
    const [user] = await usersServices.findUser({ filter: { _id: id } });

    if (!user) {
      return next(HttpError(401, "User not found"));
    }
    if (!user.token) {
      return next(HttpError(401, "User signout"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};
