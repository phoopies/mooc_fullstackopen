import { useState } from "react";
import contactService from './services/contacts';
import Header from "./Header";
import TextInput from "./TextInput";

const ContactForm = ({ contacts, setContacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);

  const isNumberValid = (aNumber) => {
    const re = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
    return re.test(aNumber);
  };

  const isNameValid = (aName) => aName.trim() !== "";

  const isContactValid = (contact) => {
    return isNumberValid(contact.number) && isNameValid(contact.name);
  };
  
  const findExisting = (contact) => {
    const maybeThere = contacts.filter(c => c.name === contact.name);
    return maybeThere.length > 0 ? maybeThere[0] : undefined;
  }

  const handleClick = (e) => {
    e.preventDefault();

    const contact = {
      name: name,
      number: number,
    };

    if (!isContactValid(contact)) {
      setError(true);
      return;
    }

    const existingContact = findExisting(contact);
    if (existingContact) {
      if (window.confirm(`${existingContact.name} already exists, update number?`)) {
        contactService.update(existingContact.id, contact)
        .then(updatedContact => {
          setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
          setName("");
          setNumber("");
        })
      }
      return;
    }

    contactService.create(contact)
    .then(newContact => {
      setContacts([...contacts, newContact]);
      setName("");
      setNumber("");
    })
  };

  const handleChange = (setValue, value) => {
    setError(false);
    setValue(value);
  };

  return (
    <div>
      <Header level={3} text="Add a new contact" />
      <form>
        <TextInput
          text="name"
          value={name}
          onChange={(value) => handleChange(setName, value)}
        />
        <TextInput
          text="number"
          value={number}
          onChange={(value) => handleChange(setNumber, value)}
        />
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      {/* TODO better error messages :) */}
      {error && <p style={{ color: "red" }}>Invalid information</p>}
    </div>
  );
};

export default ContactForm;
