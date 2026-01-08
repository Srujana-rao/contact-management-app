import React, { useState } from "react";

function ContactForm({ fetchContacts }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }
if (formData.phone && !/^\d+$/.test(formData.phone)) {
  newErrors.phone = "Phone number must contain only digits";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
setSuccess("Contact saved successfully!");
setTimeout(() => setSuccess(""), 2500);
setFormData({ name: "", email: "", phone: "", message: "" });
fetchContacts();

  };

  return (
   <form className="card" onSubmit={handleSubmit}>
  <h3>Add Contact</h3>

  <div className="contact-item">
    <input
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
    />
  </div>
  {errors.name && <p>{errors.name}</p>}

  <div className="contact-item">
    <input
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />
  </div>
  {errors.email && <p>{errors.email}</p>}

  <div className="contact-item">
    <input
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
    />
  </div>
  {errors.phone && <p>{errors.phone}</p>}

  <div className="contact-item">
    <textarea
      name="message"
      placeholder="Message"
      value={formData.message}
      onChange={handleChange}
    />
  </div>

  <button className="submit-btn" disabled={!formData.name || !formData.phone}>
    Add Contact
  </button>

  {success && <p>{success}</p>}
</form>

  );
}

export default ContactForm;
