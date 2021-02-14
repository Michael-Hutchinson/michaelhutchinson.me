import React from 'react';
import styled from 'styled-components';

const Cta = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.link};
  letter-spacing: 0.1rem;
  padding: 0.875rem 1.563rem;
  border-radius: 0.25rem;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0.063rem solid ${({ theme }) => theme.link};
  font-family: var(--font-main);
  transition: all ease-in-out 0.2s;
  :hover {
    background-color: ${({ theme }) => theme.shadow};
  }
`;

function Button() {
  return <Cta href="#about">Learn More</Cta>;
}

export default Button;
