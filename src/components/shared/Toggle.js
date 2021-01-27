import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background: red;
  border: 2px solid red;
  color: black;
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  z-index: 999;
  position: absolute;
  }
`;

function Toggle({ theme, toggleTheme }) {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
}

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
