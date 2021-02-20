/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
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

function Toggle(props) {
  const [themeToggler] = Darkmode();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (themeToggler === 'light') {
      setChecked(false);
    } else {
      setChecked(true);
    }
  });
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    props.toggleTheme();
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
}

Toggle.propTypes = {
  toggleTheme: func,
};

Toggle.defaultProps = {
  toggleTheme: func,
};

export default Toggle;
