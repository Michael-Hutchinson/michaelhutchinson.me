import React from 'react';
import config from '../data/config.json';

function Contact() {
  return (
    <section id="contact">
      <h5>{config.sections.contact.title}</h5>
      <h3>{config.sections.contact.h3}</h3>
    </section>
  );
}

export default Contact;
