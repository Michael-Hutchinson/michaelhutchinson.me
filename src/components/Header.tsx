import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './shared/Navbar';

const Top = styled.header`
  align-items: center;
  display: flex;
  height: 5.188rem;
  justify-content: space-between;
  padding: 0 2.5rem;
  position: fixed;
  width: 100%;
  z-index: 20;
`;

interface HeaderProps {
  toggleTheme: () => void;
}

const Header = ({ toggleTheme }: HeaderProps) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const navClass = [];
  if (scroll) {
    navClass.push('navBackground');
  }

  return (
    <Top className={navClass.join()}>
      <Navbar toggleTheme={toggleTheme} />
    </Top>
  );
};

export default Header;
