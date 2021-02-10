import React from 'react';
import wording from '../data/wording.json';

function Contact() {
  return (
    <section id="contact">
      <h5>{wording[3].title}</h5>
      <h3>{wording[3].h3}</h3>
    </section>
  );
}

export default Contact;
