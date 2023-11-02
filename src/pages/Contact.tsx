import React from 'react';
import config from '../data/config.json';
import Title from '../components/Title/Title';
import Form from '../components/Form/Form';

const Contact = () => (
  <section id="contact">
    <Title titleText={config.sections.contact.title} />
    <h3>{config.sections.contact.h3}</h3>
    <Form />
  </section>
);

export default Contact;
