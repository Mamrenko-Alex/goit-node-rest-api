import contactsService from "../services/contactsServices.js";
import { tryCatchWrapper } from "../helpers/tryCathWrapper.js";
import { handleResult } from "../helpers/handleResult.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { favorite, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let filter = { owner };
  if (favorite) {
    filter.favorite = favorite;
  }

  const fields = "-createdAt -updatedAt";
  const settings = { skip, limit };

  const result = await contactsService.listContacts({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const [result] = await contactsService.getContactById(id, owner);
  handleResult(result);
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.removeContact(id, owner);
  handleResult(result);
  res.json(result);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact({
    name,
    email,
    phone,
    owner,
  });
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.updateContact(id, owner, req.body);
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
