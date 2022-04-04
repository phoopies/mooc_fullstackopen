const Contact = ({ contact, deleteContact }) => {
  return (
    <div style={{display: 'flex', margin: 5, gap:10 }}>
      <button onClick={_e => deleteContact(contact)}>delete</button>
      <p>
        {contact.name} | {contact.number}
      </p>
    </div>
  );
};

export default Contact;
