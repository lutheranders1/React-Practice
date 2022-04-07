import * as React from "react";
import { Link } from "react-router-dom";
import { removeToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import SearchBar from "../pages/SearchBar";

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar  navbar-dark bg-dark text-white">
      <h1>u-Watch App</h1>

      <SearchBar />

      <ul className=" list-unstyled d-flex flex-row">
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/movies/new" className="nav-link">
                Add Movie
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <span className="nav-link" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
