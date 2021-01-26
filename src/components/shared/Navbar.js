import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: white;
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

const Input = styled.input.attrs({
  type: "checkbox",
})`
  display: none;
  @media (max-width: 768px) {
    :not(:checked) ~ .nav-links {
      display: none;
    }
  }
`;

const Label = styled.label`
  @media (max-width: 768px) {
    cursor: pointer;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Input id="nav-responsive" />
      <div className="nav-title">
        <a href="#home">Michael Hutchinson</a>
      </div>
      <div className="nav-btn">
        <Label htmlFor="nav-responsive">
          <span className="icon"></span>
          <span className="icon"></span>
          <span className="icon"></span>
        </Label>
      </div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#work">My Work</a>
        <a href="#contact">Contact</a>
      </div>
    </Nav>
  );
}

export default Navbar;
