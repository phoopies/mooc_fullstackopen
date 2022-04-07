import TextInput from "./TextInput";
import { useState, useEffect } from "react";

const Filter = ({ contacts, setContacts }) => {
  const [filter, setFilter] = useState("");
  
  const filterer = (aFilter) => {
    const re = new RegExp(`\\s*^${aFilter}.*\\s*`, ["i"]);
    return contacts.filter((contact) => re.test(contact.name));
  };

  useEffect(() => {
    setContacts(filterer(filter));
  }, [filter, filterer, setContacts]);

  return (
    <div>
      <TextInput
        text="filter shown with"
        value={filter}
        onChange={(value) => {
          setFilter(value);
          setContacts(filterer(value));
        }}
      />
    </div>
  );
};

export default Filter;
