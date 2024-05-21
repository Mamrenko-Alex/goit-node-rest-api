import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { isEmptyBody } from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  addContactToFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../middlewares/isValidId.js";
import { isValidToken } from "../middlewares/isValidToken.js";

const contactsRouter = express.Router();

contactsRouter.get("/", isValidToken, contactsControllers.getAllContacts);

contactsRouter.get(
  "/:id",
  isValidToken,
  isValidId,
  contactsControllers.getOneContact
);

contactsRouter.delete(
  "/:id",
  isValidToken,
  isValidId,
  contactsControllers.deleteContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidToken,
  isValidId,
  validateBody(addContactToFavoriteSchema),
  contactsControllers.updateContact
);

contactsRouter.post(
  "/",
  isValidToken,
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidToken,
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
