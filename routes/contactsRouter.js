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

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/favorites", contactsControllers.getFavoriteContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(addContactToFavoriteSchema),
  contactsControllers.updateStatusContact
);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
