import React from "react";
import styled from "styled-components";
import Navbar from "./shared/Navbar";

const Top = styled.header`
  padding-bottom: 83px;
`;

function Header() {
  return (
    <Top>
      <Navbar />
    </Top>
  );
}

export default Header;
