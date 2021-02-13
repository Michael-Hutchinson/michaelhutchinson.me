import React from 'react';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import styled from 'styled-components';
import config from '../../data/config.json';

const Icon = styled.ul``;

function Social() {
  return (
    <div>
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
      </Icon>
      <Icon>
        <li>
          <a
            href={config.socialMedia.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
      </Icon>
      <Icon>
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
    </div>
  );
}

export default Social;
