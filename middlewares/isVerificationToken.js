import HttpError from "../helpers/HttpError.js";
import usersServices from "../services/usersServices.js";

export const isVerificationToken = async (req, res, next) => {
  const { email } = req.body;
  const [user] = await usersServices.findUser({ filter: { email } });
  if (!user.verify) {
    return next(
      HttpError(
        403,
        "Your email has not been verified. Please check your mail for verification."
      )
    );
  }
  next();
};
