import React from "react";

function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <span className="nav__logo-dot" />
          <span className="nav__title">Playlist Pilot</span>
        </div>
        <div className="nav__right">
          <span className="nav__beta-pill">YouTube Playlist Builder</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
