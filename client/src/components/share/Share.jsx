import "./share.css";
import {
  Cancel,
} from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const sharedUserEmail = useRef();
  const [file, setFile] = useState(null);

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
  },[])
  const submitTask = async (e) => {
    e.preventDefault();
    if(sharedUserEmail.current.value)
    {
      
    
    console.log(Users)
    var sharedUserId = "";
    for(var u in Users)
    {
      if(u===sharedUserEmail.current.value)
        {
          sharedUserId = Users[u];
          break;
        }
    }
    if(sharedUserId === "")
    {
      alert("User not found");
      return;
    }
  }
  
    const newTask = {
      userId: user._id,
      sharedUserId: sharedUserId,
      desc: desc.current.value,
      accepted: 1
    };
    try {
      await axios.post("/tasks", newTask);
      window.location.reload();
    } catch (err) {console.log(err)}
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"Add task description"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        
        <form className="shareBottom" >
          <div className="shareOptions">
            
          <div className="shareOption">
              <span className="shareOptionText">Share with another user:</span>
          </div>
          <input
            placeholder={"Add User email"}
            className="shareInputBottom"
            ref={sharedUserEmail}
          />
          </div>
          <button className="shareButton" type="submit" onClick={submitTask}>
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
