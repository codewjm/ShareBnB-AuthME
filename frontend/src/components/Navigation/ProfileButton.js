import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
// import CreateSpotFormModal from "../CreateSpotFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((state) => state?.session?.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div className="dropdown-menu" >
      <div className="dropdown-button" onClick={openMenu}>
      <i className="fas fa-bars" />
      <i className="fas fa-user-circle" />
      </div>

      {showMenu && (
        <div className="profile-dropdown">
          {/* <div
          className="dropdown-listings"
          onClick={() => history.push("/my-listings")}
          >
            My Listings
          </div>

          <div
          className="dropdown-reviews"
          onClick={() => history.push("/my-reviews")}
          >
            My Reviews
          </div> */}
          <div className="dropdown-email">
            Profile: {sessionUser.email}
          </div>
          <div
            className="dropdown-logout"
            onClick={logout}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
