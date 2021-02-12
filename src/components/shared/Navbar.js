import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  @media (max-width: 768px) {
    box-shadow: 0 40px 100px rgb(0 0 0 / 20%);
  }
`;

const MobileLinks = styled.div`
  a {
    padding: 30px;
  }
  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    overflow-y: auto;
    top: 100%;
    text-align: center;
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
  @media (max-width: 768px) {
    :not(:checked) ~ ${MobileLinks} {
      display: none;
    }
  }
`;

const Label = styled.label`
  svg {
    display: none;
      @media (max-width: 768px) {
        cursor: pointer;
        display: block;
        color: ${({ theme }) => theme.title};
      }
    }
  }
`;

const Links = styled.a`
  color: ${({ theme }) => theme.title};
  font-size: 14px;
  &:hover {
    color: ${({ theme }) => theme.title};
  }
`;

const Wrapper = styled.div`
  padding: 30px;
  a {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Input id="nav-responsive" />
      <Wrapper>
        <Links href="#home">Michael Hutchinson</Links>
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
      </MobileLinks>
    </Nav>
  );
}

export default Navbar;
