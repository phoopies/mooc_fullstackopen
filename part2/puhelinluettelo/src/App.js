import { useEffect, useState } from "react";
import contactService from './services/contacts';
import ContactForm from "./ContactsForm";
import Contacts from "./Contacts";
import Header from "./Header";
import Filter from "./Filter";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [shownContacts, setShownContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const failMessage = "failed to load data :(";

  useEffect(() => {
    contactService
    .getAll()
    .then(contacts => {
      setContacts(contacts);
      setShownContacts(contacts)
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      alert(failMessage);
      setLoading(false);
    });
  }, []);

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.del(contact.id)
      .then(success => {
        if (success) {
          setContacts(contacts.filter(c => c.id !== contact.id));
        } else {
          alert("Something went wrong!");
        }
      })
      .catch(error => {
        console.log(error);
        alert("Something went wrong!");
        // Probably doesn't exists in the server, could delete from contacts
      })
    }
  };

  return (
    <div>
      <Header level={2} text="Phonebook" />
      {/* Could also have the filtering happen here in App, but this is clean */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Filter contacts={contacts} setContacts={setShownContacts} />
          <ContactForm contacts={contacts} setContacts={setContacts} />
          <Contacts contacts={shownContacts} deleteContact={deleteContact}/>
        </div>
      )}
    </div>
  );
};

export default App;
