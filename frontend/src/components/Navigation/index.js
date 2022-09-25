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
      <div className="nav-bar-right">
        <div class-name="create-spot-link">
          <CreateSpotFormModal />
        </div>
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
    <div className="master-nav-container">
      <div className="nav-container">
        <div className="navBar">
          <NavLink exact to="/">
            <img src={siteLogo} className="site-logo" />
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
};

export default Navigation;
