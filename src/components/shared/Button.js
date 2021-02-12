import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const Cta = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  letter-spacing: 1.6px;
  padding: 14px 25px;
  border-radius: 100px;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
  font-family: 'Karla', sans-serif;
  transition: all ease-in-out 0.4s;
  svg {
    margin-left: 10px;
    vertical-align: top;
  }
  :hover {
    transform: scale(1.1);
    svg {
      transition: all ease-in-out 0.4s;
      transform: rotate(90deg);
    }
  }
`;

function Button() {
  return (
    <Cta href="#about">
      Learn More
      <FaArrowRight />
    </Cta>
  );
}

export default Button;
