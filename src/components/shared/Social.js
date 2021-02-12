import React from 'react';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';

const Icon = styled.div`
  height: 35px;
  width: 35px;
  background-color: ${({ theme }) => theme.buttonBg};
  transition: all ease-in-out 0.4s;
  padding: 10px;
  border-radius: 100%;
  display: inline-flex;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 5px;
  }
  svg {
    color: ${({ theme }) => theme.buttonText};
  }
  :hover {
    transform: scale(1.1);
  }
`;

function Social() {
  return (
    <div>
      <Icon>
        <a
          href="https://www.twitter.com/itshutchy2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      </Icon>
      <Icon>
        <a
          href="https://github.com/iTsHutchy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </Icon>
      <Icon>
        <a
          href="https://www.linkedin.com/in/mhutchinson4/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </Icon>
    </div>
  );
}

export default Social;
