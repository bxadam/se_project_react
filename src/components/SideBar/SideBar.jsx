import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrance Tegegne</p>
    </div>
  );
}

export default SideBar;
