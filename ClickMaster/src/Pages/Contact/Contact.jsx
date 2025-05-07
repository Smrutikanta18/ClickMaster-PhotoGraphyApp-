import React, { useState } from 'react';
import Banner2 from '../../Components/Banner2/Banner2';
import './Contact.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8088/api/contact/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to send");
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', phone: '', subject: '' });
    })
    .catch(err => {
      console.error(err);
      alert("There was an error sending your message.");
    });
  };

  return (
    <>
      <Header />
      <Banner2 title="Contact Us" pageName="Contact Us"/>
      <div id="contact" className="section lb">
        <div className="container">
          <div className="section-title text-center">
            <h3>Contact Us</h3>
            <p>We'd love to hear from you! Reach out with any questions, inquiries, or feedback, and we'll get back to you as soon as possible.</p>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="contact_form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <input className="form-control" id="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                      <input className="form-control" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                      <input className="form-control" id="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" required />
                    </div>
                    <div className="col-md-6">
                      <textarea className="form-control" id="subject" value={formData.subject} onChange={handleChange} placeholder="Your Message" required />
                    </div>
                    <div className="col-lg-12 text-left mt-3">
                      <button type="submit" className="hover-effect-new" data-text="Send Message"><span>Send Message</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-card">
        <h1>PhotoShoot</h1>
        <p>Address: demo street, #445, Stgo.</p>
        <p>Phone: +56753223344</p>
        <p>e-Mail: demo@email.com</p>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
