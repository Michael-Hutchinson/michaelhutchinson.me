import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import Button from './Button';

const Nav = styled.nav`
  align-items: center;
  width: 100%;
  justify-content: space-between;
  display: flex;
  top: 0;
  z-index: 99;
  counter-reset: item -1;
`;

const MobileLinks = styled.div`
  display: flex;
  a {
    counter-increment: item 1;
    padding: 0.625rem;
    :hover {
      color: ${({ theme }) => theme.link};
    }
    &:last-of-type {
      :before {
        content '';
      }
    }
  :before {
    content: "0" counter(item) ".";
    margin-right: 0.313rem;
    color: ${({ theme }) => theme.link};
    text-align: right;
    font-family: var(--font-links);
}
  }
  }
  @media (max-width: 48rem) {
    background-color: ${({ theme }) => theme.background};
    flex-direction: column;
    overflow-y: auto;
    position: absolute;
    text-align: center;
    top: 100%;
    width: 100%;
    a {
      display: block;
      padding: 10px;
    }
  }
`;

const Input = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
  @media (max-width: 48rem) {
    :not(:checked) ~ ${MobileLinks} {
      display: none;
    }
  }
`;

const Label = styled.label`
  svg {
    display: none;
      @media (max-width: 48rem) {
        cursor: pointer;
        display: block;
        color: ${({ theme }) => theme.title};
      }
    }
  }
`;

const Links = styled.a`
  color: ${({ theme }) => theme.title};
  font-size: 0.875rem;
  &:hover {
    color: ${({ theme }) => theme.title};
  }
`;

const Wrapper = styled.div`
  padding: 30px;
  a {
    font-size: 20px;
  }
  @media (max-width: 48rem) {
    padding: 15px;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Input id="nav-responsive" />
      <Wrapper>
        <Links href="#home">MH</Links>
      </Wrapper>
      <Wrapper>
        <Label htmlFor="nav-responsive">
          <FaBars />
        </Label>
      </Wrapper>
      <MobileLinks>
        <Links href="#home">Home</Links>
        <Links href="#about">About Me</Links>
        <Links href="#work">My Work</Links>
        <Links href="#contact">Contact</Links>
        <Button links="CV Link Here" buttonText="Download My CV" />
      </MobileLinks>
    </Nav>
  );
}

export default Navbar;
