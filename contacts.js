const fs = require('fs/promises');
const path = require('path');
// const { nanoid } = require('nanoid');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const addContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomInt(999).toString(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const getContactById = async id => {
  const contacts = await listContacts();
  const result = await contacts.find(contact => contact.id === id);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async id => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
