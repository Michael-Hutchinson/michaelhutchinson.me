import React from 'react';
import styled from 'styled-components';

const Cta = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  letter-spacing: 1.6px;
  padding: 14px 28px;
  border-radius: 100px;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 13px;
  font-family: 'Karla', sans-serif;
`;

function Button() {
  return <Cta>Click Me &gt;</Cta>;
}

export default Button;
