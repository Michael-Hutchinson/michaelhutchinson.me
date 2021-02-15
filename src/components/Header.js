import styled from 'styled-components';
import React from 'react';
import { func, string } from 'prop-types';
import Navbar from './shared/Navbar';

const Top = styled.header`
  align-items: center;
  display: flex;
  height: 5.188rem;
  justify-content: space-between;
  padding: 0 2.5rem;
  position: fixed;
  width: 100%;
  z-index: 15;
`;

function Header(props) {
  const { theme, toggleTheme } = props;
  return (
    <Top>
      <Navbar currentTheme={theme} toggleTheme={toggleTheme} />
    </Top>
  );
}

Header.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Header;
