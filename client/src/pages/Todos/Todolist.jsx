import React, { useEffect, useState } from "react";
import Navbar from "../../component/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../component/Spinner";

const Todolist = () => {
  const [todoStatus, setTodoStatus] = useState();
  const [filterdTask, setFilterdTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  //get user todo
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;
  const getUserTask = async () => {
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
      // console.log(data);
      setAllTask(data?.todos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const incomplete = allTask?.filter((item) => item?.isCompleted === false);
    const completed = allTask?.filter((item) => item?.isCompleted === true);
    if (todoStatus === "incomplete") {
      setFilterdTask(incomplete);
    } else if (todoStatus === "completed") {
      setFilterdTask(completed);
    }else{
      setFilterdTask(allTask);
    }
    getUserTask();
  }, [todoStatus ,allTask]);
  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by: </h4>
        <div className="filter-group">
          <select
            className="form-select"
            onChange={(e) => setTodoStatus(e.target.value)}
          >
            <option  value="" selected>Select Status</option>
            <option value="incomplete">incomplete</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>
      {/* =============spinner================= */}
      {loading && <Spinner />}
      <div className="card-container">
        {filterdTask?.length === 0 ? (
          <h1>You have no task</h1>
        ) : (
          filterdTask?.map((task, i) => (
            <>
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: "18rem" }}
                key={i}
              >
                <div className="card-header">
                  <div className="chead">
                    <h6>{task?.title.substring(0, 10)}</h6>
                    <h6
                      className={
                        task?.isCompleted === true ? "task-cmp" : "task-inc"
                      }
                    >
                      {task?.isCompleted === true ? "Completed" : "incomplete"}
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <h6>{task?.title}</h6>
                  <p className="card-text">{task?.description}</p>
                  <h6>Date : {task?.createdAt.substring(0, 10)}</h6>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Todolist;
