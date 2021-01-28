import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';

const Button = styled.a`
  background: red;
  border: 2px solid red;
  color: black;
  cursor: pointer;
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 10;
  outline: 0;
}
`;

function Toggle({ toggleTheme }) {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
}

Toggle.propTypes = {
  toggleTheme: func.isRequired,
};

export default Toggle;
