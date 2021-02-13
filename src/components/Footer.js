import React from 'react';
import styled from 'styled-components';
import config from '../data/config.json';

const Bottom = styled.footer`
  padding: 10px 0 40px 0;
  text-align: center;
`;

function Footer() {
  return (
    <Bottom>
      <p>{config.sections.footer.p}</p>
    </Bottom>
  );
}

export default Footer;
