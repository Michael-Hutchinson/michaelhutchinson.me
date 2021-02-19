import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  position: fixed;
  padding: 0;
  right: 1.25rem;
  z-index: 10;
  &:after {
    background-color: ${({ theme }) => theme.text};
    content: '';
    height: 6.25rem;
    width: 0.063rem;
  }
  a {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    margin-bottom: 1.25rem;
    writing-mode: vertical-rl;
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
