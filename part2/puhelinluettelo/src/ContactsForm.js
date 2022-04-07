import { useState } from "react";
import contactService from './services/contacts';
import Header from "./Header";
import TextInput from "./TextInput";
import Notification from "./Notification";

const ContactForm = ({ contacts, setContacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  
  const findExisting = (contact) => {
    const maybeThere = contacts.filter(c => c.name === contact.name);
    return maybeThere.length > 0 ? maybeThere[0] : undefined;
  }

  const handleClick = (e) => {
    e.preventDefault();

    const contact = {
      name: name.trim(),
      number: number.trim(),
    };

    const existingContact = findExisting(contact);
    if (existingContact) {
      if (window.confirm(`${existingContact.name} already exists, update number?`)) {
        contactService.update(existingContact.id, contact)
        .then(updatedContact => {
          setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
          setMsg(`Updated contact ${contact.name}`);
          setName("");
          setNumber("");
        }).catch(error => {
          setErrorMsg(error);
        })
      }
      return;
    }

    contactService.create(contact)
    .then(newContact => {
      setContacts([...contacts, newContact]);
      setName("");
      setNumber("");
      setMsg(`Added ${contact.name} to contacts`)
    }).catch(error => {
      setErrorMsg(error);
    })
  };

  const handleChange = (setValue, value) => {
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
      <Notification message={errorMsg} setMessage={setErrorMsg} clearTimeMs={6000} color='red'/>
      <Notification message={msg} setMessage={setMsg} color='green'/>
    </div>
  );
};

export default ContactForm;
