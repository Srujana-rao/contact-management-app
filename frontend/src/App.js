import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app dark">
      <div className="header">
        <h2>Contact Management App</h2>
      </div>

      <div className="container">
        <ContactForm fetchContacts={fetchContacts} />
        <ContactList contacts={contacts} fetchContacts={fetchContacts} />
      </div>
    </div>
  );
}

export default App;
