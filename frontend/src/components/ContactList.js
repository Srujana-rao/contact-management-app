import React from "react";

function ContactList({ contacts, fetchContacts }) {
  const deleteContact = async (id) => {
    await fetch(`https://contact-management-app-f7sw.onrender.com/contacts/${id}`, {
      method: "DELETE"
    });
    fetchContacts();
  };

  return (
    <div className="card">
      <h3>Saved Contacts</h3>

      {contacts.length === 0 && <p>No contacts found</p>}

      {contacts.map((c) => (
        <div className="contact-item" key={c._id}>
          <div>
            <strong>{c.name}</strong>
            <p>{c.phone}</p>
            <p>{c.email}</p>
          </div>
          <button
  className="delete-btn"
  onClick={() => deleteContact(c._id)}
  title="Delete"
>
  🗑
</button>

        </div>
      ))}
    </div>
  );
}

export default ContactList;
