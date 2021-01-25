function Header() {
  return (
    <header>
      <div className="navbar sticky">
        <input type="checkbox" id="nav-responsive" />
        <div className="nav-title">
          <a href="#home">Michael Hutchinson</a>
        </div>
        <div className="nav-btn">
          <label for="nav-responsive">
            <span className="icon"></span>
            <span className="icon"></span>
            <span className="icon"></span>
          </label>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#work">My Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;