import Contact from "../models/Contacts.js";

function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings);
}

function getContactById(contactId, owner) {
  return Contact.findOne({ _id: contactId, owner });
}

function removeContact(contactId, owner) {
  return Contact.findOneAndDelete({ _id: contactId, owner });
}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(contactId, owner, data) {
  return Contact.findOneAndUpdate({ _id: contactId, owner }, data);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
