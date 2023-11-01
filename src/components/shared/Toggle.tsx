/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styled from 'styled-components';
import Switch from 'react-switch';
import Darkmode from './Darkmode';

const LightIcon = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.938rem;
  height: 100%;
  justify-content: center;
  padding-right: 0.188rem;
  color: ${({ theme }) => theme.icon};
`;

const DarkIcon = styled(LightIcon)`
  padding-right: 0;
`;

interface ToggleProps {
  toggleTheme: () => void;
}

const Toggle = ({ toggleTheme }: ToggleProps) => {
  const [themeToggler] = Darkmode();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (themeToggler === 'light') {
      setChecked(false);
    } else {
      setChecked(true);
    }
  });
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    toggleTheme();
  };
  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      uncheckedIcon={
        <LightIcon>
          <FiSun />
        </LightIcon>
      }
      checkedIcon={
        <DarkIcon>
          <FiMoon />
        </DarkIcon>
      }
    />
  );
};

export default Toggle;
