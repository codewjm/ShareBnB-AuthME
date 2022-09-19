import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal"
import ProfileButton from "./ProfileButton";
import CreateSpotFormModal from "../CreateSpotFormModal";
import siteLogo from "./SharesBnB-heart.png"
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav_bar_right">
        <CreateSpotFormModal />
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="login-signup-container">
          <div className="login-button">
            <LoginFormModal />
          </div>
          <div className="signup-button">
            <SignUpFormModal />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="nav-container">
      <div className="navBar">
          <NavLink exact to="/">
            <img src={siteLogo} className="site-logo" />
          </NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
};

export default Navigation;
