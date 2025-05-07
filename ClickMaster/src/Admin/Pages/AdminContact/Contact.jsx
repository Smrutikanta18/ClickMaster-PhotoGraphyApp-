import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./Contact.css";

function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/api/contact/all")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Failed to fetch contacts:", err));
  }, []);

  return (
    <div className="contact-dashboard">
      <Sidebar />
      <div className="content p-4" style={{ marginLeft: "250px" }}>
        <h2>Contact Submissions</h2>
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.subject}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contact;
