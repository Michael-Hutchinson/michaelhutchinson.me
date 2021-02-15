import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import Switch from 'react-switch';
import Darkmode from './Darkmode';

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
  return <Switch onChange={handleChange} checked={checked} />;
}

Toggle.propTypes = {
  toggleTheme: func,
};

Toggle.defaultProps = {
  toggleTheme: func,
};

export default Toggle;
