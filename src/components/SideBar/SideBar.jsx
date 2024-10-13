import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrance Tegegne</p>
      <div className="sidebar__user">
        <button className="sidebar__info">Change Profile Data</button>
        <button className="sidebar__logout">Log Out</button>
      </div>
    </div>
  );
}

export default SideBar;
