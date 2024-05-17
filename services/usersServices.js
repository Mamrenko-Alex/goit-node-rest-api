import User from "../models/Users.js";

function createUser(data) {
  return User.create(data);
}

function findUser(filter) {
  return User.findOne(filter);
}

export default {
  createUser,
  findUser,
};
