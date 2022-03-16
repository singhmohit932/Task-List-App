import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const [Users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersList = await axios.get("/users/usersList");
        setUsers(usersList.data);
        console.log(usersList.data)
      } catch (err) {
        console.log(err);
      }
    }
    getUsers()
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Users</h4>
        <ul className="rightbarFriendList">
          {Users && Object.keys(Users).map((key,index) => (
            <div className="userDiv"><p>{key}</p></div>
          ))}
        </ul>
      </>
    );
  };

  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}
