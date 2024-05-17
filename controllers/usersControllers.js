import HttpError from "../helpers/HttpError.js";
import { tryCatchWrapper } from "../helpers/tryCathWrapper.js";
import usersServices from "../services/usersServices.js";

const registerUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await usersServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already use");
  }

  const newUser = await usersServices.createUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export default {
  registerUser: tryCatchWrapper(registerUser),
};
