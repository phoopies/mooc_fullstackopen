import Contact from "./Contact";
import Header from "./Header";

const Contacts = ({ contacts }) => {
  return (
    <div>
      <Header level={3} text="Contacts" />
      {contacts.map((contact) => (
        <Contact key={contact.name} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
