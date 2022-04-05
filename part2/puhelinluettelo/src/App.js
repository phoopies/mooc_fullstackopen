import { useEffect, useState } from "react";
import contactService from './services/contacts';
import ContactForm from "./ContactsForm";
import Contacts from "./Contacts";
import Header from "./Header";
import Filter from "./Filter";
import Notification from "./Notification";

/* 
TODO User can still add multiple same contacts from different browser instances 
FIX? Check if exists from service rather than from state.
*/

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [shownContacts, setShownContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(""); // Should be a list
  const [delMsg, setDelMsg] = useState(""); // Should be a list

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
      setErrorMsg(failMessage);
      setLoading(false);
    });
  }, []);

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.del(contact.id)
      .then(success => {
        if (success) {
          setContacts(contacts.filter(c => c.id !== contact.id));
          setDelMsg(`contact ${contact.name} deleted!`);
        } else {
          alert("Something went wrong!");
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMsg(`Contact ${contact.name} doesn't exist!`);
        setContacts(contacts.filter(c => c.id !== contact.id));
      })
    }
  };

  return (
    <div>
      <Header level={2} text="Phonebook" />
      <Notification message={errorMsg} setMessage={setErrorMsg} color="red" />
      <Notification message={delMsg} setMessage={setDelMsg} color="orange" />
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
