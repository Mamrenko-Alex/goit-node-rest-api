import User from "../models/Users.js";
import bcrypt from "bcrypt";

async function createUser(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
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
