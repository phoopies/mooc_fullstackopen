import { useState } from 'react'
import ContactForm  from './ContactsForm'
import Contacts from './Contacts'
import Header from './Header'
import Filter from './Filter'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [shownContacts, setShownContacts] = useState([...contacts]);

  return (
    <div>
      <Header level={2} text="Phonebook" />
      {/* Could also have the filtering happen here in App, but this is clean */}
      <Filter contacts={contacts} setContacts={setShownContacts}/>
      <ContactForm contacts={contacts} setContacts={setContacts} />
      <Contacts contacts={shownContacts} />
    </div>
  )

}

export default App