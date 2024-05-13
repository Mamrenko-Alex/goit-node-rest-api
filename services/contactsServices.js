import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import chalk from "chalk";

const contactsPath = path.resolve("db", "contacts.json");

const writeFile = (newContacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(chalk.red("error =>"), error);
  }
}

async function getContactById(contactId) {
  try {
    const contasts = await listContacts();
    return contasts.find(({ id }) => id === contactId) || null;
  } catch (error) {
    console.log(chalk.red("error =>"), error);
  }
}

async function removeContact(contactId) {
  try {
    const contasts = await listContacts();
    const removedContact = await getContactById(contactId);
    if (!removedContact) {
      return null;
    }
    const newContacts = contasts.filter(({ id }) => id !== contactId);
    await writeFile(newContacts);
    return removedContact;
  } catch (error) {
    console.log(chalk.red("error =>"), error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contasts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contasts.push(newContact);
    await writeFile(contasts);
    return newContact;
  } catch (error) {
    console.log(chalk.red("error =>"), error);
  }
}

async function updateContact(id, data) {
  if (!data) {
    return console.log(
      chalk.red("error =>"),
      "Body must have at least one field"
    );
  }
  const contasts = await listContacts();
  const index = contasts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contasts[index] = { ...contasts[index], ...data };
  await writeFile(contasts);
  return contasts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
