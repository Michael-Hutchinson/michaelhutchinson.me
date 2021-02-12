import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: 1px solid transparent;
  cursor: pointer;
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 10;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1.6px;
  padding: 14px 25px;
  border-radius: 100px;
}
`;

function Toggle({ toggleTheme }) {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
}

Toggle.propTypes = {
  toggleTheme: func.isRequired,
};

export default Toggle;
