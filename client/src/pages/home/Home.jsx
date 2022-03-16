import Topbar from "../../components/topbar/Topbar";
import TaskList from "../../components/tasks/taskList"
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <TaskList/>
        <Rightbar/>
      </div>
    </>
  );
}
