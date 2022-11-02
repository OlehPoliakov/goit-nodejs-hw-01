const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contacts, JSON.stringify(name, null, 3));
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
  const idx = contacts.findIndex(item => item.id === id);

  if (idx === -1) {
    return null;
  }
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
