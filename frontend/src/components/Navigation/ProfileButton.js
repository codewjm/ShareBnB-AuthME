import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

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
    <>
      <button className="menu" onClick={openMenu}>
        <i className="fas fa-bars nav_menu_bars"></i>
        <i className="fas fa-user-circle  nav_user_icon" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">

          <div
          className="dropdown-listings"
          onClick={() => history.push("view-your-listings")}
          >
            View Your Listings
          </div>

          <div
          className="dropdown-reviews"
          onClick={() => history.push("view-your-listings")}
          >
            View Your Reviews
          </div>

          <div
          className="dropdown-logout"
          onClick={logout}>
          Log Out
          </div>

        </div>
      )}
    </>
  );
};

export default ProfileButton;
