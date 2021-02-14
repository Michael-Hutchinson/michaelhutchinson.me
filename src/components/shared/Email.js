import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 1.25rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  &:after {
    content: '';
    width: 0.063rem;
    height: 6.25rem;
    background-color: ${({ theme }) => theme.text};
  }
  a {
    writing-mode: vertical-rl;
    margin-bottom: 1.25rem;
    font-size: 0.75rem;
    font-family: var(--font-links);
    :hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 48rem) {
    display: none;
  }
`;

function Email() {
  return (
    <Wrapper>
      <a href="mailto:michael-hutchinson@hotmail.co.uk">
        michael-hutchinson@hotmail.co.uk
      </a>
    </Wrapper>
  );
}

export default Email;
