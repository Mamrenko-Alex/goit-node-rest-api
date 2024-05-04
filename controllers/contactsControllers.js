import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";
import { tryCatchWrapper } from "../helpers/tryCathWrapper.js";

const handleResult = (result) => {
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();
  handleResult(result);
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  handleResult(result);
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  handleResult(result);
  res.json(result);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact(name, email, phone);
  handleResult(result);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  handleResult(result);
  res.json(result);
};

export default {
  getAllContacts: tryCatchWrapper(getAllContacts),
  getOneContact: tryCatchWrapper(getOneContact),
  deleteContact: tryCatchWrapper(deleteContact),
  createContact: tryCatchWrapper(createContact),
  updateContact: tryCatchWrapper(updateContact),
};
