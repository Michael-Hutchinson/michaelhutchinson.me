import React from "react";
import styled from "styled-components";

const Bottom = styled.footer`
  padding: 10px 0 40px 0;
  text-align: center;
`;

function Footer() {
  return (
    <Bottom>
      <p>Copyright © Michael Hutchinson | {new Date().getFullYear()}</p>
    </Bottom>
  );
}

export default Footer;