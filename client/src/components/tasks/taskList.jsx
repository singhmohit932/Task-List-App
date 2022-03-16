import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function TaskList({ username }) {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get("tasks/taskList/" + user._id);
            setTasks(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchTasks();
    }, [username, user._id]);
    const acceptTask = (taskId) => {
        try{
            axios.put("tasks/"+taskId,{
                "userId":user._id,
                "accepted":2,
            }).then((res)=>{
                console.log(res);
                window.location.reload()
            })
        } catch (err) {
            console.log(err);
        }
    }
    const rejectTask = (taskId) => {
        try{
            axios.put("tasks/"+taskId,{
                "userId":user._id,
                "accepted":3,
            }).then((res)=>{
                console.log(res);
                window.location.reload()
            })
        } catch (err) {
            console.log(err);
        }
        
    }
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                <h1 style={{marginTop:"20px",}}>TASKS</h1>
                {tasks.map((t) => (
                    <div>
                        {t.accepted!==3?(
                            <>
                            <div className = "taskDiv"><p className="taskDesc">{t.desc}</p>
                            {t.userId === user._id ? (<></>) : (
                                <>
                                    {t.accepted === 1 ? (
                                        <>
                                            <button className="acceptButton" onClick={()=>{acceptTask(t._id)}}>Accept</button>
                                            <button className="rejectButton" onClick={()=>{rejectTask(t._id)}}>Reject</button>
                                        </>) : (<></>)}
                                </>

                            )} 
                            <div class="taskStatus">
                            {t.accepted===1?(<p>pending</p>):t.accepted===2?(<p>accepted</p>):(t.accepted===3 && t.userId===user._id)?(<p>rejected</p>):(<></>)}
                            </div>
                            </div>
                            </>
                        ):(<></>)}
                         
                    </div>
                ))}
            </div>
        </div>
    );
}
