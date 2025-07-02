import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef();

  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_k8hu2uc',
      'template_9u8lqmn',
      form.current,
      '0BXI4OTRNcU4Txz3R'
    )
    .then((result) => {
        console.log('Email sent!', result.text);
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 1000);
    }, (error) => {
        console.error('Email error:', error.text);
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Your Name" required className="contact-name"/>
        <input type="email" name="user_email" placeholder="Your Email" required className="contact-email"/>
        <textarea name="message" placeholder="Your Message" required className="contact-message"/>
        <button type="submit" className={`contact-send ${sent ? 'sent' : ''}`}>{sent ? "Sent" : "Send"}</button>
    </form>
  );
}

export default Contact;
