import path from "path";
import Jimp from "jimp";

import HttpError from "../helpers/HttpError.js";
import { tryCatchWrapper } from "../helpers/tryCathWrapper.js";
import usersServices from "../services/usersServices.js";
import { handleResult } from "../helpers/handleResult.js";
import { compareHash } from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

const galleryPath = path.resolve("public", "avatars");

const getAllusers = async (req, res, next) => {
  const fields = "-createdAt -updatedAt -password -token";
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await usersServices.findUser({ filter: {}, fields, settings });
  res.json(result);
};

const getOneUser = async (req, res, next) => {
  const { _id } = req.user;
  const [user] = await usersServices.findUser({ filter: { _id } });
  handleResult(user);
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const registerUser = async (req, res, next) => {
  const { email } = req.body;
  const [user] = await usersServices.findUser({ filter: { email } });
  if (user) {
    throw HttpError(409, "Email already use");
  }

  const newUser = await usersServices.createUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const result = await usersServices.updateUser(id, req.body);
  handleResult(result);
  res.json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const [user] = await usersServices.findUser({ filter: { email } });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = { id };
  const token = createToken(payload);
  await usersServices.updateUser(id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  const result = await usersServices.updateUser(_id, { token: "" });
  handleResult(result);
  res.status(204).json({});
};

const changeSubscription = async (req, res, next) => {
  const { subscription: newSubscription } = req.body;
  const { _id, subscription } = req.user;

  if (newSubscription === subscription) {
    throw HttpError(409, `You already have ${subscription} level`);
  }

  const result = await usersServices.updateUser(_id, {
    subscription: newSubscription,
  });

  handleResult(result);
  res.json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(galleryPath, filename);

  Jimp.read(oldPath, (err, avatar) => {
    if (err) {
      throw err;
    }
    return avatar
      .resize(250, 250) // resize
      .write(newPath); // save
  });

  const avatarURL = path.join("avatars", filename);
  const result = await usersServices.updateUser(_id, { avatarURL });

  res.json({
    avatarURL: result.avatarURL,
  });
};

export default {
  registerUser: tryCatchWrapper(registerUser),
  getAllusers: tryCatchWrapper(getAllusers),
  updateUser: tryCatchWrapper(updateUser),
  getOneUser: tryCatchWrapper(getOneUser),
  loginUser: tryCatchWrapper(loginUser),
  logoutUser: tryCatchWrapper(logoutUser),
  changeSubscription: tryCatchWrapper(changeSubscription),
  updateAvatar: tryCatchWrapper(updateAvatar),
};
