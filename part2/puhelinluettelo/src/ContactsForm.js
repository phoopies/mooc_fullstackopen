import { useEffect, useState } from "react";
import Header from "./Header";
import TextInput from "./TextInput";

const ContactForm = ({ contacts, setContacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(Math.max(...Object.values(contacts).map(contact => contact.id)) + 1);
  }, [contacts])

  const isNumberValid = (aNumber) => {
    const re = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
    return re.test(aNumber);
  };

  const isNameValid = (aName) => aName.trim() !== "";

  const isContactValid = (contact) => {
    return isNumberValid(contact.number) && isNameValid(contact.name);
  };

  // Checks if someone with a same name exists
  const contactExists = (contact) =>
    contacts.map((c) => c.name).includes(contact.name);

  const handleClick = (e) => {
    e.preventDefault();

    const contact = {
      name: name,
      number: number,
      id: id,
    };

    if (!isContactValid(contact)) {
      setError(true);
      return;
    }

    if (contactExists(contact)) {
      alert(`${contact.name} already exists!`);
      return;
    }

    setContacts((prev) => [...prev, contact]);
    setId(id + 1);
    setName("");
    setNumber("");
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
