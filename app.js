import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
app.use("/avatars", express.static(path.join("public", "avatars")));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const connection = mongoose.connect(DB_HOST);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
