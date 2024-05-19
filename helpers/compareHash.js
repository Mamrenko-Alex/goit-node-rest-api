import bcrypt from "bcrypt";

export const compareHash = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
