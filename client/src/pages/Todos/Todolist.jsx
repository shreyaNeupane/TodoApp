import React, { useEffect, useState } from "react";
import Navbar from "../../component/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../component/Spinner";
import Card from './../../component/Card/Card';

const Todolist = () => {
  const [todoStatus, setTodoStatus] = useState();
  const [filteredTask, setFilteredTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  //get user todo
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;

  const getUserTask = async () => {
    try {
      setLoading(false);
      const { data } = await TodoServices.getAllTodo(id);
      // console.log(data);
      setAllTask(data?.todos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // fetch once
  useEffect(() => {
    getUserTask();
  }, []);

  // filter logic
  useEffect(() => {
    if (todoStatus === "incomplete") {
      setFilteredTask(allTask.filter((item) => !item.isCompleted));
    } else if (todoStatus === "completed") {
      setFilteredTask(allTask.filter((item) => item.isCompleted));
    } else {
      setFilteredTask(allTask);
    }
  }, [todoStatus, allTask]);
  return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by: </h4>
        <div className="filter-group">
          <select
            className="form-select"
            value={todoStatus}
            onChange={(e) => setTodoStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="incomplete">incomplete</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>
      {/* =============spinner================= */}
      {loading ? (
        <Spinner />
      ) : (
        <Card
          allTask={filteredTask}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Todolist;
