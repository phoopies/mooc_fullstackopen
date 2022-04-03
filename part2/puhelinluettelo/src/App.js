import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactsForm";
import Contacts from "./Contacts";
import Header from "./Header";
import Filter from "./Filter";

const App = () => {
  const url = "http://localhost:3001/persons";
  const [contacts, setContacts] = useState([]);
  const [shownContacts, setShownContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const failMessage = "failed to load data :(";
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setContacts(response.data);
          setShownContacts(response.data);
        } else {
          alert(failMessage);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(failMessage);
        setLoading(false);
      });
  }, []);

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
          <Contacts contacts={shownContacts} />
        </div>
      )}
    </div>
  );
};

export default App;
