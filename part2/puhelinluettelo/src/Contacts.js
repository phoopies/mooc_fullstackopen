import Contact from "./Contact";
import Header from "./Header";

const Contacts = ({ contacts, deleteContact }) => {

  return (
    <div>
      <Header level={3} text="Contacts" />
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </div>
  );
};

export default Contacts;
