import React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import Button from './Button';
import Toggle from './Toggle';
import cv from '../../data/MH-CV.pdf';
import config from '../../data/config.json';

const Nav = styled.nav`
  align-items: center;
  counter-reset: item -1;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  z-index: 99;
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
        margin-right: 0;
      }
    }
  :before {
    content: "0" counter(item) ".";
    margin-right: 0.313rem;
    color: ${({ theme }) => theme.link};
    text-align: right;
    font-family: var(--font-mono);
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
      padding: 0.625rem;
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

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar = ({ toggleTheme }: NavbarProps) => (
  <Nav>
    <Input id="nav-responsive" />
    <div>
      <Toggle toggleTheme={toggleTheme} />
    </div>
    <div>
      <Label htmlFor="nav-responsive">
        <FaBars />
      </Label>
    </div>
    <MobileLinks>
      {Object.values(config.sections).map((link) => {
        if ('url' in link) {
          return link.url ? (
            <Links key={link.id} href={link.url}>
              {link.nav}
            </Links>
          ) : null;
        }
        return null;
      })}
      <Button links={cv} buttonText="Download My CV" />
    </MobileLinks>
  </Nav>
);

export default Navbar;
