import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BallMoveDiv from "../common/BallMoveDiv";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/NavBar.css";
import "../styles/BallMoveDiv.css";

const NavBar = () => {
  const [token, setTokenValue, removeToken, getToken, getDecodedToken] =
    useLocalStorage("token");
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);


  if (isLoggedIn) {
    return (
      <div id="nav-inner-container">
        <h1>ChirpHub</h1>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "nav-item active" : "nav-item"
          }
        >
          Feed
        </Link>
        <Link
          to="/tag/:tagId"
          className={
            location.pathname.startsWith("/tag")
              ? "nav-item active"
              : "nav-item"
          }
        >
          Tags
        </Link>
        <Link
          to="/bookmarks"
          className={
            location.pathname === "/bookmarks"
              ? "nav-item active"
              : "nav-item"
          }
        >
          Bookmarks
        </Link>
        <Link
          to='/logout'
          className={
            location.pathname === "/logout"
              ? "nav-item active"
              : "nav-item"
          }
        >
          Log Out
        </Link>
      </div>
    );
  } else {
    return (
      <div id="nav-inner-container">
        <h1>ChirpHub</h1>
        <Link
          to="/"
          className={
            location.pathname === "/" ? "nav-item active" : "nav-item"
          }
        >
          Home
        </Link>
        <Link
          to="/tag/:tagId"
          className={
            location.pathname.startsWith("/tag")
              ? "nav-item active"
              : "nav-item"
          }
        >
          Tags
        </Link>
        <Link
          to="/register"
          className={
            location.pathname === "/register"
              ? "nav-item active"
              : "nav-item"
          }
        >
          Register
        </Link>
        <Link
          to="/login"
          className={
            location.pathname === "/login" ? "nav-item active" : "nav-item"
          }
        >
          Log In
        </Link>
      </div>
    );
  }
};

export default NavBar;