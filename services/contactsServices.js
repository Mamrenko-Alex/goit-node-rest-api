import Contact from "../models/Contacts.js";

function listContacts(search = {}) {
  const { filter = {} } = search;
  return Contact.find(filter);
}

function getContactById(contactId) {
  return Contact.find({ _id: contactId });
}

function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(contactId, data) {
  return Contact.findByIdAndUpdate(contactId, data);
}

function updateStatusContact(contactId, data) {
  return Contact.findByIdAndUpdate(contactId, data);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
