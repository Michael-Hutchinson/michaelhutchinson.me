import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Cta = styled.a`
  background-color: transparent;
  border: 0.063rem solid ${({ theme }) => theme.link};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.link};
  cursor: pointer;
  display: inline-flex;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.1rem;
  outline: 0;
  padding: 0.875rem 1.563rem;
  position: relative;
  text-transform: uppercase;
  transition: all ease-in-out 0.2s;
  :hover {
    background-color: ${({ theme }) => theme.shadow};
  }
`;

function Button(props) {
  const { buttonText, links } = props;
  return <Cta href={links}>{buttonText}</Cta>;
}

Button.propTypes = {
  buttonText: string.isRequired,
  links: string.isRequired,
};

export default Button;
