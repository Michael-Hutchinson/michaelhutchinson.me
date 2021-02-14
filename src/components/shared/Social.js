import React from 'react';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import config from '../../data/config.json';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 20px;
  z-index: 10;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  &:after {
    content: '';
    width: 1px;
    height: 100px;
    background-color: ${({ theme }) => theme.text};
  }
  li {
    &:last-of-type {
      margin-bottom: 20px;
    }
    a {
      padding: 10px;
      display: flex;
      transition: all ease-in-out 0.4s;
      color: ${({ theme }) => theme.link};
      &:hover {
        transform: scale(1.5);
      }
    }
  }
`;

function Social() {
  return (
    <Wrapper>
      <Icon>
        <li>
          <a
            href={config.socialMedia.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href={config.socialMedia.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            href={config.socialMedia.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </li>
      </Icon>
    </Wrapper>
  );
}

export default Social;
