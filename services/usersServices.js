import bcrypt from "bcrypt";
import gravatar from "gravatar";
import User from "../models/Users.js";

async function createUser(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const avatarURL = gravatar.url(data.email, { s: "200", r: "pg", d: "retro" });
  return User.create({ ...data, password: hashPassword, avatarURL });
}

function findUser(search = {}) {
  const { filter, fields, settings } = search;
  return User.find(filter, fields, settings);
}

function updateUser(userId, data) {
  return User.findByIdAndUpdate(userId, data);
}

function loginUser() {}

export default {
  createUser,
  findUser,
  updateUser,
  loginUser,
};
