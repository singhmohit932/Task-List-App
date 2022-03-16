import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const logout = ()=>{
    localStorage.removeItem("user")
    window.location.reload()
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">TASK SHARING APP</span>
        </Link>
      </div>
      
      <div className="topbarRight">
        <p>Welcome {user.email}!</p>
        <div className="logoutDiv">
        <p onClick={logout}
            className="logoutButton">Logout</p>
        </div>
      </div>
    </div>
  );
}
