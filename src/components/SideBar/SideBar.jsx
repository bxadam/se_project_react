import { useContext } from "react";

import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        src={!currentUser ? avatar : currentUser.avatar}
        alt="Terrance Tegegne"
        className="sidebar__avatar"
      />
      <p className="sidebar__username">
        {!currentUser ? avatar : currentUser.name}
      </p>
      <div className="sidebar__user">
        <button onClick={handleEditProfileClick} className="sidebar__info">
          Change Profile Data
        </button>
        <button onClick={onSignOut} className="sidebar__logout">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
