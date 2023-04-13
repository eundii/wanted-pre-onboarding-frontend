import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const navigate = useNavigate();

  const token = localStorage.getItem("Token");

  const onLogout = () => {
    localStorage.setItem("Token", "");
    navigate("/signin", { replace: true });
  };

  return (
    <header className="header">
      <div className="header-inner">
        <h1>
          <Link to={"/"}>Todo List</Link>
        </h1>
        <nav className="nav">
          <ul>
            <li className={splitLocation[1] === "signin" ? "active" : ""}>
              {!token ? (
                <Link to={"/signin"} className="nav-link">
                  Sign In
                </Link>
              ) : (
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              )}
            </li>
            <li className={splitLocation[1] === "signup" ? "active" : ""}>
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
