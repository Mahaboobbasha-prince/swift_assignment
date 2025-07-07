import React from "react";
import { Link } from "react-router-dom";

function Header({ userInitial, userName }) {
  return (
    <nav className="navbar custom-navbar px-3">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        
        <span className="navbar-brand mb-0 h1 text-white fw-bold">Swift</span>
        
        <div className="d-flex align-items-center">
            <Link to="/profile" className="text-decoration-none">
            <div className="d-flex align-items-center gap-2 justify-content-end">
        
        <div className="user-initial rounded-circle text-dark fw-bold">
        {userInitial}
        </div>
        <span className="text-white fw-semibold">{userName}</span>
            </div>
            </Link>

        </div>
      </div>
    </nav>
  );
}

export default Header;
